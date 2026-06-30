import React, { useState, useRef, useEffect } from "react";
import { COLORING_PAGES } from "../data";
import { ColoringPage } from "../types";
import { Palette, Trash2, Camera, HelpCircle, Check, Grid, Sparkles, Smile, PencilLine } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const PALETTE_COLORS = [
  "#EF4444", // Red
  "#F97316", // Orange
  "#F59E0B", // Yellow
  "#10B981", // Green
  "#06B6D4", // Cyan
  "#3B82F6", // Royal Blue
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#78350F", // Dark Brown
  "#334155", // Charcoal Gray
  "#FFFFFF", // White
];

export default function ColoringBook() {
  const [activeTab, setActiveTab] = useState<"fill" | "draw">("fill");
  const [selectedPage, setSelectedPage] = useState<ColoringPage>(COLORING_PAGES[0]);
  const [selectedColor, setSelectedColor] = useState(PALETTE_COLORS[0]);
  
  // Tap-to-Fill local fills state: key is `${pageId}-${shapeIndex}`
  const [fills, setFills] = useState<Record<string, string>>({});
  
  // Free draw state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(8);
  const [showCelebrate, setShowCelebrate] = useState(false);

  // Clear or resize canvas for Free-draw
  useEffect(() => {
    if (activeTab === "draw" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Clear canvas and set background to white
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [activeTab]);

  const handleShapeClick = (shapeIndex: number) => {
    const key = `${selectedPage.id}-${shapeIndex}`;
    setFills((prev) => ({
      ...prev,
      [key]: selectedColor,
    }));
  };

  const handleResetFills = () => {
    const newFills = { ...fills };
    selectedPage.shapes.forEach((_, idx) => {
      delete newFills[`${selectedPage.id}-${idx}`];
    });
    setFills(newFills);
  };

  // Canvas Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.beginPath(); // reset line path
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get exact cursor/finger coordinates relative to canvas bounding box
    const rect = canvas.getBoundingClientRect();
    
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = selectedColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const triggerCelebration = () => {
    setShowCelebrate(true);
    setTimeout(() => setShowCelebrate(false), 3000);
  };

  return (
    <div className="space-y-8" id="coloring-book-root">
      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebrate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-brand-stone/40 backdrop-blur-xs flex flex-col items-center justify-center z-50 text-brand-dark p-6"
          >
            <div className="bg-brand-cream border-2 border-brand-sand p-8 rounded-[32px] text-center shadow-xl max-w-sm space-y-4">
              <span className="text-7xl block animate-bounce">🌟🎨💖</span>
              <h3 className="text-3xl font-bold font-serif text-brand-dark">Spectacular Art!</h3>
              <p className="text-sm text-brand-stone font-medium leading-relaxed">
                Your beautiful creation was saved to your heart gallery! God loves creative children! 🕊️
              </p>
              <button
                onClick={() => setShowCelebrate(false)}
                className="bg-brand-olive text-white font-extrabold px-6 py-2 rounded-xl text-sm shadow-xs hover:bg-brand-stone transition-colors cursor-pointer"
                id="close-celebration-btn"
              >
                Keep Coloring!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header banner */}
      <div className="bg-brand-sand p-6 rounded-[32px] text-brand-dark shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-brand-sand/55">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="bg-brand-olive/20 text-brand-stone font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
            🎨 Art Studio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-brand-dark">
            Creative Paint Gallery!
          </h2>
          <p className="text-sm md:text-base text-brand-stone max-w-lg font-medium">
            Paint beautiful Bible drawings with colors or draw whatever is in your heart!
          </p>
        </div>
        <div className="text-6xl md:text-8xl select-none mt-4 md:mt-0 animate-bounce duration-1000">
          🎨
        </div>
      </div>

      {/* Primary Toggles */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setActiveTab("fill")}
          className={`flex items-center gap-1.5 font-bold px-5 py-2.5 rounded-full text-xs md:text-sm cursor-pointer transition-all border-2 ${
            activeTab === "fill"
              ? "bg-brand-olive text-white border-brand-olive shadow-sm scale-105"
              : "bg-white text-brand-stone border-brand-sand/50 hover:border-brand-sand"
          }`}
          id="fill-mode-btn"
        >
          <Grid className="w-4 h-4" /> Tap-to-Fill Templates
        </button>
        <button
          onClick={() => setActiveTab("draw")}
          className={`flex items-center gap-1.5 font-bold px-5 py-2.5 rounded-full text-xs md:text-sm cursor-pointer transition-all border-2 ${
            activeTab === "draw"
              ? "bg-brand-olive text-white border-brand-olive shadow-sm scale-105"
              : "bg-white text-brand-stone border-brand-sand/50 hover:border-brand-sand"
          }`}
          id="draw-mode-btn"
        >
          <PencilLine className="w-4 h-4" /> Free Draw Canvas
        </button>
      </div>

      {/* Main Studio Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Color Palette (Always visible) */}
        <div className="lg:col-span-1 bg-white border-2 border-brand-sand rounded-[32px] p-5 space-y-5 h-fit shadow-xs">
          <h4 className="font-bold text-brand-stone font-serif flex items-center gap-1.5 text-sm">
            <Palette className="text-brand-olive w-4 h-4" /> Magic Color Pot
          </h4>

          {/* Grid of pots */}
          <div className="grid grid-cols-4 gap-3">
            {PALETTE_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color }}
                className={`w-10 h-10 rounded-full border-4 cursor-pointer relative shadow-inner hover:scale-105 transition-transform flex items-center justify-center ${
                  selectedColor === color
                    ? "border-brand-olive scale-110"
                    : "border-brand-sand/35 hover:border-brand-sand"
                }`}
                id={`color-pot-${color.replace("#", "")}`}
              >
                {selectedColor === color && (
                  <Check
                    className={`w-4 h-4 ${
                      color === "#FFFFFF" ? "text-brand-stone" : "text-white"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Active indicator */}
          <div className="pt-4 border-t border-brand-sand/70 flex items-center gap-3">
            <div
              style={{ backgroundColor: selectedColor }}
              className="w-12 h-12 rounded-xl shadow-inner border-2 border-brand-sand shrink-0"
            />
            <div>
              <p className="text-xxs font-extrabold text-brand-stone uppercase">Selected Brush Color</p>
              <p className="text-xs text-brand-dark font-bold">Awesome Paint!</p>
            </div>
          </div>

          {/* Drawing Settings */}
          {activeTab === "draw" && (
            <div className="pt-4 border-t border-brand-sand/70 space-y-2">
              <label className="block text-xs font-bold text-brand-stone">
                Brush Thickness: {brushSize}px
              </label>
              <input
                type="range"
                min="3"
                max="25"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full accent-brand-olive"
              />
            </div>
          )}
        </div>

        {/* Workspace Canvas Block */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          <AnimatePresence mode="wait">
            {activeTab === "fill" ? (
              /* Tap to fill templates */
              <motion.div
                key="template-arena"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-4"
              >
                {/* Template picker row */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {COLORING_PAGES.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => setSelectedPage(page)}
                      className={`px-4 py-2 rounded-xl font-bold text-xxs md:text-xs border shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
                        selectedPage.id === page.id
                          ? "bg-brand-sage/15 text-brand-olive border-brand-sage/40 rounded-xl"
                          : "bg-white text-brand-stone border-brand-sand/55 hover:border-brand-sand rounded-xl"
                      }`}
                      id={`template-btn-${page.id}`}
                    >
                      <span>{page.emoji}</span> {page.title}
                    </button>
                  ))}
                </div>

                {/* Main Interactive SVG */}
                <div className="bg-brand-cream/35 border-2 border-brand-sand rounded-[32px] p-4 flex items-center justify-center relative overflow-hidden aspect-video max-h-[400px]">
                  <svg
                    viewBox="0 0 400 300"
                    className="w-full h-full max-w-[500px] border border-brand-sand rounded-xl bg-white shadow-sm cursor-crosshair"
                  >
                    {selectedPage.shapes.map((shape, idx) => {
                      const fillKey = `${selectedPage.id}-${idx}`;
                      const activeFill = fills[fillKey] || shape.defaultFill || "#FFFFFF";

                      if (shape.type === "rect") {
                        return (
                          <rect
                            key={idx}
                            x={shape.x}
                            y={shape.y}
                            width={shape.width}
                            height={shape.height}
                            fill={activeFill}
                            stroke="#000000"
                            strokeWidth="1.5"
                            className="transition-colors duration-200 hover:opacity-90"
                            onClick={() => handleShapeClick(idx)}
                          />
                        );
                      } else if (shape.type === "circle") {
                        return (
                          <circle
                            key={idx}
                            cx={shape.cx}
                            cy={shape.cy}
                            r={shape.r}
                            fill={activeFill}
                            stroke="#000000"
                            strokeWidth="1.5"
                            className="transition-colors duration-200 hover:opacity-90"
                            onClick={() => handleShapeClick(idx)}
                          />
                        );
                      } else if (shape.type === "polygon") {
                        return (
                          <polygon
                            key={idx}
                            points={shape.points}
                            fill={activeFill}
                            stroke="#000000"
                            strokeWidth="1.5"
                            className="transition-colors duration-200 hover:opacity-90"
                            onClick={() => handleShapeClick(idx)}
                          />
                        );
                      } else if (shape.type === "path") {
                        return (
                          <path
                            key={idx}
                            d={shape.d}
                            fill={activeFill}
                            stroke="#000000"
                            strokeWidth="1.5"
                            className="transition-colors duration-200 hover:opacity-90"
                            onClick={() => handleShapeClick(idx)}
                          />
                        );
                      }
                      return null;
                    })}
                  </svg>
                </div>
              </motion.div>
            ) : (
              /* Free-draw Blank Canvas */
              <motion.div
                key="free-draw-arena"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-brand-cream/35 border-2 border-brand-sand rounded-[32px] p-4 flex items-center justify-center relative overflow-hidden aspect-video max-h-[400px]"
              >
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={350}
                  onMouseDown={startDrawing}
                  onMouseUp={stopDrawing}
                  onMouseOut={stopDrawing}
                  onMouseMove={draw}
                  onTouchStart={startDrawing}
                  onTouchEnd={stopDrawing}
                  onTouchMove={draw}
                  className="w-full h-full max-w-[500px] border border-brand-sand/60 rounded-xl bg-white shadow-sm cursor-crosshair touch-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Row */}
          <div className="flex gap-3 justify-end">
            {activeTab === "fill" ? (
              <button
                onClick={handleResetFills}
                className="flex items-center gap-1 bg-white hover:bg-brand-cream/15 border border-brand-sand text-brand-stone font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors"
                id="reset-fills-btn"
              >
                <Trash2 className="w-4 h-4" /> Reset Colors
              </button>
            ) : (
              <button
                onClick={handleClearCanvas}
                className="flex items-center gap-1 bg-white hover:bg-brand-cream/15 border border-brand-sand text-brand-stone font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors"
                id="clear-canvas-btn"
              >
                <Trash2 className="w-4 h-4" /> Clear Board
              </button>
            )}

            <button
              onClick={triggerCelebration}
              className="flex items-center gap-1 bg-brand-olive hover:bg-brand-stone text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer shadow-xs transition-all"
              id="save-painting-btn"
            >
              <Camera className="w-4 h-4" /> Save Painting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
