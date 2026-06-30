import { useState } from "react";
import { Sparkles, Trophy, Award, Check } from "lucide-react";
import { motion } from "motion/react";

interface AvatarCreatorProps {
  userScore: number;
  selectedAvatar: any;
  onSaveAvatar: (avatar: any) => void;
}

export default function AvatarCreator({ userScore, selectedAvatar, onSaveAvatar }: AvatarCreatorProps) {
  const [hair, setHair] = useState(selectedAvatar?.hair || "Spiky");
  const [skin, setSkin] = useState(selectedAvatar?.skin || "Peach");
  const [clothes, setClothes] = useState(selectedAvatar?.clothes || "Robe");
  const [bible, setBible] = useState(selectedAvatar?.bible || "Gold");
  const [shoes, setShoes] = useState(selectedAvatar?.shoes || "Sandals");
  const [backpack, setBackpack] = useState(selectedAvatar?.backpack || "Satchel");
  const [bracelet, setBracelet] = useState(selectedAvatar?.bracelet || "None");
  const [flag, setFlag] = useState(selectedAvatar?.flag || "🇺🇸");
  const [hasWings, setHasWings] = useState(selectedAvatar?.hasWings || false);
  const [hasCrown, setHasCrown] = useState(selectedAvatar?.hasCrown || false);

  const [savedMessage, setSavedMessage] = useState(false);

  // Styling maps
  const skinColors: Record<string, string> = {
    Peach: "#FED7AA",
    Bronze: "#FDBA74",
    Almond: "#F59E0B",
    Cocoa: "#78350F",
    Sand: "#FEF3C7",
  };

  const hairColors: Record<string, string> = {
    Bob: "#B45309",
    Spiky: "#1E293B",
    Curly: "#D97706",
    Braids: "#111827",
    Clean: "#F59E0B",
    Wavy: "#78350F",
  };

  const clothesColors: Record<string, string> = {
    Robe: "#4F46E5",
    Vest: "#059669",
    TShirt: "#EC4899",
    Tunic: "#D97706",
    Cozy: "#14B8A6",
  };

  const bibleColors: Record<string, string> = {
    Red: "#EF4444",
    Blue: "#3B82F6",
    Gold: "#EAB308",
    Green: "#10B981",
  };

  const shoeColors: Record<string, string> = {
    Sandals: "#78350F",
    Boots: "#451A03",
    Sneakers: "#EF4444",
    Slippers: "#F472B6",
  };

  const backpackColors: Record<string, string> = {
    Rucksack: "#059669",
    Star: "#EAB308",
    WingsBack: "#3B82F6",
    Satchel: "#844D17",
  };

  const handleSave = () => {
    onSaveAvatar({
      hair,
      skin,
      clothes,
      bible,
      shoes,
      backpack,
      bracelet,
      flag,
      hasWings: hasWings && userScore >= 80,
      hasCrown: hasCrown && userScore >= 150,
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-8" id="avatar-creator-root">
      {/* Banner */}
      <div className="bg-brand-sand p-6 rounded-[32px] text-brand-dark shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-brand-sand/55">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="bg-brand-olive/20 text-brand-stone font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
            ✨ Kingdom Kids Customizer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-brand-dark">
            Create Your Kingdom Kid!
          </h2>
          <p className="text-sm md:text-base text-brand-stone max-w-lg font-medium">
            Choose your hairstyle, clothes, shoes, and flag! Unlock beautiful Angel Wings at 80 Stars and a Golden Crown at 150 Stars!
          </p>
        </div>
        <div className="text-5xl mt-4 md:mt-0 animate-bounce duration-3000">👑🧒✨</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Real-time Live Preview */}
        <div className="lg:col-span-5 bg-white border-2 border-brand-sand rounded-[32px] p-6 flex flex-col items-center justify-center space-y-4 shadow-sm relative overflow-hidden min-h-[420px]">
          {/* Decorative halo back glow */}
          <div className="absolute w-44 h-44 rounded-full bg-brand-gold/15 blur-xl -z-10" />

          {/* SVG Avatar rendering */}
          <div className="w-56 h-56 relative border border-brand-sand/50 rounded-full bg-brand-cream/10 flex items-center justify-center shadow-inner overflow-hidden">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Back elements: Backpack */}
              {backpack !== "None" && (
                <rect x="55" y="110" width="90" height="70" rx="15" fill={backpackColors[backpack] || "#78350F"} />
              )}

              {/* Reward feature: Angel Wings */}
              {hasWings && userScore >= 80 && (
                <g className="animate-pulse">
                  {/* Left wing */}
                  <path d="M 50 110 C 20 80, 10 120, 45 140 Z" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" />
                  <path d="M 45 115 C 25 95, 20 125, 43 135 Z" fill="#F0F9FF" />
                  {/* Right wing */}
                  <path d="M 150 110 C 180 80, 190 120, 155 140 Z" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" />
                  <path d="M 155 115 C 175 95, 180 125, 157 135 Z" fill="#F0F9FF" />
                </g>
              )}

              {/* Legs and Shoes */}
              <rect x="80" y="155" width="12" height="25" fill={skinColors[skin]} />
              <rect x="108" y="155" width="12" height="25" fill={skinColors[skin]} />
              <ellipse cx="80" cy="180" rx="14" ry="7" fill={shoeColors[shoes]} />
              <ellipse cx="120" cy="180" rx="14" ry="7" fill={shoeColors[shoes]} />

              {/* Body & Clothes */}
              <path d="M 60 160 L 140 160 L 125 110 L 75 110 Z" fill={clothesColors[clothes]} />

              {/* Neck & Head */}
              <rect x="90" y="95" width="20" height="20" fill={skinColors[skin]} />
              <circle cx="100" cy="80" r="28" fill={skinColors[skin]} />

              {/* Eyes */}
              <circle cx="90" cy="76" r="3.5" fill="#1E293B" />
              <circle cx="110" cy="76" r="3.5" fill="#1E293B" />
              <circle cx="91.5" cy="74.5" r="1" fill="#FFFFFF" />
              <circle cx="111.5" cy="74.5" r="1" fill="#FFFFFF" />

              {/* Cute smiling mouth */}
              <path d="M 92 86 Q 100 94 108 86" fill="none" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />

              {/* Cheeks */}
              <circle cx="84" cy="83" r="3.5" fill="#FDA4AF" opacity="0.6" />
              <circle cx="116" cy="83" r="3.5" fill="#FDA4AF" opacity="0.6" />

              {/* Hair styles */}
              {hair === "Bob" && (
                <path d="M 68 76 C 68 50, 132 50, 132 76 C 132 85, 125 90, 125 80 C 115 55, 85 55, 75 80 C 75 90, 68 85, 68 76 Z" fill={hairColors[hair]} />
              )}
              {hair === "Spiky" && (
                <path d="M 70 70 L 80 50 L 90 55 L 100 45 L 110 55 L 120 50 L 130 70 Q 130 55, 100 55 Q 70 55, 70 70" fill={hairColors[hair]} />
              )}
              {hair === "Curly" && (
                <g fill={hairColors[hair]}>
                  <circle cx="80" cy="58" r="12" />
                  <circle cx="100" cy="52" r="13" />
                  <circle cx="120" cy="58" r="12" />
                  <circle cx="73" cy="70" r="10" />
                  <circle cx="127" cy="70" r="10" />
                </g>
              )}
              {hair === "Braids" && (
                <g>
                  <path d="M 72 65 C 72 50, 128 50, 128 65" fill="none" stroke={hairColors[hair]} strokeWidth="15" strokeLinecap="round" />
                  <rect x="63" y="65" width="8" height="30" rx="3" fill={hairColors[hair]} />
                  <rect x="129" y="65" width="8" height="30" rx="3" fill={hairColors[hair]} />
                </g>
              )}
              {hair === "Clean" && (
                <path d="M 71 70 C 71 52, 129 52, 129 70 Z" fill={hairColors[hair]} />
              )}
              {hair === "Wavy" && (
                <path d="M 70 70 C 70 45, 130 45, 130 70 Q 120 62, 100 65 Q 80 62, 70 70" fill={hairColors[hair]} />
              )}

              {/* Bible Book in hands */}
              <g transform="translate(85, 125)">
                <rect x="0" y="0" width="30" height="20" rx="3" fill={bibleColors[bible]} />
                {/* Cross on Bible */}
                <rect x="13" y="3" width="4" height="14" fill="#FFFFFF" />
                <rect x="8" y="7" width="14" height="4" fill="#FFFFFF" />
              </g>

              {/* Bracelets */}
              {bracelet === "Rainbow" && (
                <g>
                  <circle cx="71" cy="130" r="3" fill="#EF4444" />
                  <circle cx="71" cy="134" r="3" fill="#EAB308" />
                  <circle cx="72" cy="138" r="3" fill="#10B981" />
                </g>
              )}
              {bracelet === "Shield" && (
                <rect x="67" y="129" width="6" height="10" rx="2" fill="#EAB308" />
              )}

              {/* Flag Badge on clothes */}
              <text x="100" y="152" fontSize="14" textAnchor="middle">{flag}</text>

              {/* Reward feature: Golden Crown */}
              {hasCrown && userScore >= 150 && (
                <polygon points="76,48 85,30 100,43 115,30 124,48" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
              )}
            </svg>
          </div>

          <div className="text-center">
            <h4 className="font-bold font-serif text-brand-dark text-lg">My Kingdom Kid</h4>
            <div className="flex items-center gap-1.5 justify-center mt-1">
              <span className="text-xs text-brand-stone font-medium">Flag Badge: {flag}</span>
              <span className="text-xs text-brand-stone font-medium">•</span>
              <span className="text-xs text-brand-stone font-medium">Score Rank: {userScore} ⭐</span>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="bg-brand-olive hover:bg-brand-stone text-white font-bold py-2.5 px-6 rounded-2xl text-xs transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            id="save-avatar-studio-btn"
          >
            <Sparkles className="w-4 h-4" /> Lock in Design
          </button>

          {savedMessage && (
            <span className="text-xs text-brand-olive font-extrabold animate-fade-in">
              ✨ Character design successfully synchronized! ✨
            </span>
          )}
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border-2 border-brand-sand rounded-[32px] p-6 space-y-5 shadow-sm">
            <h3 className="text-lg font-bold font-serif text-brand-stone border-b border-brand-sand/60 pb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-brand-gold fill-brand-gold/10" /> Customize Options
            </h3>

            {/* Hair selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-stone uppercase tracking-wide">Hair Style</label>
              <div className="flex flex-wrap gap-2">
                {["Bob", "Spiky", "Curly", "Braids", "Clean", "Wavy"].map((h) => (
                  <button
                    key={h}
                    onClick={() => setHair(h)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      hair === h
                        ? "bg-brand-olive text-white border-brand-olive"
                        : "bg-brand-cream/20 text-brand-stone border-brand-sand/55 hover:border-brand-sand"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {/* Skin Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-stone uppercase tracking-wide">Skin Tone</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Peach", val: "Golden Peach" },
                  { name: "Bronze", val: "Honey Bronze" },
                  { name: "Almond", val: "Warm Almond" },
                  { name: "Cocoa", val: "Rich Cocoa" },
                  { name: "Sand", val: "Fair Sand" },
                ].map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSkin(s.name)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      skin === s.name
                        ? "bg-brand-olive text-white border-brand-olive"
                        : "bg-brand-cream/20 text-brand-stone border-brand-sand/55 hover:border-brand-sand"
                    }`}
                  >
                    {s.val}
                  </button>
                ))}
              </div>
            </div>

            {/* Clothing Tunic styles */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-stone uppercase tracking-wide">Kingdom Robes & Clothes</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "Robe", label: "Shepherd Robe 🧥" },
                  { key: "Vest", label: "Explorer Vest 🦺" },
                  { key: "TShirt", label: "Joyful T-Shirt 👕" },
                  { key: "Tunic", label: "Royal Tunic 👗" },
                  { key: "Cozy", label: "Cozy Hoodie 🧥" },
                ].map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setClothes(c.key)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      clothes === c.key
                        ? "bg-brand-olive text-white border-brand-olive"
                        : "bg-brand-cream/20 text-brand-stone border-brand-sand/55 hover:border-brand-sand"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bible Cover styles */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-stone uppercase tracking-wide">Personal Bible Cover</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "Red", label: "Red Leather 📕" },
                  { key: "Blue", label: "Blue Hardcover 📘" },
                  { key: "Gold", label: "Glowing Gold 📒" },
                  { key: "Green", label: "Pocket Green 📗" },
                ].map((b) => (
                  <button
                    key={b.key}
                    onClick={() => setBible(b.key)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      bible === b.key
                        ? "bg-brand-olive text-white border-brand-olive"
                        : "bg-brand-cream/20 text-brand-stone border-brand-sand/55 hover:border-brand-sand"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Shoes styles */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-stone uppercase tracking-wide">Shoes</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "Sandals", label: "Leather Sandals 👡" },
                  { key: "Boots", label: "Explorer Boots 🥾" },
                  { key: "Sneakers", label: "Run-Fast Sneakers 👟" },
                  { key: "Slippers", label: "Cozy Slippers 🥿" },
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setShoes(s.key)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      shoes === s.key
                        ? "bg-brand-olive text-white border-brand-olive"
                        : "bg-brand-cream/20 text-brand-stone border-brand-sand/55 hover:border-brand-sand"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Backpack styles */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-stone uppercase tracking-wide">Backpack</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "None", label: "None 🚫" },
                  { key: "Rucksack", label: "Canvas Rucksack 🎒" },
                  { key: "Star", label: "Star Explorer Pack ✨" },
                  { key: "Satchel", label: "Simple Satchel 👜" },
                ].map((b) => (
                  <button
                    key={b.key}
                    onClick={() => setBackpack(b.key)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      backpack === b.key
                        ? "bg-brand-olive text-white border-brand-olive"
                        : "bg-brand-cream/20 text-brand-stone border-brand-sand/55 hover:border-brand-sand"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bracelets */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-stone uppercase tracking-wide">Faith Bracelets</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "None", label: "None" },
                  { key: "Rainbow", label: "Rainbow Bead 📿" },
                  { key: "Shield", label: "Shield of Faith Band 🛡️" },
                ].map((b) => (
                  <button
                    key={b.key}
                    onClick={() => setBracelet(b.key)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      bracelet === b.key
                        ? "bg-brand-olive text-white border-brand-olive"
                        : "bg-brand-cream/20 text-brand-stone border-brand-sand/55 hover:border-brand-sand"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Flag Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-stone uppercase tracking-wide">Flag Badge</label>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { code: "🇺🇸", label: "USA" },
                  { code: "🇰🇪", label: "Kenya" },
                  { code: "🇺🇬", label: "Uganda" },
                  { code: "🇷🇼", label: "Rwanda" },
                  { code: "🇳🇬", label: "Nigeria" },
                  { code: "🇧🇷", label: "Brazil" },
                  { code: "🇮🇳", label: "India" },
                  { code: "🇯🇵", label: "Japan" },
                  { code: "🇬🇧", label: "UK" },
                ].map((f) => (
                  <button
                    key={f.code}
                    onClick={() => setFlag(f.code)}
                    className={`px-3 py-1.5 rounded-xl text-sm transition-all cursor-pointer border flex items-center gap-1 ${
                      flag === f.code
                        ? "bg-brand-olive text-white border-brand-olive font-extrabold"
                        : "bg-brand-cream/20 text-brand-stone border-brand-sand/55 hover:border-brand-sand font-medium"
                    }`}
                  >
                    <span>{f.code}</span>
                    <span className="text-[10px] uppercase font-bold">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reward features locked/unlocked based on score */}
          <div className="bg-white border-2 border-brand-sand rounded-[32px] p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold font-serif text-brand-stone uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-olive" /> Star Milestones Reward Vault
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Angel wings reward */}
              <div className={`p-4 rounded-2xl border transition-all ${
                userScore >= 80 
                  ? "bg-brand-sage/15 border-brand-sage/40 text-brand-dark" 
                  : "bg-brand-sand/10 border-brand-sand/35 text-brand-stone/50 opacity-70"
              }`}>
                <div className="flex justify-between items-start">
                  <span className="text-2xl">👼🪽</span>
                  {userScore >= 80 ? (
                    <button
                      onClick={() => setHasWings(!hasWings)}
                      className={`px-2.5 py-1 rounded-lg text-xxs font-black flex items-center gap-1 transition-all ${
                        hasWings 
                          ? "bg-brand-olive text-white" 
                          : "bg-white text-brand-olive border border-brand-olive"
                      }`}
                    >
                      {hasWings ? <Check className="w-3 h-3" /> : null} {hasWings ? "Active" : "Equip"}
                    </button>
                  ) : (
                    <span className="text-xxs font-black text-brand-clay bg-brand-sand/40 px-2 py-1 rounded-md">Locked (80⭐)</span>
                  )}
                </div>
                <h4 className="font-bold text-xs mt-2">Glorious Angel Wings</h4>
                <p className="text-[10px] leading-relaxed mt-1">Unlock a pair of glowing white wings representing God's beautiful message bearers! Requires 80 Stars.</p>
              </div>

              {/* Royal Crown reward */}
              <div className={`p-4 rounded-2xl border transition-all ${
                userScore >= 150 
                  ? "bg-brand-gold/15 border-brand-gold text-brand-dark" 
                  : "bg-brand-sand/10 border-brand-sand/35 text-brand-stone/50 opacity-70"
              }`}>
                <div className="flex justify-between items-start">
                  <span className="text-2xl">👑👑</span>
                  {userScore >= 150 ? (
                    <button
                      onClick={() => setHasCrown(!hasCrown)}
                      className={`px-2.5 py-1 rounded-lg text-xxs font-black flex items-center gap-1 transition-all ${
                        hasCrown 
                          ? "bg-brand-gold text-brand-dark" 
                          : "bg-white text-brand-gold border border-brand-gold"
                      }`}
                    >
                      {hasCrown ? <Check className="w-3 h-3" /> : null} {hasCrown ? "Active" : "Equip"}
                    </button>
                  ) : (
                    <span className="text-xxs font-black text-brand-clay bg-brand-sand/40 px-2 py-1 rounded-md">Locked (150⭐)</span>
                  )}
                </div>
                <h4 className="font-bold text-xs mt-2">Crown of Life</h4>
                <p className="text-[10px] leading-relaxed mt-1">Unlock a sparkling golden crown representing children as kings & queens in God's family! Requires 150 Stars.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
