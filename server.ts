import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini API client to prevent startup crashes if key is missing
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 1. AI Hero Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { character, message, history } = req.body;
    const ai = getGeminiClient();
    
    let systemInstruction = "You are a friendly, loving Bible character speaking to a child.";
    if (character === "moses") {
      systemInstruction = "You are Moses from the Bible. Speak with deep warmth, wisdom, and friendliness. Keep your explanations very simple, vivid, and encouraging to children. Use friendly terms like 'my young friend!' or 'little explorer!'. Keep answers under 120 words, and never mention frightening things. Focus on God's love, hope, and protection.";
    } else if (character === "esther") {
      systemInstruction = "You are Queen Esther from the Bible. Speak with grace, courage, and loving-kindness. Encourage the child that they are brave, special, and deeply loved by God. Keep explanations simple, storytelling, and filled with hope. Keep answers under 120 words.";
    } else if (character === "noah") {
      systemInstruction = "You are Noah from the Bible. Speak with an enthusiastic, joyful, grandfatherly tone. Mention animal sounds (like roaring lions, squeaking monkeys, or soft doves) or the beautiful rainbow of promise! Keep it simple, vivid, and full of faith. Keep answers under 120 words.";
    } else if (character === "david") {
      systemInstruction = "You are David, the young shepherd boy who became king. Speak with high energy, courage, and joy. Talk about watching sheep, playing the harp, and trusting in God's incredible power. Keep it energetic, warm, and very easy to read. Keep answers under 120 words.";
    }

    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        contents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text }]
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: error.message || "Failed to chat with hero" });
  }
});

// 2. Custom Quiz Generator
app.post("/api/generate-quiz", async (req, res) => {
  try {
    const { topic } = req.body;
    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Create a child-friendly 3-question multiple-choice quiz about: ${topic || 'The Bible'}. Each question should have exactly 4 choices and a clear, simple explanation for the answer. Make the questions fun and easy for kids aged 5 to 12.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Fun title for this quiz" },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING, description: "The quiz question" },
                  choices: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Exactly 4 options"
                  },
                  correctIndex: { type: Type.INTEGER, description: "Index of the correct answer (0 to 3)" },
                  explanation: { type: Type.STRING, description: "A simple, happy explanation for why this is correct" }
                },
                required: ["question", "choices", "correctIndex", "explanation"]
              }
            }
          },
          required: ["title", "questions"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Gemini Quiz Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate quiz" });
  }
});

// 3. Custom Story Generator
app.post("/api/generate-story", async (req, res) => {
  try {
    const { character, setting, values } = req.body;
    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Write a short, engaging, and beautiful Bible-inspired story for kids. 
      Child Character name: ${character || 'Leo'}
      Setting: ${setting || 'a bright sunny meadow or biblical village'}
      Core Theme/Value: ${values || 'sharing and kindness'}.
      The story should have exactly 3 distinct parts (Beginning, Middle, Climax/Resolution). 
      Keep the language simple, vivid, and full of wonder. Give it a lovely moral that teaches God's love and wisdom.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Story title" },
            moral: { type: Type.STRING, description: "The simple moral lesson of the story" },
            verse: { type: Type.STRING, description: "A related, simple, easy-to-understand Bible verse (e.g. Proverbs or Psalms or Gospels)" },
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Title of the scene/part (e.g., Part 1: The Gathering)" },
                  text: { type: Type.STRING, description: "Narration text for this scene (approx 60-90 words)" },
                  illustrationPrompt: { type: Type.STRING, description: "A descriptive prompt for an illustrator to draw this scene in a colorful pastel cartoon vector style" }
                },
                required: ["title", "text", "illustrationPrompt"]
              }
            }
          },
          required: ["title", "moral", "verse", "scenes"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Gemini Story Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate story" });
  }
});

// 4. Dynamic 365 Bible Stories Generator
app.post("/api/generate-365-story", async (req, res) => {
  try {
    const { section, topic, dayNumber } = req.body;
    const ai = getGeminiClient();

    const prompt = `Write a beautiful, highly engaging, and child-friendly Bible story in the requested format.
    Section: ${section || 'Old Testament'}
    Category/Topic: ${topic || 'Creation'}
    Story Day: Day ${dayNumber || 1} of 365

    Please adapt this Bible story for children aged 5-12. Keep it inspiring, full of wonder, and spiritually enriching.
    Ensure you write all the components in a sweet, clear, grandfatherly/storyteller tone.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            storyTitle: { type: Type.STRING },
            storyText: { type: Type.STRING, description: "The full engaging Bible story written in an easy-to-read, inspiring, and friendly style for children. 120-180 words." },
            visualDescription: { type: Type.STRING, description: "A beautiful description of the scene illustration for a pastel vector cartoon." },
            mainLesson: { type: Type.STRING, description: "A simple, practical moral lesson or spiritual truth for a child's daily life." },
            verseText: { type: Type.STRING, description: "The memory verse text itself, short and easy for children to memorize." },
            verseReference: { type: Type.STRING, description: "The Bible book, chapter, and verse reference (e.g. Genesis 1:1)." },
            prayer: { type: Type.STRING, description: "A warm, sweet child-friendly conversational prayer." },
            discussionQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Exactly 2 or 3 fun or reflective questions for the child to talk about with parents."
            },
            weeklyChallenge: { type: Type.STRING, description: "A practical action-oriented challenge for this week to practice this value." },
            rewardBadgeTitle: { type: Type.STRING, description: "A fun title for a badge earned (e.g., 'Star of Creation' or 'Noah's Ark Pilot')" },
            rewardBadgeEmoji: { type: Type.STRING, description: "A single fun emoji representing the badge (e.g. 🌅, 🦁, 👑, 🛡️)" },
            quiz: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  choices: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Exactly 3 or 4 choices" },
                  correctIndex: { type: Type.INTEGER, description: "0-based index of the correct option" },
                  explanation: { type: Type.STRING, description: "A happy child-friendly explanation for why it's correct" }
                },
                required: ["question", "choices", "correctIndex", "explanation"]
              },
              description: "Exactly 3 multiple choice questions based on the story."
            }
          },
          required: [
            "storyTitle", "storyText", "visualDescription", "mainLesson",
            "verseText", "verseReference", "prayer", "discussionQuestions",
            "weeklyChallenge", "rewardBadgeTitle", "rewardBadgeEmoji", "quiz"
          ]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Gemini 365 Story Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate 365 story" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
