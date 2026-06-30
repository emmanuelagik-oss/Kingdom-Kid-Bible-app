import { useState } from "react";
import { Send, Sparkles, HelpCircle, ArrowRight, User, Compass, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const PRESET_QUESTIONS = [
  { question: "Why did David fight Goliath? 🎯", param: "Why did David fight Goliath? Explain like I'm 10 years old." },
  { question: "Why do we pray? 🙏", param: "Why do we pray? Explain like I'm 10 years old." },
  { question: "What is heaven like? 🌅", param: "What is heaven? Explain like I'm 10 years old." },
  { question: "Why did Jesus die for us? ✝️", param: "Why did Jesus die? Explain like I'm 10 years old." }
];

export default function BibleAIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi there! ⛵ I'm your friendly Bible AI Assistant! You can ask me any big question about God, the Bible, or faith, and I'll explain it in a super simple, easy-to-understand way! What would you like to know today?"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setErrorMsg(null);
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Send message to our server-side Gemini Chat API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character: "david", // Use David's system instructions or default warm tone
          message: `${textToSend} (Please explain this like I'm 10 years old in a super friendly, encouraging, and clear way!)`,
          history: messages.map(m => ({ role: m.role === "user" ? "user" : "model", text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error("Could not reach our Bible assistant server.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: data.reply || "I am praying about that question! Ask me another lovely thing."
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to talk to assistant. Please check your internet or set up your API key!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8" id="bible-ai-assistant-root">
      {/* Banner */}
      <div className="bg-brand-sand p-6 rounded-[32px] text-brand-dark shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-brand-sand/55">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="bg-brand-olive/20 text-brand-stone font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
            🤖 Kid-Friendly AI Companion
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-brand-dark">
            Bible AI Assistant!
          </h2>
          <p className="text-sm md:text-base text-brand-stone max-w-lg font-medium">
            Have you ever wondered about big Bible questions? Ask anything here! Our smart companion explains complex concepts in a storytelling "Explain Like I'm 10" way.
          </p>
        </div>
        <div className="text-5xl mt-4 md:mt-0 animate-pulse duration-2000">🤖💡🧭</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Preset quick-tap questions */}
        <div className="lg:col-span-4 bg-white border-2 border-brand-sand rounded-[32px] p-5 space-y-4 shadow-sm h-fit">
          <h3 className="font-bold font-serif text-brand-stone flex items-center gap-1.5 text-xs uppercase tracking-wider">
            <HelpCircle className="text-brand-olive w-4 h-4" /> Quick-Tap Questions
          </h3>

          <div className="grid grid-cols-1 gap-2.5">
            {PRESET_QUESTIONS.map((pq, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(pq.param)}
                disabled={isLoading}
                className="w-full p-4 rounded-2xl border border-brand-sand/40 bg-brand-cream/15 text-left font-bold text-xs hover:border-brand-olive hover:bg-brand-sage/15 transition-all cursor-pointer flex justify-between items-center group disabled:opacity-50"
              >
                <span>{pq.question}</span>
                <ArrowRight className="w-4 h-4 text-brand-stone group-hover:text-brand-olive transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Chat Box Interface */}
        <div className="lg:col-span-8">
          <div className="bg-white border-2 border-brand-sand rounded-[32px] p-5 shadow-sm min-h-[440px] flex flex-col justify-between relative overflow-hidden">
            {/* Watermark compass */}
            <div className="absolute top-4 right-4 text-brand-stone/5 pointer-events-none">
              <Compass className="w-24 h-24" />
            </div>

            {/* Chat message streams */}
            <div className="flex-1 space-y-4 max-h-[340px] overflow-y-auto pr-2 pb-4">
              {messages.map((m) => {
                const isAssistant = m.role === "assistant";
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${isAssistant ? "" : "flex-row-reverse"}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
                      isAssistant ? "bg-brand-olive text-white" : "bg-brand-sand text-brand-stone font-bold"
                    }`}>
                      {isAssistant ? "🤖" : <User className="w-4 h-4" />}
                    </div>
                    <div className={`p-4 rounded-2xl max-w-[80%] text-xs md:text-sm font-semibold leading-relaxed shadow-xs ${
                      isAssistant
                        ? "bg-brand-cream/35 border border-brand-sand text-brand-stone"
                        : "bg-brand-olive text-white"
                    }`}>
                      {m.text}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-olive text-white flex items-center justify-center text-sm animate-spin">
                    🌀
                  </div>
                  <div className="p-4 rounded-2xl bg-brand-cream/10 border border-dashed border-brand-sand text-brand-stone/60 text-xs font-bold animate-pulse">
                    Thinking and praying about a beautiful answer for you... 🕊️
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="bg-rose-50 border border-rose-300 rounded-2xl p-4 flex items-start gap-2 text-rose-800 text-xs font-bold">
                  <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                  <div>
                    <p>{errorMsg}</p>
                    <p className="font-medium text-[10px] text-rose-600 mt-1">Make sure you have your GEMINI_API_KEY set up in your Settings!</p>
                  </div>
                </div>
              )}
            </div>

            {/* Custom question input form */}
            <div className="border-t border-brand-sand/65 pt-4 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isLoading) handleSendMessage(inputText);
                }}
                disabled={isLoading}
                placeholder="Ask me anything: 'Why do we celebrate Christmas?'..."
                className="flex-1 px-4 py-3 border-2 border-brand-sand/65 rounded-2xl text-xs md:text-sm font-semibold text-brand-stone placeholder-brand-stone/40 focus:outline-none focus:border-brand-olive focus:ring-2 focus:ring-brand-sage/15"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={isLoading || !inputText.trim()}
                className="bg-brand-olive hover:bg-brand-stone text-white font-bold px-5 py-3 rounded-2xl transition-all shadow-xs cursor-pointer flex items-center gap-1 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                id="send-ai-assistant-btn"
              >
                <Send className="w-4 h-4" /> <span className="hidden sm:inline">Ask AI</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
