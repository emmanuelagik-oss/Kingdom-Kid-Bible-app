export interface Scene {
  title: string;
  text: string;
  illustrationPrompt: string; // Used to explain what should be visualised or to generate image
  fallbackImage: string; // Local illustration fallback URL or styled CSS/emoji card
}

export interface Story {
  id: string;
  title: string;
  category: "Old Testament" | "New Testament" | "Custom";
  emoji: string;
  description: string;
  moral: string;
  verse: string;
  scenes: Scene[];
}

export interface QuizQuestion {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  text: string;
  timestamp: string;
}

export interface BibleHero {
  id: string;
  name: string;
  title: string;
  emoji: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  greeting: string;
  description: string;
}

export interface MemoryVerse {
  verse: string;
  reference: string;
  points: number;
}

export interface ColoringPage {
  id: string;
  title: string;
  emoji: string;
  shapes: Array<{
    type: "path" | "circle" | "rect" | "polygon";
    d?: string;
    cx?: number;
    cy?: number;
    r?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    points?: string;
    defaultFill?: string;
  }>;
}
