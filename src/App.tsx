import { useState } from "react";
import AdventureStories from "./components/AdventureStories";
import QuizQuest from "./components/QuizQuest";
import AskHeroes from "./components/AskHeroes";
import ColoringBook from "./components/ColoringBook";
import MemoryVerseMaster from "./components/MemoryVerseMaster";

// Import brand new modular components
import AvatarCreator from "./components/AvatarCreator";
import BibleMaps from "./components/BibleMaps";
import BibleTimeline from "./components/BibleTimeline";
import HeroesCollection from "./components/HeroesCollection";
import CharacterBuilder from "./components/CharacterBuilder";
import MissionsWorld from "./components/MissionsWorld";
import DailyDevotional from "./components/DailyDevotional";
import BibleAIAssistant from "./components/BibleAIAssistant";
import ParentsDashboard from "./components/ParentsDashboard";
import SundaySchoolMode from "./components/SundaySchoolMode";
import PrintableResources from "./components/PrintableResources";
import BibleCrafts from "./components/BibleCrafts";
import GivingCompassion from "./components/GivingCompassion";
import ThreeSixtyFiveStories from "./components/ThreeSixtyFiveStories";

import { 
  BookOpen, Gamepad2, MessageSquare, Palette, Shield, Star, Award, Sparkles, Heart, 
  MapPin, Calendar, Users, FileText, Globe, GraduationCap, Compass, Scissors, HandHeart, HelpCircle, ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type ActiveTab = "hub" | "avatar" | "chat" | "creative" | "quests" | "sunday";
type Language = "English" | "Kiswahili" | "French" | "Luganda" | "Kinyarwanda";

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  English: {
    appTitle: "Kingdom Kid Bible App",
    hub: "Adventure Hub",
    avatar: "Kid Avatar",
    chat: "Chat & AI",
    creative: "Creative Zone",
    quests: "Faith Quests",
    sunday: "Leadership Hub",
    stars: "Your Stars",
    rank: "Adventure Rank",
    shields: "Shields",
    back: "Back to Hub",
    howToPlay: "How to Play?",
    letStart: "Let's Start! 🏹",
  },
  Kiswahili: {
    appTitle: "Biblia ya Watoto",
    hub: "Kituo cha Vituko",
    avatar: "Avatar ya Mtoto",
    chat: "Gumzo na AI",
    creative: "Kona ya Sanaa",
    quests: "Maswali ya Imani",
    sunday: "Kituo cha Viongozi",
    stars: "Nyota Zako",
    rank: "Daraja la Safari",
    shields: "Ngao",
    back: "Rudi Nyuma",
    howToPlay: "Jinsi ya Cheza?",
    letStart: "Haya Tuanze! 🏹",
  },
  French: {
    appTitle: "Bible pour Enfants",
    hub: "Centre d'Aventure",
    avatar: "Avatar Enfant",
    chat: "Discussion & IA",
    creative: "Zone Créative",
    quests: "Défis de Foi",
    sunday: "Scolaire & Parents",
    stars: "Vos Étoiles",
    rank: "Rang d'Aventure",
    shields: "Boucliers",
    back: "Retour au Centre",
    howToPlay: "Comment jouer?",
    letStart: "C'est parti! 🏹",
  },
  Luganda: {
    appTitle: "Baibuli y'Abaana",
    hub: "Ekinyumu ky'Abaana",
    avatar: "Kifaananyi ky'Omwana",
    chat: "Okunyumya ne AI",
    creative: "Ekifo ky'Emikono",
    quests: "Ebibuuzo by'Okukkiriza",
    sunday: "Ekinyumu ky'Esomero",
    stars: "Enyunyu Zo",
    rank: "Kitiibwa ky'Okuttunka",
    shields: "Engabo",
    back: "Ddayo emabega",
    howToPlay: "Onyumirwa Otya?",
    letStart: "Tandika Kati! 🏹",
  },
  Kinyarwanda: {
    appTitle: "Bibiliya y'Abana",
    hub: "Urubuga rw'Ibyiza",
    avatar: "Ishusho y'Umwana",
    chat: "Ibiganiro na AI",
    creative: "Urubuga rw'Ibihangano",
    quests: "Ibibazo by'Kwizera",
    sunday: "Urubuga rw'Ababyeyi",
    stars: "Inyenyeri Zawe",
    rank: "Urwego rw'Ubutwari",
    shields: "Inkingo",
    back: "Subira Inyuma",
    howToPlay: "Uko Bakina?",
    letStart: "Reka Dutangire! 🏹",
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("hub");
  const [activeLanguage, setActiveLanguage] = useState<Language>("English");
  const [userScore, setUserScore] = useState(40); // default start score so some rewards are unlocked
  const [collectedVerses, setCollectedVerses] = useState<string[]>(["Joshua 1:9"]);
  const [showHowToPlay, setShowHowToPlay] = useState(true);

  // Selected avatar state (for real-time customization sync)
  const [selectedAvatar, setSelectedAvatar] = useState({
    hair: "Spiky",
    skin: "Peach",
    clothes: "Robe",
    bible: "Gold",
    shoes: "Sandals",
    backpack: "Satchel",
    bracelet: "None",
    flag: "🇺🇸",
    hasWings: false,
    hasCrown: false
  });

  // Hub deep-dive sub-routing
  const [hubActiveModule, setHubActiveModule] = useState<string | null>(null);

  // Inner tab states for sub-sections
  const [chatSubTab, setChatSubTab] = useState<"heroes" | "assistant">("heroes");
  const [creativeSubTab, setCreativeSubTab] = useState<"coloring" | "crafts" | "printables">("coloring");
  const [questsSubTab, setQuestsSubTab] = useState<"quiz" | "verses">("quiz");
  const [sundaySubTab, setSundaySubTab] = useState<"school" | "dashboard" | "giving">("school");

  const handleAddScore = (points: number) => {
    setUserScore((prev) => prev + points);
  };

  const handleDeductScore = (points: number) => {
    setUserScore((prev) => Math.max(0, prev - points));
  };

  const handleCollectVerse = (reference: string) => {
    if (!collectedVerses.includes(reference)) {
      setCollectedVerses((prev) => [...prev, reference]);
      setUserScore((prev) => prev + 30);
    }
  };

  const getKidLevel = (score: number) => {
    if (score >= 150) return { title: "Grand Bible Hero 🏆", color: "text-purple-600 bg-purple-50 border-purple-200" };
    if (score >= 80) return { title: "Faith Explorer 🏹", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
    if (score >= 30) return { title: "Little Star 🌟", color: "text-amber-600 bg-amber-50 border-amber-200" };
    return { title: "New Adventurer ⛵", color: "text-sky-600 bg-sky-50 border-sky-200" };
  };

  const currentLevelObj = getKidLevel(userScore);
  const t = TRANSLATIONS[activeLanguage];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col font-sans" id="app-root">
      {/* Organic top bar decoration in Natural Tones */}
      <div className="h-2 w-full bg-gradient-to-r from-brand-olive via-brand-sand via-brand-cream via-brand-sage to-brand-clay" />

      {/* Floating natural tone backdrop decoration (soft blurs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
        <div className="absolute top-10 left-[15%] w-10 h-10 rounded-full bg-brand-gold/30 blur-sm" />
        <div className="absolute top-[20%] right-[10%] w-14 h-14 rounded-full bg-brand-sage/30 blur-sm" />
        <div className="absolute bottom-[10%] left-[5%] w-16 h-16 rounded-full bg-brand-sand/40 blur-sm" />
        <div className="absolute bottom-[30%] right-[20%] w-12 h-12 rounded-full bg-brand-cream/50 blur-sm" />
      </div>

      {/* How to Play Help Overlay */}
      <AnimatePresence>
        {showHowToPlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-brand-bg rounded-[32px] p-6 md:p-8 max-w-lg w-full shadow-xl space-y-6 text-center border-4 border-brand-sand relative overflow-hidden"
            >
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-gradient-to-br from-brand-cream to-brand-gold/40 rounded-full blur-md" />

              <div className="space-y-2 relative z-10">
                <span className="text-6xl animate-bounce duration-1000 block">⛵📖🐑</span>
                <h3 className="text-3xl font-bold font-serif text-brand-dark tracking-tight">
                  {t.appTitle}!
                </h3>
                <p className="text-brand-stone text-sm md:text-base font-medium leading-relaxed">
                  Your grand interactive adventure begins today! Read colorful stories, play quiz quests, paint lovely drawings, and talk with Bible heroes!
                </p>
              </div>

              {/* Instructions steps card */}
              <div className="bg-brand-sand/30 p-4 rounded-2xl text-left border border-brand-sand space-y-3">
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-brand-olive text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">1</span>
                  <p className="text-xs text-brand-stone font-semibold">
                    Read <strong>Preset Stories</strong> or generate unique custom ones! Talk aloud to listen.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-brand-sage text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">2</span>
                  <p className="text-xs text-brand-stone font-semibold">
                    Complete <strong>Quiz levels</strong> or make an AI quiz to earn golden stars.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-brand-clay text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">3</span>
                  <p className="text-xs text-brand-stone font-semibold">
                    Unlock <strong>Memory Verse Shields</strong> on your shelf by solving word scrambles!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowHowToPlay(false)}
                className="w-full bg-brand-olive hover:bg-brand-stone text-white font-bold py-3.5 px-6 rounded-2xl text-sm md:text-base shadow-md transition-all cursor-pointer hover:shadow-lg"
                id="lets-play-btn"
              >
                {t.letStart}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Layout Wrapper */}
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-6 flex-1 flex flex-col justify-between relative z-10 gap-8">
        
        {/* Colorful Kids Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-5 rounded-[32px] border-2 border-brand-sand shadow-sm relative">
          <div className="flex items-center gap-3">
            {/* Real-time mini avatar preview instead of simple sheep emoji! */}
            <div className="w-14 h-14 bg-brand-olive rounded-2xl flex items-center justify-center text-white text-3xl shrink-0 overflow-hidden relative border border-brand-sand">
              <span className="relative z-10">🧒</span>
              {selectedAvatar.flag && (
                <span className="absolute bottom-0 right-0 text-xs bg-white rounded-full leading-none p-0.5 border border-brand-sand">
                  {selectedAvatar.flag}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-serif text-brand-stone tracking-tight">
                {t.appTitle}
              </h1>
              <p className="text-xxs md:text-xs text-brand-olive font-extrabold tracking-wider uppercase">
                Cross and Crown Kids Studio
              </p>
            </div>
          </div>

          {/* User Status / Leader badge / Language options */}
          <div className="flex flex-wrap gap-2.5 items-center justify-center">
            {/* Language dropdown select */}
            <div className="bg-brand-cream text-brand-dark border border-brand-sand rounded-2xl px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
              <Globe className="w-4 h-4 text-brand-stone" />
              <select
                value={activeLanguage}
                onChange={(e) => setActiveLanguage(e.target.value as Language)}
                className="bg-transparent text-xs font-black text-brand-stone focus:outline-none cursor-pointer"
              >
                <option value="English">🇬🇧 English</option>
                <option value="Kiswahili">🇰🇪 Kiswahili</option>
                <option value="French">🇫🇷 French</option>
                <option value="Luganda">🇺🇬 Luganda</option>
                <option value="Kinyarwanda">🇷🇼 Kinyarwanda</option>
              </select>
            </div>

            {/* Score box */}
            <div className="bg-brand-cream text-brand-dark border border-brand-sand rounded-2xl px-4 py-2 flex items-center gap-1.5 shadow-sm">
              <Star className="w-5 h-5 fill-brand-gold text-brand-gold animate-spin duration-[4000ms]" />
              <div>
                <span className="text-xxs text-brand-stone font-bold block leading-none">{t.stars}</span>
                <span className="text-sm font-extrabold">{userScore} ⭐</span>
              </div>
            </div>

            {/* Title Badge */}
            <div className={`px-4 py-2 rounded-2xl border flex items-center gap-1.5 shadow-sm ${
              userScore >= 150 ? "text-brand-dark bg-brand-gold/40 border-brand-gold" :
              userScore >= 80 ? "text-brand-stone bg-brand-sage/30 border-brand-sage" :
              userScore >= 30 ? "text-brand-stone bg-brand-cream border-brand-sand" :
              "text-brand-stone bg-brand-sand/50 border-brand-sand"
            }`}>
              <Award className="w-5 h-5" />
              <div>
                <span className="text-xxs text-brand-stone font-bold block leading-none">{t.rank}</span>
                <span className="text-xs font-black">{currentLevelObj.title}</span>
              </div>
            </div>

            {/* Collected Shields counter */}
            <div className="bg-brand-sand/30 text-brand-stone border border-brand-sand rounded-2xl px-4 py-2 flex items-center gap-1.5 shadow-sm">
              <Shield className="w-5 h-5 fill-brand-sand text-brand-olive" />
              <div>
                <span className="text-xxs text-brand-stone font-bold block leading-none">{t.shields}</span>
                <span className="text-sm font-extrabold">{collectedVerses.length}/5</span>
              </div>
            </div>

            <button
              onClick={() => setShowHowToPlay(true)}
              className="text-[11px] font-bold text-brand-stone bg-brand-sand/30 hover:bg-brand-olive hover:text-white px-3 py-2 rounded-xl border border-brand-sand transition-colors cursor-pointer"
            >
              {t.howToPlay}
            </button>
          </div>
        </header>

        {/* Tab Selection Row (Beautiful chunky block buttons styled with Natural Tones) */}
        <nav className="bg-brand-stone border-2 border-brand-olive/40 p-2 md:p-3 rounded-[32px] shadow-sm">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full">
            {/* 1. Adventure Hub */}
            <button
              onClick={() => { setActiveTab("hub"); setHubActiveModule(null); }}
              className={`p-3 rounded-2xl font-extrabold text-[11px] md:text-xs flex flex-col items-center justify-center gap-1 cursor-pointer border-2 transition-all duration-200 ${
                activeTab === "hub"
                  ? "bg-brand-olive text-white border-brand-olive shadow-md scale-[1.02]"
                  : "bg-brand-stone text-brand-sand border-transparent hover:bg-brand-olive/30 hover:text-white"
              }`}
              id="tab-hub"
            >
              <Compass className="w-4.5 h-4.5 shrink-0" />
              <span>📖 {t.hub}</span>
            </button>

            {/* 2. Avatar Creator */}
            <button
              onClick={() => setActiveTab("avatar")}
              className={`p-3 rounded-2xl font-extrabold text-[11px] md:text-xs flex flex-col items-center justify-center gap-1 cursor-pointer border-2 transition-all duration-200 ${
                activeTab === "avatar"
                  ? "bg-brand-olive text-white border-brand-olive shadow-md scale-[1.02]"
                  : "bg-brand-stone text-brand-sand border-transparent hover:bg-brand-olive/30 hover:text-white"
              }`}
              id="tab-avatar"
            >
              <Sparkles className="w-4.5 h-4.5 shrink-0" />
              <span>🧒 {t.avatar}</span>
            </button>

            {/* 3. Ask Heroes & AI */}
            <button
              onClick={() => setActiveTab("chat")}
              className={`p-3 rounded-2xl font-extrabold text-[11px] md:text-xs flex flex-col items-center justify-center gap-1 cursor-pointer border-2 transition-all duration-200 ${
                activeTab === "chat"
                  ? "bg-brand-olive text-white border-brand-olive shadow-md scale-[1.02]"
                  : "bg-brand-stone text-brand-sand border-transparent hover:bg-brand-olive/30 hover:text-white"
              }`}
              id="tab-chat"
            >
              <MessageSquare className="w-4.5 h-4.5 shrink-0" />
              <span>💬 {t.chat}</span>
            </button>

            {/* 4. Creative Zone */}
            <button
              onClick={() => setActiveTab("creative")}
              className={`p-3 rounded-2xl font-extrabold text-[11px] md:text-xs flex flex-col items-center justify-center gap-1 cursor-pointer border-2 transition-all duration-200 ${
                activeTab === "creative"
                  ? "bg-brand-olive text-white border-brand-olive shadow-md scale-[1.02]"
                  : "bg-brand-stone text-brand-sand border-transparent hover:bg-brand-olive/30 hover:text-white"
              }`}
              id="tab-creative"
            >
              <Palette className="w-4.5 h-4.5 shrink-0" />
              <span>🎨 {t.creative}</span>
            </button>

            {/* 5. Faith Quests */}
            <button
              onClick={() => setActiveTab("quests")}
              className={`p-3 rounded-2xl font-extrabold text-[11px] md:text-xs flex flex-col items-center justify-center gap-1 cursor-pointer border-2 transition-all duration-200 ${
                activeTab === "quests"
                  ? "bg-brand-olive text-white border-brand-olive shadow-md scale-[1.02]"
                  : "bg-brand-stone text-brand-sand border-transparent hover:bg-brand-olive/30 hover:text-white"
              }`}
              id="tab-quests"
            >
              <Gamepad2 className="w-4.5 h-4.5 shrink-0" />
              <span>🎮 {t.quests}</span>
            </button>

            {/* 6. Sunday School & leadership */}
            <button
              onClick={() => setActiveTab("sunday")}
              className={`p-3 rounded-2xl font-extrabold text-[11px] md:text-xs flex flex-col items-center justify-center gap-1 cursor-pointer border-2 transition-all duration-200 ${
                activeTab === "sunday"
                  ? "bg-brand-olive text-white border-brand-olive shadow-md scale-[1.02]"
                  : "bg-brand-stone text-brand-sand border-transparent hover:bg-brand-olive/30 hover:text-white"
              }`}
              id="tab-sunday"
            >
              <GraduationCap className="w-4.5 h-4.5 shrink-0" />
              <span>⛪ {t.sunday}</span>
            </button>
          </div>
        </nav>

        {/* Viewport Render Block */}
        <main className="flex-1 min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* 1. Adventure Hub Tab */}
            {activeTab === "hub" && (
              <motion.div
                key="hub-viewport"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {hubActiveModule === null ? (
                  <div className="space-y-6">
                    {/* Welcome message */}
                    <div className="bg-brand-sand p-6 rounded-[32px] border border-brand-sand/50 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-bold font-serif text-brand-dark">Ready for an adventure, Kid?</h2>
                        <p className="text-xs text-brand-stone font-semibold">Select an adventure tile below to travel through maps, scroll timelines, learn daily traits, or read beautiful stories!</p>
                      </div>
                      <span className="text-4xl animate-bounce">🗺️🐑🌅</span>
                    </div>

                    {/* Bento Grid layout of Hub Modules */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Tile 0: 365 Daily Stories Journey */}
                      <div
                        onClick={() => setHubActiveModule("365_stories")}
                        className="bg-gradient-to-br from-brand-olive via-brand-sage to-brand-cream border-2 border-brand-olive rounded-[32px] p-5 cursor-pointer hover:shadow-md transition-all space-y-3 col-span-1 sm:col-span-2 lg:col-span-3 text-brand-dark"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-4xl p-3 bg-white/70 border border-brand-sand rounded-2xl inline-block">🗓️</span>
                          <span className="bg-brand-olive text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full animate-pulse">
                            🔥 Grand Daily Journey
                          </span>
                        </div>
                        <h3 className="font-bold font-serif text-brand-dark text-lg">365 Days Bible Stories Path</h3>
                        <p className="text-xs text-brand-stone font-semibold leading-relaxed">
                          Step into a daily holy adventure for the whole year! Unlock beautiful cartoon illustrations, audio reads, scrambles, devotion prayers, quizzes, and golden medals!
                        </p>
                      </div>

                      {/* Tile 1: Preset Stories */}
                      <div
                        onClick={() => setHubActiveModule("stories")}
                        className="bg-white border-2 border-brand-sand rounded-[32px] p-5 cursor-pointer hover:border-brand-olive hover:shadow-xs transition-all space-y-3"
                      >
                        <span className="text-4xl p-3 bg-brand-cream/35 border border-brand-sand rounded-2xl inline-block">📖</span>
                        <h3 className="font-bold font-serif text-brand-dark text-base">Bible Adventure Stories</h3>
                        <p className="text-xs text-brand-stone font-semibold">Read custom interactive moral story scenes. Speak aloud or list topics to generate!</p>
                      </div>

                      {/* Tile 2: Bible Maps */}
                      <div
                        onClick={() => setHubActiveModule("maps")}
                        className="bg-white border-2 border-brand-sand rounded-[32px] p-5 cursor-pointer hover:border-brand-olive hover:shadow-xs transition-all space-y-3"
                      >
                        <span className="text-4xl p-3 bg-brand-cream/35 border border-brand-sand rounded-2xl inline-block">🗺️</span>
                        <h3 className="font-bold font-serif text-brand-dark text-base">Animated Bible Maps</h3>
                        <p className="text-xs text-brand-stone font-semibold">Track Abraham's journey, Exodus escape, Jesus' ministry, and Paul's missions!</p>
                      </div>

                      {/* Tile 3: Timeline */}
                      <div
                        onClick={() => setHubActiveModule("timeline")}
                        className="bg-white border-2 border-brand-sand rounded-[32px] p-5 cursor-pointer hover:border-brand-olive hover:shadow-xs transition-all space-y-3"
                      >
                        <span className="text-4xl p-3 bg-brand-cream/35 border border-brand-sand rounded-2xl inline-block">⏳</span>
                        <h3 className="font-bold font-serif text-brand-dark text-base">Interactive Timeline Scroll</h3>
                        <p className="text-xs text-brand-stone font-semibold">Walk from Creation, Noah, Moses, David, to Jesus and the early Apostles church.</p>
                      </div>

                      {/* Tile 4: Heroes Collection */}
                      <div
                        onClick={() => setHubActiveModule("heroes")}
                        className="bg-white border-2 border-brand-sand rounded-[32px] p-5 cursor-pointer hover:border-brand-olive hover:shadow-xs transition-all space-y-3"
                      >
                        <span className="text-4xl p-3 bg-brand-cream/35 border border-brand-sand rounded-2xl inline-block">🎖️</span>
                        <h3 className="font-bold font-serif text-brand-dark text-base">Heroes Hall of Fame</h3>
                        <p className="text-xs text-brand-stone font-semibold">Unlock 8 amazing Bible heroes! Study their bios, story challenges, and prayers.</p>
                      </div>

                      {/* Tile 5: Character Builder */}
                      <div
                        onClick={() => setHubActiveModule("character")}
                        className="bg-white border-2 border-brand-sand rounded-[32px] p-5 cursor-pointer hover:border-brand-olive hover:shadow-xs transition-all space-y-3"
                      >
                        <span className="text-4xl p-3 bg-brand-cream/35 border border-brand-sand rounded-2xl inline-block">🌳</span>
                        <h3 className="font-bold font-serif text-brand-dark text-base">Character Trait Builder</h3>
                        <p className="text-xs text-brand-stone font-semibold">Study Kindness, Courage, and Respect. Take interactive reflection quizzes!</p>
                      </div>

                      {/* Tile 6: Missions Around the World */}
                      <div
                        onClick={() => setHubActiveModule("missions")}
                        className="bg-white border-2 border-brand-sand rounded-[32px] p-5 cursor-pointer hover:border-brand-olive hover:shadow-xs transition-all space-y-3"
                      >
                        <span className="text-4xl p-3 bg-brand-cream/35 border border-brand-sand rounded-2xl inline-block">🌍</span>
                        <h3 className="font-bold font-serif text-brand-dark text-base">Missions Around the World</h3>
                        <p className="text-xs text-brand-stone font-semibold">Discover Kenya, Uganda, Brazil, and Japan. Read local foods & prayer lists.</p>
                      </div>

                      {/* Tile 7: Daily Devotional */}
                      <div
                        onClick={() => setHubActiveModule("devotional")}
                        className="bg-white border-2 border-brand-sand rounded-[32px] p-5 cursor-pointer hover:border-brand-olive hover:shadow-xs transition-all space-y-3 col-span-1 sm:col-span-2 lg:col-span-3"
                      >
                        <span className="text-4xl p-3 bg-brand-cream/35 border border-brand-sand rounded-2xl inline-block">🌅</span>
                        <h3 className="font-bold font-serif text-brand-dark text-base">Daily Morning Devotional</h3>
                        <p className="text-xs text-brand-stone font-semibold">Read your morning Verse, Story, and Prayer. Save daily journals to parent vault!</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Back Button */}
                    <button
                      onClick={() => setHubActiveModule(null)}
                      className="px-4 py-2 bg-brand-stone hover:bg-brand-olive text-white text-xs font-black rounded-xl cursor-pointer shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" /> {t.back}
                    </button>

                    {/* Render deep-dived module */}
                    {hubActiveModule === "365_stories" && <ThreeSixtyFiveStories userScore={userScore} onAddScore={handleAddScore} />}
                    {hubActiveModule === "stories" && <AdventureStories />}
                    {hubActiveModule === "maps" && <BibleMaps />}
                    {hubActiveModule === "timeline" && <BibleTimeline />}
                    {hubActiveModule === "heroes" && <HeroesCollection userScore={userScore} />}
                    {hubActiveModule === "character" && <CharacterBuilder />}
                    {hubActiveModule === "missions" && <MissionsWorld />}
                    {hubActiveModule === "devotional" && <DailyDevotional />}
                  </div>
                )}
              </motion.div>
            )}

            {/* 2. Avatar Creator Tab */}
            {activeTab === "avatar" && (
              <motion.div
                key="avatar-viewport"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <AvatarCreator 
                  userScore={userScore} 
                  selectedAvatar={selectedAvatar} 
                  onSaveAvatar={setSelectedAvatar} 
                />
              </motion.div>
            )}

            {/* 3. Chat & AI Tab */}
            {activeTab === "chat" && (
              <motion.div
                key="chat-viewport"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Sub Tab selection */}
                <div className="flex justify-center">
                  <div className="bg-brand-sand/50 border border-brand-sand p-1 rounded-2xl flex items-center gap-1">
                    <button
                      onClick={() => setChatSubTab("heroes")}
                      className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                        chatSubTab === "heroes" ? "bg-brand-olive text-white shadow-xs" : "text-brand-stone"
                      }`}
                    >
                      💬 Ask Bible Heroes
                    </button>
                    <button
                      onClick={() => setChatSubTab("assistant")}
                      className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                        chatSubTab === "assistant" ? "bg-brand-olive text-white shadow-xs" : "text-brand-stone"
                      }`}
                    >
                      🤖 Bible AI Assistant
                    </button>
                  </div>
                </div>

                {chatSubTab === "heroes" ? <AskHeroes /> : <BibleAIAssistant />}
              </motion.div>
            )}

            {/* 4. Creative Zone Tab */}
            {activeTab === "creative" && (
              <motion.div
                key="creative-viewport"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Sub Tab selection */}
                <div className="flex justify-center">
                  <div className="bg-brand-sand/50 border border-brand-sand p-1 rounded-2xl flex items-center gap-1">
                    <button
                      onClick={() => setCreativeSubTab("coloring")}
                      className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                        creativeSubTab === "coloring" ? "bg-brand-olive text-white shadow-xs" : "text-brand-stone"
                      }`}
                    >
                      🎨 Paint Studio
                    </button>
                    <button
                      onClick={() => setCreativeSubTab("crafts")}
                      className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                        creativeSubTab === "crafts" ? "bg-brand-olive text-white shadow-xs" : "text-brand-stone"
                      }`}
                    >
                      ✂️ Bible Crafts
                    </button>
                    <button
                      onClick={() => setCreativeSubTab("printables")}
                      className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                        creativeSubTab === "printables" ? "bg-brand-olive text-white shadow-xs" : "text-brand-stone"
                      }`}
                    >
                      🖨️ Printables
                    </button>
                  </div>
                </div>

                {creativeSubTab === "coloring" && <ColoringBook />}
                {creativeSubTab === "crafts" && <BibleCrafts onAddScore={handleAddScore} />}
                {creativeSubTab === "printables" && <PrintableResources onAddScore={handleAddScore} />}
              </motion.div>
            )}

            {/* 5. Faith Quests Tab */}
            {activeTab === "quests" && (
              <motion.div
                key="quests-viewport"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Sub Tab selection */}
                <div className="flex justify-center">
                  <div className="bg-brand-sand/50 border border-brand-sand p-1 rounded-2xl flex items-center gap-1">
                    <button
                      onClick={() => setQuestsSubTab("quiz")}
                      className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                        questsSubTab === "quiz" ? "bg-brand-olive text-white shadow-xs" : "text-brand-stone"
                      }`}
                    >
                      🎮 Quiz Quest
                    </button>
                    <button
                      onClick={() => setQuestsSubTab("verses")}
                      className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                        questsSubTab === "verses" ? "bg-brand-olive text-white shadow-xs" : "text-brand-stone"
                      }`}
                    >
                      🛡️ Verse Quest
                    </button>
                  </div>
                </div>

                {questsSubTab === "quiz" ? (
                  <QuizQuest onAddScore={handleAddScore} />
                ) : (
                  <MemoryVerseMaster
                    onAddScore={handleAddScore}
                    collectedVerses={collectedVerses}
                    onCollectVerse={handleCollectVerse}
                  />
                )}
              </motion.div>
            )}

            {/* 6. Sunday School & Leadership Tab */}
            {activeTab === "sunday" && (
              <motion.div
                key="sunday-viewport"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Sub Tab selection */}
                <div className="flex justify-center">
                  <div className="bg-brand-sand/50 border border-brand-sand p-1 rounded-2xl flex flex-wrap justify-center items-center gap-1">
                    <button
                      onClick={() => setSundaySubTab("school")}
                      className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                        sundaySubTab === "school" ? "bg-brand-olive text-white shadow-xs" : "text-brand-stone"
                      }`}
                    >
                      ⛪ Sunday School Mode
                    </button>
                    <button
                      onClick={() => setSundaySubTab("dashboard")}
                      className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                        sundaySubTab === "dashboard" ? "bg-brand-olive text-white shadow-xs" : "text-brand-stone"
                      }`}
                    >
                      👨‍👩‍👦 Parents' Dashboard
                    </button>
                    <button
                      onClick={() => setSundaySubTab("giving")}
                      className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                        sundaySubTab === "giving" ? "bg-brand-olive text-white shadow-xs" : "text-brand-stone"
                      }`}
                    >
                      🤝 Giving & Compassion
                    </button>
                  </div>
                </div>

                {sundaySubTab === "school" && <SundaySchoolMode onAddScore={handleAddScore} />}
                {sundaySubTab === "dashboard" && <ParentsDashboard userScore={userScore} />}
                {sundaySubTab === "giving" && <GivingCompassion userScore={userScore} onDeductScore={handleDeductScore} />}
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* Fun, Simple Child-Friendly Footer */}
        <footer className="text-center text-brand-stone/60 font-bold text-[11px] py-4 border-t border-brand-sand/70 flex items-center justify-center gap-1">
          Made with <Heart className="w-3 h-3 text-brand-clay fill-current" /> and God's Promise for kids. Have an awesome day! 🐑🌿
        </footer>
      </div>
    </div>
  );
}
