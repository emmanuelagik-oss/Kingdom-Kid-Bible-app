import { useState } from "react";
import { Compass, MapPin, ChevronRight, Play, Info, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MapStep {
  name: string;
  emoji: string;
  x: number; // coordinates for representation
  y: number;
  description: string;
  lesson: string;
}

interface MapJourney {
  id: string;
  title: string;
  emoji: string;
  themeColor: string;
  bgFill: string;
  description: string;
  steps: MapStep[];
}

const JOURNEYS: MapJourney[] = [
  {
    id: "abraham",
    title: "Abraham's Faithful Journey",
    emoji: "⛺🐪",
    themeColor: "text-amber-600 border-amber-300 bg-amber-50",
    bgFill: "#FEF3C7",
    description: "God called Abraham to leave his home and journey to a beautiful new land, promising to make his family as numerous as the stars!",
    steps: [
      { name: "Ur of Chaldees", emoji: "🏠", x: 330, y: 220, description: "Abraham's original home. God said: 'Leave your country to a land I will show you.'", lesson: "Obedience means trusting God even when we don't know the full plan." },
      { name: "Haran", emoji: "🌳", x: 260, y: 100, description: "A stop along the way where Abraham's family rested and gathered resources.", lesson: "It is okay to rest and prepare before starting the next big step." },
      { name: "Shechem", emoji: "⛺", x: 130, y: 140, description: "Abraham built an altar here under the great tree. God said: 'I will give this land to your children!'", lesson: "Always stop to thank God for His beautiful promises." },
      { name: "Egypt", emoji: "📐", x: 50, y: 240, description: "A dry land of pyramids where Abraham went during a famine to find food.", lesson: "God is our helper and keeps us safe wherever we travel." },
      { name: "Hebron", emoji: "⛰️", x: 160, y: 190, description: "The final settling place with the oak trees where Abraham lived in tents with Sarah.", lesson: "God always completes His promises to those who walk in love." },
    ]
  },
  {
    id: "exodus",
    title: "The Great Exodus Escape",
    emoji: "🌊👣",
    themeColor: "text-sky-600 border-sky-300 bg-sky-50",
    bgFill: "#E0F2FE",
    description: "Moses led the Hebrew people out of Egypt, through the divided Red Sea, all the way to the Promised Land!",
    steps: [
      { name: "Land of Goshen", emoji: "🧱", x: 50, y: 100, description: "The Hebrew families worked hard in Egypt. God heard their prayers for freedom!", lesson: "God always hears your prayers when you call out to Him." },
      { name: "Red Sea Crossing", emoji: "🌊", x: 110, y: 140, description: "Moses held out his staff and God split the water wide open so everyone crossed on dry ground!", lesson: "No problem is too big for God. He can make a path through the sea!" },
      { name: "Mount Sinai", emoji: "⚡", x: 140, y: 220, description: "The smoking mountain where God gave Moses the Ten Commandments on stone tablets.", lesson: "God's laws are loving rules designed to keep our hearts happy and safe." },
      { name: "Kadesh Barnea", emoji: "🍇", x: 190, y: 160, description: "A beautiful oasis where 12 spies were sent to check out the amazing fruits.", lesson: "Choose to look with eyes of faith, not eyes of fear." },
      { name: "Jordan River", emoji: "💧", x: 250, y: 120, description: "Joshua led the families across the river to enter the wonderful land flowing with milk and honey.", lesson: "When you stay brave, God will guide you into His peaceful inheritance." },
    ]
  },
  {
    id: "david",
    title: "David's Shepherd to King Route",
    emoji: "🐑👑",
    themeColor: "text-emerald-600 border-emerald-300 bg-emerald-50",
    bgFill: "#ECFDF5",
    description: "Follow young David from watching sheep in Bethlehem, defeating Goliath, to reigning as King in Jerusalem!",
    steps: [
      { name: "Bethlehem Hills", emoji: "🐑", x: 120, y: 220, description: "David watched sheep, played his harp, and defeated a lion and a bear with God's help.", lesson: "You can do great things for God right where you are, no matter how small." },
      { name: "Valley of Elah", emoji: "🎯", x: 70, y: 160, description: "With just a single smooth stone and absolute trust, David defeated the giant Goliath!", lesson: "When we have God with us, giants of fear fall down flat!" },
      { name: "Adullam Cave", emoji: "🧗", x: 180, y: 180, description: "David hid here from King Saul. Many discouraged people came, and David led them bravely.", lesson: "God can turn tough times into schoolrooms of leadership." },
      { name: "Hebron Capital", emoji: "🏰", x: 160, y: 110, description: "David was crowned king here over the tribes, ruling with righteousness and love.", lesson: "Patience pays off. God's timing is always perfect." },
      { name: "Jerusalem Citadel", emoji: "👑", x: 240, y: 80, description: "David established Jerusalem as the joyful capital city of God's praising nation.", lesson: "The best crown we can wear is a heart that loves and praises God." },
    ]
  },
  {
    id: "jesus",
    title: "Jesus' Loving Ministry",
    emoji: "⛵🕊️",
    themeColor: "text-purple-600 border-purple-300 bg-purple-50",
    bgFill: "#F3E8FF",
    description: "Walk with Jesus as He is baptized, calls His disciples, heals the sick, and brings light to everyone!",
    steps: [
      { name: "Nazareth Town", emoji: "🪵", x: 100, y: 80, description: "The cozy village where Jesus grew up helping Joseph in the carpenter shop.", lesson: "Honoring our parents and learning daily are beautiful parts of growing up." },
      { name: "River Jordan", emoji: "🕊️", x: 150, y: 130, description: "Jesus was baptized by John, and the Holy Spirit descended like a peaceful dove.", lesson: "Always choose to do what is right and pleasing to God." },
      { name: "Sea of Galilee", emoji: "⛵", x: 180, y: 60, description: "Jesus walked on water, calmed a giant storm, and cooked fish for His friends!", lesson: "When storms of life blow, Jesus is right there to say 'Peace, be still'." },
      { name: "Samaria Well", emoji: "🏺", x: 140, y: 180, description: "Jesus offered the water of eternal life to a lonely woman by the stone well.", lesson: "God's love is for everyone, regardless of where they come from." },
      { name: "Jerusalem Cross & Crown", emoji: "🌅", x: 210, y: 230, description: "Jesus entered on a donkey, died to save us, and rose again in victory on Easter Sunday!", lesson: "Because Jesus lives, we can have everlasting hope and joy!" },
    ]
  },
  {
    id: "paul",
    title: "Paul's Epic Missionary Travels",
    emoji: "⛵🗺️",
    themeColor: "text-rose-600 border-rose-300 bg-rose-50",
    bgFill: "#FFE4E6",
    description: "Paul sailed across the blue Mediterranean Sea, climbing mountains to share the Good News with the whole world!",
    steps: [
      { name: "Antioch", emoji: "⛪", x: 280, y: 180, description: "The happy church where Paul and Barnabas started their journeys with prayer.", lesson: "Every great adventure of faith starts with prayer and fellowship." },
      { name: "Cyprus Island", emoji: "🏝️", x: 210, y: 220, description: "They sailed to Cyprus and shared God's light with governors and citizens.", lesson: "Never be afraid to speak kindly about Jesus' love to leaders." },
      { name: "Lystra", emoji: "🧗", x: 230, y: 110, description: "A mountainous city where Paul healed a lame man who jumped up and danced!", lesson: "With faith, we can stand strong and leap for joy!" },
      { name: "Athens", emoji: "🏛️", x: 120, y: 120, description: "Paul spoke to wise philosophers on Mars Hill about the Creator God of love.", lesson: "True wisdom is knowing how much God treasures and cares for you." },
      { name: "Rome", emoji: "🏟️", x: 50, y: 60, description: "Paul reached the giant capital city of Rome, writing letters of encouragement to churches.", lesson: "No chain or challenge can stop the joyful message of hope from spreading." },
    ]
  }
];

export default function BibleMaps() {
  const [selectedJourney, setSelectedJourney] = useState<MapJourney>(JOURNEYS[0]);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [isSailing, setIsSailing] = useState(false);

  const activeStep = selectedJourney.steps[activeStepIdx];

  const handleJourneyChange = (journey: MapJourney) => {
    setSelectedJourney(journey);
    setActiveStepIdx(0);
  };

  const nextStep = () => {
    if (activeStepIdx < selectedJourney.steps.length - 1) {
      setIsSailing(true);
      setTimeout(() => {
        setActiveStepIdx((prev) => prev + 1);
        setIsSailing(false);
      }, 600);
    }
  };

  const prevStep = () => {
    if (activeStepIdx > 0) {
      setIsSailing(true);
      setTimeout(() => {
        setActiveStepIdx((prev) => prev - 1);
        setIsSailing(false);
      }, 600);
    }
  };

  return (
    <div className="space-y-8" id="bible-maps-root">
      {/* Header Banner */}
      <div className="bg-brand-sand p-6 rounded-[32px] text-brand-dark shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-brand-sand/55">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="bg-brand-olive/20 text-brand-stone font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
            🗺️ Kids Adventure Maps
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-brand-dark">
            Animated Bible Explorer!
          </h2>
          <p className="text-sm md:text-base text-brand-stone max-w-lg font-medium">
            Travel back in time! Click on map pins to follow ancient footsteps, cross divided seas, climb holy mountains, and discover life secrets!
          </p>
        </div>
        <div className="text-5xl mt-4 md:mt-0 animate-spin duration-10000">🧭🧭</div>
      </div>

      {/* Map selector tabs */}
      <div className="flex flex-wrap gap-2.5 justify-center">
        {JOURNEYS.map((j) => (
          <button
            key={j.id}
            onClick={() => handleJourneyChange(j)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border-2 ${
              selectedJourney.id === j.id
                ? "bg-brand-olive text-white border-brand-olive shadow-xs scale-[1.02]"
                : "bg-white text-brand-stone border-brand-sand/45 hover:border-brand-sand"
            }`}
          >
            <span className="text-base">{j.emoji}</span>
            <span>{j.title}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Columns: Interactive Graphic Map */}
        <div className="lg:col-span-7 bg-white border-2 border-brand-sand rounded-[32px] p-4 flex flex-col items-center justify-center shadow-sm relative overflow-hidden min-h-[380px] lg:min-h-[440px]">
          {/* Compass grid pattern watermark */}
          <div className="absolute top-4 right-4 text-brand-stone/10 pointer-events-none">
            <Compass className="w-28 h-28 rotate-12" />
          </div>

          <div className="w-full max-w-[500px] h-[340px] relative border border-brand-sand/40 rounded-2xl bg-brand-cream/15 overflow-hidden shadow-inner">
            {/* Real-time map background SVG */}
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Soft land mass shapes */}
              <path d="M -20 180 Q 80 120 150 170 T 320 140 T 420 190 L 420 300 L -20 300 Z" fill="#F0FDF4" opacity="0.7" /> {/* Green coast */}
              <path d="M 120 40 Q 180 110 280 60 T 380 120 L 400 0 L 100 0 Z" fill="#FEF3C7" opacity="0.6" /> {/* Desert hills */}

              {/* Connecting flight/sail paths */}
              {selectedJourney.steps.map((step, idx) => {
                if (idx === 0) return null;
                const prev = selectedJourney.steps[idx - 1];
                return (
                  <g key={`path-${idx}`}>
                    {/* Animated dotted connector */}
                    <line
                      x1={prev.x}
                      y1={prev.y}
                      x2={step.x}
                      y2={step.y}
                      stroke={idx <= activeStepIdx ? "#16A34A" : "#D1D5DB"}
                      strokeWidth="2.5"
                      strokeDasharray="6,4"
                      className={idx === activeStepIdx && isSailing ? "stroke-dashoffset-anim" : ""}
                    />
                  </g>
                );
              })}

              {/* Glowing highlight ring on current active location */}
              <circle
                cx={activeStep.x}
                cy={activeStep.y}
                r="18"
                fill="none"
                stroke="#16A34A"
                strokeWidth="2"
                className="animate-ping duration-2000"
                opacity="0.35"
              />

              {/* Pins for each step */}
              {selectedJourney.steps.map((step, idx) => {
                const isActive = idx === activeStepIdx;
                const isVisited = idx < activeStepIdx;
                return (
                  <g
                    key={`pin-${idx}`}
                    className="cursor-pointer"
                    onClick={() => setActiveStepIdx(idx)}
                  >
                    {/* Simple base marker */}
                    <circle
                      cx={step.x}
                      cy={step.y}
                      r={isActive ? "10" : "8"}
                      fill={isActive ? "#16A34A" : isVisited ? "#15803D" : "#9CA3AF"}
                      className="transition-all duration-300"
                    />
                    {/* Tiny inner center */}
                    <circle cx={step.x} cy={step.y} r="3" fill="#FFFFFF" />
                    {/* Small text label above pin */}
                    <text
                      x={step.x}
                      y={step.y - 14}
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      fill={isActive ? "#111827" : "#6B7280"}
                      className="font-sans"
                    >
                      {step.name}
                    </text>
                  </g>
                );
              })}

              {/* Moving traveler indicator (boat or camel emoji) */}
              <g transform={`translate(${activeStep.x - 12}, ${activeStep.y - 12})`} className="pointer-events-none">
                <text fontSize="20" className="animate-bounce">
                  {selectedJourney.id === "paul" || selectedJourney.id === "exodus" || selectedJourney.id === "jesus" ? "⛵" : "🐪"}
                </text>
              </g>
            </svg>
          </div>

          {/* Stepper buttons below map canvas */}
          <div className="flex justify-between items-center w-full max-w-[500px] mt-4">
            <button
              onClick={prevStep}
              disabled={activeStepIdx === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-brand-sand/55 text-brand-stone hover:bg-brand-sand/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              ⬅️ Go Back
            </button>
            <div className="flex gap-1">
              {selectedJourney.steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === activeStepIdx ? "bg-brand-olive w-5" : "bg-brand-sand"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextStep}
              disabled={activeStepIdx === selectedJourney.steps.length - 1}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-olive hover:bg-brand-stone text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-1"
            >
              <span>Next Stop</span> <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Right 5 Columns: Active Step Info and Spiritual Lesson Card */}
        <div className="lg:col-span-5 space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedJourney.id}-${activeStepIdx}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="bg-white border-2 border-brand-sand rounded-[32px] p-6 shadow-sm space-y-5"
            >
              <div className="flex items-center gap-3 border-b border-brand-sand/65 pb-3">
                <span className="text-4xl">{activeStep.emoji}</span>
                <div>
                  <span className="text-xxs font-black text-brand-olive uppercase tracking-widest block">
                    Stop #{activeStepIdx + 1} of {selectedJourney.steps.length}
                  </span>
                  <h3 className="text-xl font-bold font-serif text-brand-dark leading-tight">
                    {activeStep.name}
                  </h3>
                </div>
              </div>

              {/* Historical Description text */}
              <div className="space-y-1.5">
                <label className="text-xxs font-extrabold text-brand-stone uppercase tracking-wide flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> What Happened Here:
                </label>
                <p className="text-xs md:text-sm text-brand-stone font-medium leading-relaxed">
                  {activeStep.description}
                </p>
              </div>

              {/* Spiritual Lesson panel */}
              <div className="bg-brand-sage/15 border border-brand-sage/40 rounded-2xl p-4 space-y-1.5">
                <h4 className="text-xs font-extrabold text-brand-olive uppercase tracking-wider flex items-center gap-1">
                  💡 Life Lesson for You:
                </h4>
                <p className="text-xs text-brand-stone font-semibold leading-relaxed">
                  {activeStep.lesson}
                </p>
              </div>

              {/* Fun quiz milestone badge */}
              <div className="bg-brand-cream/35 border border-brand-sand/65 rounded-2xl p-3 flex items-center gap-2">
                <span className="text-xl">🌟</span>
                <span className="text-[10px] font-bold text-brand-stone">
                  Unlock map secrets to earn explorer points in Sunday School competition!
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
