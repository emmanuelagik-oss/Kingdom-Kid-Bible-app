import React, { useState } from "react";
import { Printer, Download, Star, Sparkles, FileText, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PrintableSheet {
  id: string;
  title: string;
  category: "Coloring" | "Memory Cards" | "Activity Sheets";
  desc: string;
  points: number;
  emoji: string;
}

const SHEETS: PrintableSheet[] = [
  { id: "col1", title: "Noah's Rainbow Coloring Page", category: "Coloring", desc: "A beautifully outlined giant ark floating on wave crests beneath a giant arching rainbow.", points: 10, emoji: "🎨🌈" },
  { id: "col2", title: "Brave David with Slingshot outline", category: "Coloring", desc: "Coloring page showing young shepherd David standing boldly with his leather shepherd bag.", points: 10, emoji: "🐑🎯" },
  { id: "card1", title: "Twelve Disciples memory flashcards", category: "Memory Cards", desc: "Cutout cards showing each disciple, their emblem, and their core strength for easy memorization.", points: 15, emoji: "✂️🐟" },
  { id: "act1", title: "Goliath Shield Maze sheet", category: "Activity Sheets", desc: "Help David navigate his way through the winding rocky mountain pathways to find his sheep.", points: 15, emoji: "🧩⛰️" },
  { id: "act2", title: "Armor of God cut & glue workbook", category: "Activity Sheets", desc: "Cut out the Helmet of Salvation, Breastplate of Righteousness, and shield to dress up your Kingdom Kid!", points: 20, emoji: "🛡️⚔️" }
];

interface PrintableResourcesProps {
  onAddScore: (points: number) => void;
}

export default function PrintableResources({ onAddScore }: PrintableResourcesProps) {
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});
  const [showCelebration, setShowCelebration] = useState<string | null>(null);

  const handleDownload = (sheet: PrintableSheet) => {
    // Open print view or mock file creation download trigger
    onAddScore(sheet.points);
    setDownloaded(prev => ({ ...prev, [sheet.id]: true }));
    setShowCelebration(sheet.title);
    setTimeout(() => setShowCelebration(null), 3000);
  };

  return (
    <div className="space-y-6" id="printable-resources-root">
      {/* Celebration Toast */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-emerald-100 border-2 border-emerald-300 text-emerald-800 p-4 rounded-2xl text-center font-black text-xs flex items-center justify-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" /> Ready for Printer! Downloaded "{showCelebration}". Earned Stars!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 p-6 rounded-[32px] text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-sky-300">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="bg-white/20 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
            🖨️ Family Printable Zone
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-serif tracking-tight">
            Printable Workbooks & Crafts!
          </h2>
          <p className="text-sm md:text-base text-white/95 max-w-lg font-semibold">
            Print coloring pages, bible flashcards, armor cutouts, and mazes for your dinner table and classroom!
          </p>
        </div>
        <div className="text-6xl md:text-8xl select-none mt-4 md:mt-0">
          🖨️🎨
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-brand-stone font-serif flex items-center gap-2">
          <FileText className="text-sky-500 w-5 h-5" /> Download Workbooks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHEETS.map((sheet) => {
            const active = downloaded[sheet.id];
            return (
              <div
                key={sheet.id}
                className="bg-white border-2 border-sky-100 rounded-2xl p-5 flex flex-col justify-between hover:border-sky-300 transition-all shadow-xxs h-56"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-3xl select-none">{sheet.emoji}</span>
                    <span className="text-[9px] font-black uppercase text-sky-600 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full">
                      {sheet.category}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-brand-dark leading-tight">{sheet.title}</h4>
                  <p className="text-[10px] text-brand-stone font-semibold leading-relaxed line-clamp-2">
                    {sheet.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-sky-50/50">
                  <button
                    onClick={() => handleDownload(sheet)}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-black text-xxs px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print sheet
                  </button>
                  <span className="text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    {active ? "Printed ✓" : `+${sheet.points} Coins`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
