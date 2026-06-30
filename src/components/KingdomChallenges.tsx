import React, { useState, useEffect } from "react";
import { Award, CheckCircle2, Sparkles, Star, Trophy, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Challenge {
  id: string;
  text: string;
  emoji: string;
  points: number;
  description: string;
  category: "Home" | "Faith" | "Kindness";
}

const CONST_CHALLENGES: Challenge[] = [
  { id: "parents", text: "Help your parents", emoji: "👨‍👩‍👧", points: 20, description: "Do a helpful chore for mommy or daddy without them even asking!", category: "Home" },
  { id: "chapter", text: "Read one chapter", emoji: "📖", points: 15, description: "Open your Bible and read a whole chapter, or listen to a full story here!", category: "Faith" },
  { id: "pray", text: "Pray for someone", emoji: "🙏", points: 15, description: "Kneel down or bow your head to speak a blessing over a friend or family member.", category: "Faith" },
  { id: "room", text: "Clean your room", emoji: "🧹", points: 20, description: "Put all your toys in their boxes, fold your blankets, and make your bed look neat!", category: "Home" },
  { id: "grandparents", text: "Visit grandparents", emoji: "👴🏼👵🏼", points: 25, description: "Give your grandparents a call, write them a letter, or pay them a lovely visit!", category: "Kindness" },
  { id: "lunch", text: "Share your lunch", emoji: "🥪", points: 20, description: "Offer a snack, a piece of fruit, or a sandwich to a classmate or friend.", category: "Kindness" },
  { id: "verse", text: "Memorize one verse", emoji: "🛡️", points: 20, description: "Solve a puzzle in the Verse Quest and memorize the scripture verse fully!", category: "Faith" },
  { id: "church", text: "Attend church", emoji: "⛪", points: 30, description: "Go to Sunday school, participate in worship, or watch a lesson with your family.", category: "Faith" }
];

interface KingdomChallengesProps {
  onAddScore: (points: number) => void;
}

export default function KingdomChallenges({ onAddScore }: KingdomChallengesProps) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [showCelebration, setShowCelebration] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("kingdom_kids_challenges");
    if (saved) {
      try {
        setCompleted(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleComplete = (chal: Challenge) => {
    if (completed[chal.id]) return; // Already completed

    const updated = { ...completed, [chal.id]: true };
    setCompleted(updated);
    localStorage.setItem("kingdom_kids_challenges", JSON.stringify(updated));

    onAddScore(chal.points);
    setShowCelebration(chal.text);
    setTimeout(() => setShowCelebration(null), 3000);
  };

  const resetAllChallenges = () => {
    setCompleted({});
    localStorage.removeItem("kingdom_kids_challenges");
  };

  const scoreSum = Object.keys(completed).length;

  return (
    <div className="space-y-6" id="kingdom-challenges-root">
      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-white border-4 border-amber-300 rounded-[32px] p-8 max-w-sm w-full text-center space-y-4 shadow-xl"
            >
              <div className="text-6xl animate-bounce">🏆🌟🎉</div>
              <h3 className="text-2xl font-black font-serif text-brand-dark">Awesome Job!</h3>
              <p className="text-xs text-brand-stone font-semibold">
                You successfully completed: <strong className="text-amber-600">"{showCelebration}"</strong>. You earned Coins & Stars!
              </p>
              <button
                onClick={() => setShowCelebration(null)}
                className="bg-amber-400 hover:bg-amber-500 text-white font-black text-xs px-6 py-2 rounded-xl cursor-pointer"
              >
                Collect Coins
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header card */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 p-6 rounded-[32px] text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-yellow-300">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="bg-white/20 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
            🏆 Kingdom Missions
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-serif tracking-tight">
            Daily Kingdom Challenges!
          </h2>
          <p className="text-sm md:text-base text-white/95 max-w-lg font-semibold">
            Become a helpful leader at home and church! Finish daily challenges to gather golden coins and star awards.
          </p>
        </div>
        <div className="text-6xl md:text-8xl select-none mt-4 md:mt-0">
          🏆🌟
        </div>
      </div>

      {/* Progress meter */}
      <div className="bg-white border-3 border-amber-100 p-5 rounded-[28px] flex flex-col md:flex-row items-center justify-between gap-4 shadow-xxs">
        <div className="flex items-center gap-3">
          <Trophy className="w-10 h-10 text-amber-500 fill-amber-100 shrink-0" />
          <div>
            <h4 className="font-extrabold text-sm text-brand-dark">Challenge Mission Progress</h4>
            <p className="text-xxs text-brand-stone font-semibold">You completed {scoreSum} of {CONST_CHALLENGES.length} daily missions.</p>
          </div>
        </div>

        <div className="flex gap-4 items-center w-full md:w-auto">
          <div className="bg-brand-sand/30 w-full md:w-48 h-3.5 rounded-full overflow-hidden border border-brand-sand">
            <div
              style={{ width: `${(scoreSum / CONST_CHALLENGES.length) * 100}%` }}
              className="bg-amber-400 h-full transition-all"
            />
          </div>
          <button
            onClick={resetAllChallenges}
            className="text-[10px] font-black text-brand-stone hover:text-red-500 bg-brand-sand/20 hover:bg-red-50 p-2.5 rounded-xl border border-brand-sand shrink-0 cursor-pointer"
          >
            <RefreshCcw className="w-3.5 h-3.5 inline mr-1" /> Reset All
          </button>
        </div>
      </div>

      {/* Challenges list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CONST_CHALLENGES.map((chal) => {
          const isDone = completed[chal.id];
          return (
            <motion.div
              key={chal.id}
              whileHover={!isDone ? { scale: 1.02 } : {}}
              onClick={() => !isDone && handleComplete(chal)}
              className={`p-5 border-3 rounded-2xl flex items-center justify-between gap-4 transition-all relative overflow-hidden ${
                isDone
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800 opacity-80"
                  : "bg-white border-amber-100 hover:border-amber-400 text-brand-dark cursor-pointer shadow-xs"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <span className="text-4xl filter drop-shadow-xxs shrink-0">{chal.emoji}</span>
                <div className="space-y-1">
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                    chal.category === "Home" ? "bg-amber-100 text-amber-800" :
                    chal.category === "Faith" ? "bg-purple-100 text-purple-800" :
                    "bg-rose-100 text-rose-800"
                  }`}>
                    {chal.category}
                  </span>
                  <h5 className="font-extrabold text-sm leading-snug">{chal.text}</h5>
                  <p className="text-[10px] text-brand-stone font-semibold leading-relaxed">
                    {chal.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-center space-y-1">
                {isDone ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 fill-emerald-100 mx-auto" />
                ) : (
                  <span className="text-[10px] font-black bg-amber-50 text-amber-600 border border-amber-200 px-2.5 py-1 rounded-lg block">
                    +{chal.points} Coins
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
