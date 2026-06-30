import { useState, useEffect } from "react";
import { MEMORY_VERSES } from "../data";
import { MemoryVerse } from "../types";
import { Shield, Sparkles, RefreshCcw, CheckCircle2, Award, Info, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MemoryVerseMasterProps {
  onAddScore: (points: number) => void;
  collectedVerses: string[];
  onCollectVerse: (ref: string) => void;
}

export default function MemoryVerseMaster({
  onAddScore,
  collectedVerses,
  onCollectVerse,
}: MemoryVerseMasterProps) {
  const [selectedVerse, setSelectedVerse] = useState<MemoryVerse>(MEMORY_VERSES[0]);
  
  // Game states
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [assembledWords, setAssembledWords] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameError, setGameError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Initialize Word Scramble Game
  useEffect(() => {
    initGame(selectedVerse);
  }, [selectedVerse]);

  const initGame = (verseObj: MemoryVerse) => {
    // Strip punctuation and split into clean words
    const cleanWords = verseObj.verse
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .split(/\s+/);
    
    // Create copy and scramble using randomized sort
    const scrambled = [...cleanWords].sort(() => Math.random() - 0.5);
    
    // Ensure it's actually scrambled (if by luck it's identical, re-scramble)
    if (scrambled.join(" ") === cleanWords.join(" ") && cleanWords.length > 1) {
      scrambled.reverse();
    }

    setScrambledWords(scrambled);
    setAssembledWords([]);
    setGameWon(false);
    setGameError(false);
    setShowHint(false);
  };

  const handleWordTap = (word: string, fromAssembled: boolean) => {
    if (gameWon) return;
    setGameError(false);

    if (fromAssembled) {
      // Put word back into scrambled options
      setAssembledWords((prev) => prev.filter((w) => w !== word));
      setScrambledWords((prev) => [...prev, word]);
    } else {
      // Move word into assembled slots
      setScrambledWords((prev) => prev.filter((w) => w !== word));
      setAssembledWords((prev) => [...prev, word]);
    }
  };

  const checkAnswer = () => {
    const cleanTarget = selectedVerse.verse
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .split(/\s+/);

    if (assembledWords.join(" ") === cleanTarget.join(" ")) {
      setGameWon(true);
      onAddScore(selectedVerse.points);
      onCollectVerse(selectedVerse.reference);
    } else {
      setGameError(true);
    }
  };

  const isCollected = collectedVerses.includes(selectedVerse.reference);

  return (
    <div className="space-y-8" id="memory-verse-root">
      {/* Header banner */}
      <div className="bg-brand-sand p-6 rounded-[32px] text-brand-dark shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-brand-sand/55">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="bg-brand-olive/20 text-brand-stone font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
            🛡️ Shield Quest
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-brand-dark">
            Scripture Shield Vault!
          </h2>
          <p className="text-sm md:text-base text-brand-stone max-w-lg font-medium">
            Solve word puzzles to lock Bible verses in your heart. Collect beautiful glowing shields and earn points!
          </p>
        </div>
        <div className="text-6xl md:text-8xl select-none mt-4 md:mt-0 animate-bounce duration-1000">
          🛡️
        </div>
      </div>

      {/* Main Layout split */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left column: Shield shelf */}
        <div className="lg:col-span-1 bg-white border-2 border-brand-sand rounded-[32px] p-5 space-y-4 shadow-xs h-fit">
          <h3 className="font-bold font-serif text-brand-stone flex items-center gap-1.5 text-sm">
            <Award className="text-brand-olive w-4 h-4" /> Shield Shelf
          </h3>

          <div className="space-y-2.5">
            {MEMORY_VERSES.map((verse) => {
              const active = verse.reference === selectedVerse.reference;
              const completed = collectedVerses.includes(verse.reference);
              return (
                <button
                  key={verse.reference}
                  onClick={() => setSelectedVerse(verse)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    active
                      ? "bg-brand-sage/15 border-brand-sage/40 scale-[1.02]"
                      : completed
                      ? "bg-brand-cream/45 border-brand-sand/40"
                      : "bg-white border-brand-sand/35 hover:border-brand-sand"
                  }`}
                  id={`verse-shelf-btn-${verse.reference.replace(/\s+/g, "-")}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Shield
                      className={`w-5 h-5 shrink-0 ${
                        completed
                          ? "text-brand-olive fill-brand-cream/10"
                          : active
                          ? "text-brand-olive fill-brand-cream/5"
                          : "text-brand-stone/40"
                      }`}
                    />
                    <div className="space-y-0.5">
                      <p className="text-[11px] font-bold text-brand-dark">{verse.reference}</p>
                      <p className="text-[9px] text-brand-stone/80 font-medium truncate max-w-[120px]">
                        "{verse.verse}"
                      </p>
                    </div>
                  </div>

                  {completed && (
                    <CheckCircle2 className="w-4 h-4 text-brand-olive shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: Gameplay board */}
        <div className="lg:col-span-3 bg-white border-2 border-brand-sand rounded-[32px] p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-brand-sand/65 pb-4">
            <div>
              <span className="text-xxs font-bold text-brand-stone uppercase tracking-wide">
                Active Shield Quest
              </span>
              <h3 className="text-lg font-bold font-serif text-brand-dark">
                Collect: {selectedVerse.reference}
              </h3>
            </div>
            <div className="bg-brand-sage/15 text-brand-olive px-3.5 py-1.5 rounded-full text-xs font-bold border border-brand-sage/40">
              +{selectedVerse.points} XP Points
            </div>
          </div>

          {/* Achievement shield display */}
          {isCollected && !gameWon && (
            <div className="bg-brand-cream/35 border border-brand-sand p-4 rounded-2xl flex items-center gap-3">
              <span className="text-2xl">🛡️🌟</span>
              <div>
                <p className="text-xs text-brand-dark font-bold">
                  You already collected this Shield of Faith!
                </p>
                <p className="text-xxs text-brand-stone">
                  You can play again to refresh your memory, but you've already unlocked its points. Awesome job!
                </p>
              </div>
            </div>
          )}

          {/* GAMEPLAY WINDOW */}
          <div className="space-y-6">
            {/* 1. Word Assembly Slots Box */}
            <div className="min-h-24 bg-brand-cream/15 border-2 border-dashed border-brand-sand rounded-2xl p-5 flex flex-wrap gap-2.5 items-center justify-center content-center relative">
              <AnimatePresence>
                {assembledWords.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-semibold text-brand-stone/80 italic text-center"
                  >
                    Tap the scrambled words below in the correct order!
                  </motion.p>
                ) : (
                  assembledWords.map((word, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => handleWordTap(word, true)}
                      className="bg-brand-olive hover:bg-brand-stone text-white font-semibold text-xs md:text-sm px-4 py-2 rounded-xl cursor-pointer shadow-xs border-b-2 border-brand-stone/60 transition-transform active:scale-95"
                      id={`assembled-word-${idx}`}
                    >
                      {word}
                    </motion.button>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* 2. Scrambled Words Source Box */}
            {!gameWon && (
              <div className="bg-brand-cream/25 p-5 rounded-2xl border border-brand-sand space-y-3">
                <span className="text-[10px] font-bold text-brand-stone uppercase tracking-wider block">
                  Scrambled Word Pot
                </span>
                <div className="flex flex-wrap gap-2.5 justify-center">
                  <AnimatePresence>
                    {scrambledWords.map((word, idx) => (
                      <motion.button
                        key={word + "-" + idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => handleWordTap(word, false)}
                        className="bg-white hover:bg-brand-cream/10 border-2 border-brand-sand/65 text-brand-stone font-semibold text-xs md:text-sm px-4 py-2 rounded-xl cursor-pointer shadow-xs transition-all"
                        id={`scrambled-word-${idx}`}
                      >
                        {word}
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* 3. Feedback Alert banner */}
            <AnimatePresence>
              {gameWon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-brand-olive p-6 rounded-2xl text-white space-y-3 shadow-xs relative overflow-hidden"
                >
                  <div className="absolute right-4 top-4 text-brand-cream/20 opacity-20">
                    <Shield className="w-24 h-24 rotate-12" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">🥳🌟</span>
                    <h4 className="text-xl font-bold font-serif">Shield Locked & Collected!</h4>
                  </div>
                  <p className="text-sm font-medium leading-relaxed max-w-lg">
                    Incredible job! You pieced it together perfectly:
                  </p>
                  <p className="text-base font-bold text-brand-cream tracking-wide font-serif leading-snug">
                    "{selectedVerse.verse}"
                  </p>
                </motion.div>
              )}

              {gameError && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-xl text-xs font-semibold"
                >
                  Oops! That's not quite the right order yet. Keep trying! You can use the hint button if you get stuck.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hint Box */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-brand-cream border border-brand-sand p-4 rounded-xl space-y-1"
                >
                  <p className="text-xxs font-extrabold text-brand-dark uppercase tracking-wide flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" /> Shield Helper Hint:
                  </p>
                  <p className="text-xs text-brand-stone font-semibold leading-relaxed">
                    "{selectedVerse.verse}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gameplay controls */}
            <div className="flex items-center justify-between pt-2 border-t border-brand-sand/65">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="bg-brand-sand/30 hover:bg-brand-sand border border-brand-sand text-brand-stone font-bold px-3.5 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1"
                  id="hint-btn"
                >
                  <HelpCircle className="w-4 h-4" /> {showHint ? "Hide Hint" : "Need Hint?"}
                </button>
                <button
                  onClick={() => initGame(selectedVerse)}
                  className="bg-brand-sand/30 hover:bg-brand-sand border border-brand-sand text-brand-stone font-bold px-3.5 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1"
                  id="reset-verse-btn"
                >
                  <RefreshCcw className="w-4 h-4" /> Reset Game
                </button>
              </div>

              {!gameWon && (
                <button
                  onClick={checkAnswer}
                  disabled={scrambledWords.length > 0}
                  className="bg-brand-olive text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-brand-stone transition-all cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed shadow-xs"
                  id="verify-scramble-btn"
                >
                  Lock in Shield!
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
