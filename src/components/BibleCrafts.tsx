import React, { useState } from "react";
import { Scissors, Hammer, Star, Check, Award, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CraftGuide {
  id: string;
  title: string;
  materials: string[];
  steps: string[];
  difficulty: "Easy" | "Medium" | "Hero";
  emoji: string;
  points: number;
}

const CRAFTS: CraftGuide[] = [
  {
    id: "cr1",
    title: "Cardboard Egg Carton Noah's Ark",
    difficulty: "Easy",
    points: 25,
    emoji: "⛵🪵",
    materials: ["Empty egg carton", "Scissors & child-safe glue", "Brown poster paint", "Two paper cutouts of sheep & lions"],
    steps: [
      "Paint the bottom half of the egg carton brown to look like sturdy cedar wood.",
      "Carefully cut out two little doors on the sides for the animals to enter.",
      "Populate the cups with your favorite plastic or paper-mache animal duos!",
      "Top with a blue paper flag and watch your ark float across the carpet!"
    ]
  },
  {
    id: "cr2",
    title: "David's Felt Stone Sling Pouch",
    difficulty: "Medium",
    points: 30,
    emoji: "🎯🪨",
    materials: ["Small scrap of brown felt or soft cloth", "Two pieces of yarn / wool string", "Hole puncher", "Five smooth cotton balls"],
    steps: [
      "Cut a neat oval shape out of the brown felt (about the size of your hand palm).",
      "Punch two small holes carefully on both pointed ends of the felt oval.",
      "Tie one string securely to each hole, leaving long soft tails.",
      "Load with soft cotton balls, hold strings together, and practice soft shepherd swings!"
    ]
  },
  {
    id: "cr3",
    title: "Elijah's Fiery Tissue Paper Chariot",
    difficulty: "Hero",
    points: 40,
    emoji: "🔥🐎",
    materials: ["Toilet paper cardboard tube", "Orange & red tissue paper sheets", "Two plastic bottle caps for wheels", "Glue & toothpicks"],
    steps: [
      "Cut a small square opening on the top side of the cardboard tube to make the chariot seat.",
      "Glue two plastic bottle caps to the bottom sides using glue or toothpicks to make wheels.",
      "Stuff the back with bright red and golden orange tissue paper to look like flaming tracks!",
      "Add a paper horse cutout in front and pull it along your glowing road of glory!"
    ]
  }
];

interface BibleCraftsProps {
  onAddScore: (points: number) => void;
}

export default function BibleCrafts({ onAddScore }: BibleCraftsProps) {
  const [selectedCraft, setSelectedCraft] = useState<CraftGuide>(CRAFTS[0]);
  const [doneCrafts, setDoneCrafts] = useState<Record<string, boolean>>({});

  const handleCompleteCraft = (craft: CraftGuide) => {
    if (doneCrafts[craft.id]) return;
    onAddScore(craft.points);
    setDoneCrafts(prev => ({ ...prev, [craft.id]: true }));
  };

  return (
    <div className="space-y-6" id="bible-crafts-root">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 p-6 rounded-[32px] text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-yellow-300">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="bg-white/20 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
            ✂️ Kingdom Crafts Studio
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-serif tracking-tight">
            Creative Bible Crafts!
          </h2>
          <p className="text-sm md:text-base text-white/95 max-w-lg font-semibold">
            Turn recyclables, cardboard, felt, and paint into beautiful representations of your favorite Bible stories!
          </p>
        </div>
        <div className="text-6xl md:text-8xl select-none mt-4 md:mt-0">
          ✂️🪵
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Side Select List */}
        <div className="lg:col-span-2 bg-white border-3 border-amber-100 rounded-[32px] p-5 h-fit space-y-4">
          <h4 className="font-extrabold text-sm text-amber-700 flex items-center gap-1.5 border-b border-brand-sand pb-3">
            <Scissors className="w-5 h-5 text-amber-500" /> Blueprint Projects
          </h4>

          <div className="space-y-2">
            {CRAFTS.map((craft) => {
              const active = craft.id === selectedCraft.id;
              const isDone = doneCrafts[craft.id];
              return (
                <button
                  key={craft.id}
                  onClick={() => setSelectedCraft(craft)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    active
                      ? "bg-amber-50 border-amber-300 scale-[1.01]"
                      : "bg-white border-brand-sand/50 hover:border-amber-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-3xl shrink-0">{craft.emoji}</span>
                    <div className="min-w-0">
                      <h5 className="font-extrabold text-xs text-brand-dark leading-snug truncate">{craft.title}</h5>
                      <span className={`text-[8px] font-black uppercase mt-1 px-2 py-0.5 rounded-full inline-block ${
                        craft.difficulty === "Easy" ? "bg-emerald-100 text-emerald-800" :
                        craft.difficulty === "Medium" ? "bg-amber-100 text-amber-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {craft.difficulty}
                      </span>
                    </div>
                  </div>
                  {isDone ? (
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 ml-1" />
                  ) : (
                    <ChevronRight className={`w-4 h-4 ${active ? "text-amber-500" : "text-brand-stone/30"}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Blueprint Step guides */}
        <div className="lg:col-span-3 bg-white border-3 border-amber-200 rounded-[36px] p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-brand-sand pb-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl filter drop-shadow-xxs">{selectedCraft.emoji}</span>
              <div>
                <h4 className="font-black text-sm md:text-base text-brand-dark font-serif">{selectedCraft.title}</h4>
                <p className="text-xxs font-black text-amber-600 uppercase">Interactive Build Blueprint</p>
              </div>
            </div>
          </div>

          {/* Materials */}
          <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-xl space-y-2">
            <h5 className="text-[10px] font-black text-amber-800 uppercase flex items-center gap-1">
              🛠️ Material Checklist:
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {selectedCraft.materials.map((mat, idx) => (
                <span
                  key={idx}
                  className="bg-white border border-amber-200 text-brand-stone text-[10px] font-semibold px-2.5 py-1 rounded-lg"
                >
                  ✓ {mat}
                </span>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-xs text-brand-stone uppercase tracking-wide">
              📋 Step-By-Step Instructions:
            </h5>

            <div className="space-y-2.5">
              {selectedCraft.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 bg-brand-sand/15 border border-brand-sand/55 rounded-xl text-xxs font-semibold text-brand-stone"
                >
                  <span className="bg-amber-400 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">
                    {idx + 1}
                  </span>
                  <p className="pt-0.5 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Button */}
          <div className="pt-4 border-t border-brand-sand">
            {!doneCrafts[selectedCraft.id] ? (
              <button
                onClick={() => handleCompleteCraft(selectedCraft)}
                className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Award className="w-4.5 h-4.5" /> Tried This Craft! Claim +{selectedCraft.points} Coins
              </button>
            ) : (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-center text-emerald-800 text-xs font-black">
                🎉 Craft completed! You earned +{selectedCraft.points} Coins & Stars!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
