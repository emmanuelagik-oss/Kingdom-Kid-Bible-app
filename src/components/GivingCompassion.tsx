import React, { useState } from "react";
import { Heart, Gift, Sparkles, Star, Award, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CharityGoal {
  id: string;
  title: string;
  desc: string;
  targetCoins: number;
  currentCoins: number;
  emoji: string;
  category: "Animals" | "Education" | "Community";
}

const CONST_CHARITIES: CharityGoal[] = [
  { id: "ch1", title: "Feed local shelter puppies", desc: "Donate golden coins to help buy healthy kibble and cozy blankets for homeless puppies and kittens.", targetCoins: 100, currentCoins: 45, emoji: "🐶🦴", category: "Animals" },
  { id: "ch2", title: "Solar Lights for rural students", desc: "Help purchase safe solar-powered studying desk lights for kids in off-grid villages.", targetCoins: 150, currentCoins: 80, emoji: "☀️🎒", category: "Education" },
  { id: "ch3", title: "Donate warm winter blankets", desc: "Provide high-quality thick wool blankets for families staying in cold mountain shelters.", targetCoins: 200, currentCoins: 110, emoji: "🛌🏔️", category: "Community" },
  { id: "ch4", title: "Storybooks for orphanage libraries", desc: "Fund beautiful illustrated children's storybooks for kids who love to learn and read.", targetCoins: 120, currentCoins: 60, emoji: "📚🕊️", category: "Community" }
];

interface GivingCompassionProps {
  userScore: number;
  onDeductScore: (points: number) => void;
}

export default function GivingCompassion({ userScore, onDeductScore }: GivingCompassionProps) {
  const [charities, setCharities] = useState<CharityGoal[]>(CONST_CHARITIES);
  const [showCelebration, setShowCelebration] = useState<string | null>(null);

  const handleDonate = (id: string, amount: number) => {
    if (userScore < amount) {
      alert("⚠️ You need to collect more Kingdom Coins from games first!");
      return;
    }

    onDeductScore(amount);
    
    setCharities(prev =>
      prev.map(ch => {
        if (ch.id === id) {
          const updated = ch.currentCoins + amount;
          if (updated >= ch.targetCoins) {
            setShowCelebration(ch.title);
            setTimeout(() => setShowCelebration(null), 3500);
          }
          return { ...ch, currentCoins: Math.min(updated, ch.targetCoins) };
        }
        return ch;
      })
    );
  };

  return (
    <div className="space-y-6" id="giving-compassion-root">
      {/* Toast Alert */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-rose-100 border-2 border-rose-300 text-rose-800 p-4 rounded-2xl text-center font-black text-xs flex items-center justify-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4 text-rose-600" /> 🎉 Hooray! Charity Goal "{showCelebration}" has been fully funded! Parents receive a real certificate!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner */}
      <div className="bg-gradient-to-r from-red-400 via-rose-500 to-pink-500 p-6 rounded-[32px] text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-rose-300">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="bg-white/20 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
            ❤️ Giving Compassion
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-serif tracking-tight">
            Micro Charity Compassion Goals!
          </h2>
          <p className="text-sm md:text-base text-white/95 max-w-lg font-semibold">
            Learn the true joy of sharing! Spend your hard-earned Kingdom Coins to fund real simulated projects for puppies, students, and cold mountain families.
          </p>
        </div>
        <div className="text-6xl md:text-8xl select-none mt-4 md:mt-0">
          ❤️🎁
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {charities.map((ch) => {
          const isFunded = ch.currentCoins >= ch.targetCoins;
          const percentage = Math.min((ch.currentCoins / ch.targetCoins) * 100, 100);
          
          return (
            <div
              key={ch.id}
              className={`bg-white border-3 rounded-[28px] p-5 flex flex-col justify-between space-y-4 shadow-xxs transition-all relative overflow-hidden ${
                isFunded ? "border-emerald-200 bg-emerald-50/15" : "border-rose-100 hover:border-rose-300"
              }`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-4xl select-none">{ch.emoji}</span>
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                    ch.category === "Animals" ? "bg-amber-100 text-amber-800" :
                    ch.category === "Education" ? "bg-purple-100 text-purple-800" :
                    "bg-rose-100 text-rose-800"
                  }`}>
                    {ch.category}
                  </span>
                </div>

                <h4 className="font-extrabold text-sm text-brand-dark leading-tight">{ch.title}</h4>
                <p className="text-[10px] text-brand-stone font-semibold leading-relaxed">
                  {ch.desc}
                </p>
              </div>

              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-brand-stone font-bold">
                  <span>Progress: {ch.currentCoins} / {ch.targetCoins} Coins</span>
                  <span>{Math.floor(percentage)}%</span>
                </div>
                <div className="h-2.5 bg-brand-sand/55 rounded-full overflow-hidden border border-brand-sand">
                  <div
                    style={{ width: `${percentage}%` }}
                    className={`h-full rounded-full transition-all ${
                      isFunded ? "bg-emerald-500" : "bg-rose-400"
                    }`}
                  />
                </div>
              </div>

              {/* Donation Buttons */}
              <div className="flex gap-2 pt-2 border-t border-brand-sand/40">
                {isFunded ? (
                  <div className="w-full text-center bg-emerald-100 border border-emerald-300 text-emerald-800 text-xxs font-black p-2 rounded-xl flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Goal Fully Funded! God Blesses You!
                  </div>
                ) : (
                  <>
                    <button
                      disabled={userScore < 10}
                      onClick={() => handleDonate(ch.id, 10)}
                      className="flex-1 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 disabled:opacity-40 border border-rose-200 text-xxs font-black rounded-xl cursor-pointer transition-colors"
                    >
                      🎁 Give 10 Coins
                    </button>
                    <button
                      disabled={userScore < 25}
                      onClick={() => handleDonate(ch.id, 25)}
                      className="flex-1 py-2 bg-rose-500 hover:bg-rose-600 text-white disabled:opacity-40 text-xxs font-black rounded-xl cursor-pointer transition-colors"
                    >
                      ❤️ Give 25 Coins
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
