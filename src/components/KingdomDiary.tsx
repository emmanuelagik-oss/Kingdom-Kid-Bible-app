import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Palette, CheckCircle, Heart, Star, Calendar, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DiaryEntry {
  id: string;
  date: string;
  learned: string;
  prayed: string;
  obeyed: string;
  helped: string;
  verse: string;
  mood: string;
  canvasImage: string; // Base64 image
}

interface KingdomDiaryProps {
  onAddScore: (points: number) => void;
}

export default function KingdomDiary({ onAddScore }: KingdomDiaryProps) {
  const [learned, setLearned] = useState("");
  const [prayed, setPrayed] = useState("");
  const [obeyed, setObeyed] = useState("");
  const [helped, setHelped] = useState("");
  const [verse, setVerse] = useState("");
  const [selectedMood, setSelectedMood] = useState("😊");
  const [savedEntries, setSavedEntries] = useState<DiaryEntry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Drawing Canvas States
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#F59E0B"); // Gold
  const [brushWidth, setBrushWidth] = useState(5);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  // Colors list
  const BRUSH_COLORS = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#111827"];
  const STICKERS = ["⭐", "⛪", "🌈", "👑", "🐑", "⛵", "🕊️", "🍎"];

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FAF7F5"; // Soft cream blackboard background
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    loadEntries();
  }, []);

  const loadEntries = () => {
    const local = localStorage.getItem("kingdom_kids_diary");
    if (local) {
      try {
        setSavedEntries(JSON.parse(local));
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getEventCoords(e, canvas);
    if (selectedSticker) {
      // Draw sticker stamp
      ctx.font = "32px sans-serif";
      ctx.fillText(selectedSticker, coords.x - 16, coords.y + 10);
      return;
    }

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || selectedSticker) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getEventCoords(e, canvas);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const getEventCoords = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FAF7F5";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    setSelectedSticker(null);
  };

  const handleSaveDiary = (e: React.FormEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" }),
      learned: learned.trim() || "Studied beautiful Bible verses.",
      prayed: prayed.trim() || "Thanked God for today.",
      obeyed: obeyed.trim() || "Listened to my parents with kindness.",
      helped: helped.trim() || "Shared my toys with my siblings.",
      verse: verse.trim() || "God is love - 1 John 4:8",
      mood: selectedMood,
      canvasImage: dataUrl
    };

    const updated = [newEntry, ...savedEntries];
    setSavedEntries(updated);
    localStorage.setItem("kingdom_kids_diary", JSON.stringify(updated));

    // Reset Form
    setLearned("");
    setPrayed("");
    setObeyed("");
    setHelped("");
    setVerse("");
    setSelectedMood("😊");
    clearCanvas();

    // Reward child
    onAddScore(30); // Earning 30 coins for journaling!
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const deleteEntry = (id: string) => {
    const updated = savedEntries.filter(entry => entry.id !== id);
    setSavedEntries(updated);
    localStorage.setItem("kingdom_kids_diary", JSON.stringify(updated));
  };

  return (
    <div className="space-y-6" id="kingdom-diary-root">
      {/* Success banner */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-purple-100 border-2 border-purple-300 text-purple-800 p-4 rounded-2xl text-center font-black text-sm flex items-center justify-center gap-2"
          >
            🎉 Saved in Parents' Vault! You earned 30 Coins & Stars!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Diary entry form */}
        <div className="lg:col-span-3 bg-white border-3 border-purple-100 rounded-[32px] p-6 space-y-5 shadow-xs">
          <div className="flex items-center gap-2 text-purple-600 border-b border-brand-sand pb-3">
            <Sparkles className="w-5 h-5 animate-spin duration-[4000ms]" />
            <h4 className="font-extrabold text-sm font-serif">Diary of a Kingdom Kid</h4>
          </div>

          <form onSubmit={handleSaveDiary} className="space-y-4">
            {/* Mood Tracker */}
            <div className="space-y-2">
              <label className="block text-xxs font-black text-brand-stone uppercase tracking-wide">
                Today's Mood Tracker:
              </label>
              <div className="flex gap-4">
                {[
                  { face: "😊", label: "Playful" },
                  { face: "😐", label: "Quiet" },
                  { face: "😢", label: "Sad" },
                  { face: "😡", label: "Mad" }
                ].map((m) => (
                  <button
                    type="button"
                    key={m.face}
                    onClick={() => setSelectedMood(m.face)}
                    className={`flex-1 p-3.5 rounded-2xl border-2 text-2xl transition-all cursor-pointer ${
                      selectedMood === m.face
                        ? "bg-purple-50 border-purple-400 scale-105"
                        : "bg-white border-brand-sand/40 hover:border-brand-sand"
                    }`}
                  >
                    <span className="block">{m.face}</span>
                    <span className="block text-[8px] font-bold text-brand-stone uppercase mt-1">
                      {m.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Questions list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xxs font-black text-brand-stone mb-1 uppercase tracking-wider">
                  📖 Today I learned:
                </label>
                <input
                  type="text"
                  placeholder="e.g. David was brave"
                  value={learned}
                  onChange={(e) => setLearned(e.target.value)}
                  className="w-full bg-purple-50/40 border border-purple-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xxs font-black text-brand-stone mb-1 uppercase tracking-wider">
                  🙏 Today I prayed:
                </label>
                <input
                  type="text"
                  placeholder="e.g. for my brother to feel better"
                  value={prayed}
                  onChange={(e) => setPrayed(e.target.value)}
                  className="w-full bg-purple-50/40 border border-purple-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xxs font-black text-brand-stone mb-1 uppercase tracking-wider">
                  🤝 Today I obeyed:
                </label>
                <input
                  type="text"
                  placeholder="e.g. put my toys away immediately"
                  value={obeyed}
                  onChange={(e) => setObeyed(e.target.value)}
                  className="w-full bg-purple-50/40 border border-purple-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xxs font-black text-brand-stone mb-1 uppercase tracking-wider">
                  🍎 Today I helped:
                </label>
                <input
                  type="text"
                  placeholder="e.g. helped mommy clean the plates"
                  value={helped}
                  onChange={(e) => setHelped(e.target.value)}
                  className="w-full bg-purple-50/40 border border-purple-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xxs font-black text-brand-stone mb-1 uppercase tracking-wider">
                  🛡️ Today's Memory Verse:
                </label>
                <input
                  type="text"
                  placeholder="e.g. God is love - 1 John 4:8"
                  value={verse}
                  onChange={(e) => setVerse(e.target.value)}
                  className="w-full bg-purple-50/40 border border-purple-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" /> Save Today's Journal & Earn 30 Coins!
            </button>
          </form>
        </div>

        {/* Doodle Board Canvas */}
        <div className="lg:col-span-2 bg-white border-3 border-purple-100 rounded-[32px] p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-1">
            <h4 className="font-extrabold text-sm text-brand-dark font-serif flex items-center gap-1.5 text-purple-600">
              <Palette className="w-4 h-4" /> Draw Today's Picture
            </h4>
            <p className="text-xxs text-brand-stone font-semibold">
              Select paint colors, brush sizes, or tap stamp icons below to decorate your daily sketch!
            </p>
          </div>

          {/* Blackboard container */}
          <div className="relative border-2 border-purple-200 rounded-2xl overflow-hidden shrink-0">
            <canvas
              ref={canvasRef}
              width={320}
              height={220}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full bg-[#FAF7F5] block cursor-crosshair touch-none"
            />
          </div>

          {/* Brushes, Colors, Stamps bar */}
          <div className="space-y-3">
            {/* Color Selectors */}
            <div className="flex gap-2.5 items-center">
              <span className="text-[10px] font-bold text-brand-stone uppercase shrink-0">Colors:</span>
              <div className="flex flex-wrap gap-1.5">
                {BRUSH_COLORS.map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => {
                      setBrushColor(col);
                      setSelectedSticker(null);
                    }}
                    style={{ backgroundColor: col }}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      brushColor === col && !selectedSticker ? "border-brand-dark scale-110 shadow-xs" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Sticker Stampers */}
            <div className="flex gap-2 items-center">
              <span className="text-[10px] font-bold text-brand-stone uppercase shrink-0">Sticker Stamps:</span>
              <div className="flex flex-wrap gap-1.5">
                {STICKERS.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSelectedSticker(st)}
                    className={`text-sm w-7 h-7 flex items-center justify-center border rounded-lg transition-all ${
                      selectedSticker === st ? "bg-purple-100 border-purple-400 scale-115 shadow-xxs" : "bg-white border-brand-sand/50"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Brush widths / Clear button */}
            <div className="flex items-center justify-between border-t border-brand-sand/50 pt-2">
              <div className="flex gap-3 items-center">
                <span className="text-[10px] font-bold text-brand-stone uppercase">Size:</span>
                <input
                  type="range"
                  min={2}
                  max={12}
                  value={brushWidth}
                  onChange={(e) => setBrushWidth(Number(e.target.value))}
                  className="w-20 cursor-pointer accent-purple-500"
                />
              </div>
              <button
                type="button"
                onClick={clearCanvas}
                className="text-[10px] font-black text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3 py-1 rounded-lg cursor-pointer"
              >
                Clear Sketch Board
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Diary history viewer */}
      {savedEntries.length > 0 && (
        <div className="space-y-4 pt-4 border-t-2 border-brand-sand/60">
          <h4 className="font-extrabold text-sm text-brand-stone flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-purple-500" /> Historic Journal logs ({savedEntries.length})
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white border-2 border-brand-sand/60 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-start shadow-xxs"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xl mr-1">{entry.mood}</span>
                      <span className="text-xxs font-extrabold text-brand-stone/80 leading-none">{entry.date}</span>
                    </div>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-red-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xxs font-semibold text-brand-stone">
                    <p>📖 <strong>Today I learned:</strong> {entry.learned}</p>
                    <p>🙏 <strong>Today I prayed:</strong> {entry.prayed}</p>
                    <p>🤝 <strong>Today I obeyed:</strong> {entry.obeyed}</p>
                    <p>🍎 <strong>Today I helped:</strong> {entry.helped}</p>
                    <p className="font-bold text-brand-dark">🛡️ <strong>Verse:</strong> {entry.verse}</p>
                  </div>
                </div>

                {entry.canvasImage && (
                  <div className="w-full md:w-28 h-20 border border-brand-sand/60 rounded-xl overflow-hidden shrink-0 bg-[#FAF7F5]">
                    <img
                      src={entry.canvasImage}
                      alt="Kid's daily sketch"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
