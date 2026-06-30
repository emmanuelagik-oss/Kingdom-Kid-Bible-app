import { useState, useEffect, useRef } from "react";
import { BIBLE_HEROES } from "../data";
import { BibleHero, ChatMessage } from "../types";
import { MessageSquare, Send, Sparkles, User, UserPlus, ArrowLeft, Heart, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const CHAT_SUGGESTIONS: Record<string, string[]> = {
  moses: [
    "What did the burning bush look like? 🔥",
    "Was it scary crossing the dry Red Sea? 🌊",
    "How did you feel leading so many people? 🏕️",
    "Tell me about the Ten Commandments! 📜"
  ],
  esther: [
    "How did you find the courage to see the king? 👑",
    "What was it like living in a grand palace? 🏰",
    "How can I be brave like you when I'm scared? ❤️",
    "What did you eat at your royal banquets? 🍇"
  ],
  noah: [
    "Did the woodpeckers poke holes in the Ark? 🪵",
    "How did you feed all those hungry animals? 🦒",
    "Were the lions friendly during the rain? 🦁",
    "What was the first thing you did after landing? 🌈"
  ],
  david: [
    "Were you really not scared of Goliath? 🎯",
    "Do sheep listen to your harp music? 🐑",
    "How did it feel when Samuel chose you? 👑",
    "Write a little happy Psalm with my name! 🎶"
  ]
};

const THINKING_QUOTES: Record<string, string[]> = {
  moses: [
    "Moses is leaning on his wooden staff... 🧔🏽‍♂️",
    "Moses is listening carefully to your question... 📜",
    "Moses is stroking his long gray beard... 💭"
  ],
  esther: [
    "Queen Esther is straightening her glittering crown... 👑",
    "Esther is writing on a golden scroll... ✍🏼",
    "Esther is thinking of a brave story for you... 💖"
  ],
  noah: [
    "Noah is feeding the hungry baby giraffes... 🦒",
    "Noah is counting the tiny mice on his fingers... 🐭",
    "Noah is checking if the rain is stopped... 🌧️"
  ],
  david: [
    "David is tuning the strings of his wooden harp... 🎵",
    "David is counting his small fluffy sheep... 🐑",
    "David is choosing a smooth stone from the brook... 🪨"
  ]
};

export default function AskHeroes() {
  const [selectedHero, setSelectedHero] = useState<BibleHero | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMsg, setInputMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingQuote, setThinkingQuote] = useState("");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Keep chat scrolled down
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Rotate thinking quotes while waiting
  useEffect(() => {
    let intervalId: any;
    if (isLoading && selectedHero) {
      const quotes = THINKING_QUOTES[selectedHero.id];
      setThinkingQuote(quotes[0]);
      let idx = 1;
      intervalId = setInterval(() => {
        setThinkingQuote(quotes[idx % quotes.length]);
        idx++;
      }, 2500);
    }
    return () => clearInterval(intervalId);
  }, [isLoading, selectedHero]);

  const handleSelectHero = (hero: BibleHero) => {
    setSelectedHero(hero);
    setMessages([
      {
        id: "greeting",
        role: "model",
        text: hero.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || !selectedHero || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMsg("");
    setIsLoading(true);

    try {
      // Build brief history to keep dialogue flowing
      // We pass last 4 turns to avoid exceeding tokens or cluttering
      const history = messages
        .filter((m) => m.id !== "greeting")
        .slice(-4)
        .map((m) => ({
          role: m.role === "user" ? "user" : "model",
          text: m.text,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character: selectedHero.id,
          message: textToSend,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error("Hero had to attend to an emergency! Make sure your Gemini API key is active.");
      }

      const data = await response.json();

      const heroReply: ChatMessage = {
        id: `msg-${Date.now()}-hero`,
        role: "model",
        text: data.reply || "I am listening to you, my dear friend. Could you say that again?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, heroReply]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        role: "model",
        text: `Oh! It looks like our connection was interrupted. Please check if your Gemini API key is configured properly in Settings > Secrets. In the meantime, I am sending you a warm wave of love! 👋🏼❤️`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (!selectedHero) return;
    setMessages([
      {
        id: "greeting",
        role: "model",
        text: selectedHero.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="space-y-8" id="ask-heroes-root">
      <AnimatePresence mode="wait">
        {!selectedHero ? (
          /* Selection Screen */
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Header banner */}
            <div className="bg-brand-sand p-6 rounded-[32px] text-brand-dark shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-brand-sand/55">
              <div className="relative z-10 space-y-2 text-center md:text-left">
                <span className="bg-brand-olive/20 text-brand-stone font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                  💬 Safe AI Chat
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-brand-dark">
                  Talk to Bible Heroes!
                </h2>
                <p className="text-sm md:text-base text-brand-stone max-w-lg font-medium">
                  Have you ever wanted to ask Noah about his monkeys, or Esther about her bravery? Choose a hero to start your friendly chat!
                </p>
              </div>
              <div className="text-6xl md:text-8xl select-none mt-4 md:mt-0 animate-bounce duration-1000">
                🧔🏽‍♂️
              </div>
            </div>

            {/* Heroes list Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BIBLE_HEROES.map((hero) => (
                <motion.div
                  key={hero.id}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="bg-white border-2 border-brand-sand/65 hover:border-brand-olive rounded-[32px] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-80"
                >
                  <div className="space-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${hero.bgGradient} rounded-2xl flex items-center justify-center text-4xl shadow-xs border border-brand-sand/60`}>
                      {hero.emoji}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold font-serif text-xl text-brand-dark">{hero.name}</h3>
                      <span className="text-xs font-bold text-brand-stone tracking-wide uppercase block">
                        {hero.title}
                      </span>
                    </div>
                    <p className="text-xs text-brand-stone/85 font-medium leading-normal line-clamp-3">
                      {hero.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleSelectHero(hero)}
                    className="w-full bg-brand-sand/30 hover:bg-brand-olive hover:text-white border border-brand-sand hover:border-brand-olive text-brand-stone font-bold py-2 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    id={`chat-hero-btn-${hero.id}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Start Chat
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Active Chat Screen */
          <motion.div
            key="chat-room"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-8 bg-white border-2 border-brand-sand rounded-[32px] shadow-sm p-5 md:p-6"
          >
            {/* Left sidebar: Hero Info & Suggestion prompts */}
            <div className="lg:col-span-1 space-y-6 lg:border-r lg:border-brand-sand/60 lg:pr-6">
              <button
                onClick={() => setSelectedHero(null)}
                className="text-xs font-bold text-brand-stone hover:text-brand-dark flex items-center gap-1 cursor-pointer bg-brand-sand/40 hover:bg-brand-sand px-3.5 py-1.5 rounded-full transition-all"
                id="back-heroes-btn"
              >
                <ArrowLeft className="w-4 h-4" /> Exit Chat
              </button>

              {/* Mini Bio Card */}
              <div className="bg-brand-cream/45 p-4 rounded-2xl border border-brand-sand/75 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedHero.emoji}</span>
                  <div>
                    <h4 className="font-bold font-serif text-brand-dark">{selectedHero.name}</h4>
                    <p className="text-xxs font-bold text-brand-stone uppercase tracking-wide">
                      {selectedHero.title}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-brand-stone/95 leading-normal font-serif font-medium border-t border-brand-sand/75 pt-2.5">
                  {selectedHero.description}
                </p>
              </div>

              {/* Suggestions Section */}
              <div className="space-y-2.5">
                <h5 className="text-xs font-bold text-brand-stone uppercase tracking-wider flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-brand-olive fill-current" /> Quick Tap Questions:
                </h5>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  {CHAT_SUGGESTIONS[selectedHero.id].map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(suggestion)}
                      disabled={isLoading}
                      className="text-left bg-brand-cream/35 hover:bg-brand-cream border border-brand-sand p-2.5 rounded-xl text-xxs font-medium text-brand-stone hover:text-brand-dark transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      id={`suggestion-btn-${idx}`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Chat Column */}
            <div className="lg:col-span-3 flex flex-col h-[500px]">
              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-cream/15 rounded-2xl border border-brand-sand/65">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => {
                    const isUser = msg.role === "user";
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                      >
                        <div className="flex items-start gap-2.5 max-w-[85%] md:max-w-[70%]">
                          {!isUser && (
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedHero.bgGradient} flex items-center justify-center text-lg shrink-0 border border-brand-sand/60`}>
                              {selectedHero.emoji.substring(0, 2)}
                            </div>
                          )}

                          <div className="space-y-1">
                            <div
                              className={`p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed ${
                                isUser
                                  ? "bg-brand-olive text-white rounded-tr-none font-medium shadow-xs"
                                  : "bg-white text-brand-dark border border-brand-sand rounded-tl-none font-serif font-medium shadow-xs"
                              }`}
                            >
                              {msg.text}
                            </div>
                            <span className="text-[10px] font-bold text-brand-stone/60 block px-1">
                              {msg.timestamp}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Thinking / Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start items-center gap-2"
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedHero.bgGradient} flex items-center justify-center text-lg animate-bounce`}>
                      {selectedHero.emoji.substring(0, 2)}
                    </div>
                    <div className="bg-white px-3.5 py-2.5 rounded-2xl border border-brand-sand rounded-tl-none text-xxs font-semibold text-brand-stone animate-pulse italic">
                      {thinkingQuote}
                    </div>
                  </motion.div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="pt-4 flex gap-2">
                <input
                  type="text"
                  placeholder={`Ask ${selectedHero.name} anything...`}
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputMsg)}
                  disabled={isLoading}
                  className="flex-1 bg-white border-2 border-brand-sand rounded-xl px-4 py-2.5 text-xs md:text-sm text-brand-dark focus:outline-hidden focus:border-brand-olive transition-colors"
                  id="chat-input-text"
                />

                <motion.button
                  onClick={() => handleSendMessage(inputMsg)}
                  disabled={isLoading || !inputMsg.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand-olive hover:bg-brand-stone text-white font-bold p-2.5 rounded-xl flex items-center justify-center shadow-xs cursor-pointer disabled:opacity-40 shrink-0 animate-fade-in"
                  id="send-message-btn"
                >
                  <Send className="w-5 h-5" />
                </motion.button>

                <button
                  onClick={handleClearHistory}
                  title="Clear chat history"
                  className="bg-brand-sand/30 hover:bg-brand-sand border border-brand-sand text-brand-stone p-2.5 rounded-xl flex items-center justify-center cursor-pointer transition-colors shrink-0"
                  id="clear-chat-btn"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
