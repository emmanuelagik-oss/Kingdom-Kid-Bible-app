import React, { useState, useEffect } from "react";
import { Heart, Send, Sparkles, Check, Star, BookOpen, Clock, Bell, Trash2, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SharedPrayer {
  id: string;
  name: string;
  emoji: string;
  text: string;
  answered: boolean;
  date: string;
}

const TEMPLATE_SHARED_PRAYERS: SharedPrayer[] = [
  { id: "p1", name: "Grandma May", emoji: "👵🏼💖", text: "Please pray for my grandma to stay healthy and have strong strength in her legs today.", answered: false, date: "Jun 30, 2026" },
  { id: "p2", name: "Little Jimmy", emoji: "🧒🎒", text: "Praying for courage on my spelling test today! Help me not be nervous.", answered: true, date: "Jun 29, 2026" },
  { id: "p3", name: "Baby Sister Bella", emoji: "👶🍼", text: "Thanking God for my new baby sister sleeping so peacefully in her crib.", answered: true, date: "Jun 28, 2026" }
];

interface PrayerRoomProps {
  onAddScore: (points: number) => void;
}

export default function PrayerRoom({ onAddScore }: PrayerRoomProps) {
  const [prayers, setPrayers] = useState<SharedPrayer[]>([]);
  const [newRequest, setNewRequest] = useState("");
  const [kidName, setKidName] = useState("");
  const [prayerEmoji, setPrayerEmoji] = useState("🙏");
  const [activeTab, setActiveTab] = useState<"wall" | "reminders" | "templates">("wall");
  
  // Timer States
  const [reminderTimer, setReminderTimer] = useState<number | null>(null);
  const [reminderName, setReminderName] = useState("");
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("kingdom_kids_prayers");
    if (saved) {
      try {
        setPrayers(JSON.parse(saved));
      } catch (e) {
        setPrayers(TEMPLATE_SHARED_PRAYERS);
      }
    } else {
      setPrayers(TEMPLATE_SHARED_PRAYERS);
      localStorage.setItem("kingdom_kids_prayers", JSON.stringify(TEMPLATE_SHARED_PRAYERS));
    }
  }, []);

  const savePrayers = (updated: SharedPrayer[]) => {
    setPrayers(updated);
    localStorage.setItem("kingdom_kids_prayers", JSON.stringify(updated));
  };

  const handlePostRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequest.trim()) return;

    const newReq: SharedPrayer = {
      id: Date.now().toString(),
      name: kidName.trim() || "Kingdom Kid",
      emoji: prayerEmoji,
      text: newRequest.trim(),
      answered: false,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };

    const updated = [newReq, ...prayers];
    savePrayers(updated);
    setNewRequest("");
    setKidName("");
    onAddScore(15); // Earn 15 coins for posting a prayer
  };

  const toggleAnswered = (id: string) => {
    const updated = prayers.map((p) => {
      if (p.id === id) {
        if (!p.answered) {
          onAddScore(20); // Earn 20 coins for thanking God for answered prayers!
        }
        return { ...p, answered: !p.answered };
      }
      return p;
    });
    savePrayers(updated);
  };

  const deleteRequest = (id: string) => {
    const updated = prayers.filter(p => p.id !== id);
    savePrayers(updated);
  };

  // TTS Voice Player
  const readPrayerAloud = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.2; // Warm friendly kid pitched
    window.speechSynthesis.speak(utterance);
  };

  // Reminder alarm
  const startTimerPreset = (name: string, secs: number) => {
    window.speechSynthesis.cancel();
    setReminderName(name);
    setReminderTimer(secs);
    setTimerActive(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && reminderTimer !== null && reminderTimer > 0) {
      interval = setInterval(() => {
        setReminderTimer(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (timerActive && reminderTimer === 0) {
      setTimerActive(false);
      // Play voice alarm blessing
      readPrayerAloud(`Beep beep! It is time for your prayer reminder: ${reminderName}. Let's pray together, dear child.`);
      alert(`⏰ Prayer Time Reminder: ${reminderName}!`);
    }
    return () => clearInterval(interval);
  }, [timerActive, reminderTimer, reminderName]);

  return (
    <div className="space-y-6" id="prayer-room-root">
      {/* Tab select */}
      <div className="flex justify-center">
        <div className="bg-sage-100/50 p-1 rounded-2xl flex items-center border border-emerald-200">
          <button
            onClick={() => setActiveTab("wall")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === "wall" ? "bg-emerald-500 text-white shadow-xs" : "text-emerald-800"
            }`}
          >
            <Heart className="w-4 h-4" /> 🙏 Prayer Wall
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === "templates" ? "bg-emerald-500 text-white shadow-xs" : "text-emerald-800"
            }`}
          >
            <BookOpen className="w-4 h-4" /> 🌅 Morning & Evening Prayers
          </button>
          <button
            onClick={() => setActiveTab("reminders")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === "reminders" ? "bg-emerald-500 text-white shadow-xs" : "text-emerald-800"
            }`}
          >
            <Bell className="w-4 h-4" /> ⏰ Prayer Reminders
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "wall" && (
          <motion.div key="wall" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create form */}
            <div className="lg:col-span-1 bg-white border-3 border-emerald-100 rounded-3xl p-6 h-fit space-y-4 shadow-xs">
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Heart className="w-5 h-5 fill-emerald-100" />
                <h4 className="font-extrabold text-sm font-serif">Post a Prayer Request</h4>
              </div>
              <p className="text-xxs text-brand-stone font-semibold">
                Share what is on your heart. Post to the wall to earn 15 Stars & Coins!
              </p>

              <form onSubmit={handlePostRequest} className="space-y-3">
                <div>
                  <label className="block text-xxs font-black text-brand-stone mb-1">Your First Name:</label>
                  <input
                    type="text"
                    placeholder="e.g. Samuel, Joy"
                    value={kidName}
                    onChange={(e) => setKidName(e.target.value)}
                    className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-3 py-2 text-xs text-brand-dark focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xxs font-black text-brand-stone mb-1">Select an Icon:</label>
                  <div className="flex gap-2">
                    {["🙏", "💖", "🎒", "👶", "🐶", "🏥"].map((emo) => (
                      <button
                        type="button"
                        key={emo}
                        onClick={() => setPrayerEmoji(emo)}
                        className={`text-lg p-2 rounded-xl border transition-all ${
                          prayerEmoji === emo ? "bg-emerald-100 border-emerald-400 scale-110" : "bg-white border-brand-sand"
                        }`}
                      >
                        {emo}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xxs font-black text-brand-stone mb-1">Your Prayer Request:</label>
                  <textarea
                    rows={3}
                    placeholder="Dear Heavenly Father, I pray for..."
                    value={newRequest}
                    onChange={(e) => setNewRequest(e.target.value)}
                    className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl p-3 text-xs text-brand-dark focus:outline-hidden focus:ring-2 focus:ring-emerald-400 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1"
                >
                  <Send className="w-4 h-4" /> Post Prayer Request
                </button>
              </form>
            </div>

            {/* Prayers Wall columns */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-extrabold text-sm text-brand-stone flex items-center gap-1.5">
                🌸 Shared Prayer Wall
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prayers.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    className={`p-4 border-2 rounded-2xl flex flex-col justify-between space-y-3 shadow-xs relative overflow-hidden ${
                      p.answered
                        ? "bg-emerald-50 border-emerald-300"
                        : "bg-white border-brand-sand hover:border-emerald-200"
                    }`}
                  >
                    {p.answered && (
                      <span className="absolute top-2 right-2 bg-emerald-100 border border-emerald-300 text-[9px] font-black text-emerald-800 px-2 py-0.5 rounded-full uppercase">
                        Answered! 🙌
                      </span>
                    )}

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-2xl">{p.emoji}</span>
                        <div>
                          <h5 className="font-extrabold text-xs text-brand-dark leading-none">{p.name}</h5>
                          <span className="text-[9px] text-brand-stone/60 font-semibold">{p.date}</span>
                        </div>
                      </div>
                      <p className="text-xs text-brand-stone font-semibold leading-relaxed font-serif">
                        "{p.text}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-brand-sand/50">
                      <button
                        onClick={() => readPrayerAloud(`Dear God, we pray with ${p.name}: ${p.text}`)}
                        className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 cursor-pointer flex items-center gap-0.5"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Speak Prayer
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleAnswered(p.id)}
                          className={`text-[9px] font-black px-2.5 py-1 rounded-lg border cursor-pointer transition-all ${
                            p.answered
                              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                              : "bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                          }`}
                        >
                          {p.answered ? "✓ Answered!" : "Mark Answered 🙌"}
                        </button>
                        <button
                          onClick={() => deleteRequest(p.id)}
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "templates" && (
          <motion.div key="templates" className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Morning prayer card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-3 border-amber-200 rounded-[32px] p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-orange-500">
                <span className="text-4xl">🌅</span>
                <div>
                  <h4 className="font-black font-serif text-base text-brand-dark">Morning Blessing</h4>
                  <span className="text-xxs font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase">Let's rise!</span>
                </div>
              </div>
              <p className="text-xs text-brand-stone font-semibold font-serif leading-relaxed italic bg-white p-4 rounded-xl border border-amber-100 shadow-inner">
                "Dear Heavenly Father, thank You for the warm sun, a brand new day, and the sweet breath in my lungs. Help me to shine like a little star today. Teach me to obey my parents, help my siblings, and share my food with kindness. Keep my feet safe on the path of love. In Jesus' name, Amen!"
              </p>
              <button
                onClick={() => readPrayerAloud("Dear Heavenly Father, thank You for the warm sun, a brand new day, and the sweet breath in my lungs. Help me to shine like a little star today. Teach me to obey my parents, help my siblings, and share my food with kindness. Keep my feet safe on the path of love. In Jesus' name, Amen!")}
                className="w-full py-2.5 bg-orange-400 hover:bg-orange-500 text-white font-black text-xs rounded-xl shadow-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" /> Listen to Morning Prayer
              </button>
            </div>

            {/* Evening prayer card */}
            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border-3 border-indigo-500 rounded-[32px] p-6 space-y-4 text-white shadow-sm">
              <div className="flex items-center gap-2 text-indigo-400">
                <span className="text-4xl">🌙</span>
                <div>
                  <h4 className="font-black font-serif text-base text-white">Evening Protection</h4>
                  <span className="text-xxs font-black bg-indigo-900 text-indigo-200 px-2 py-0.5 rounded-full uppercase">Sweet dreams</span>
                </div>
              </div>
              <p className="text-xs text-indigo-200 font-semibold font-serif leading-relaxed italic bg-black/40 p-4 rounded-xl border border-indigo-900 shadow-inner">
                "Lord Jesus, the stars are out and the quiet night has come. Thank You for guiding my steps today. Forgive me for any quick words, and wash my heart clean. Send Your strong angels to pitch their tents around my bed. Give me peaceful dreams and strong strength for tomorrow. Amen!"
              </p>
              <button
                onClick={() => readPrayerAloud("Lord Jesus, the stars are out and the quiet night has come. Thank You for guiding my steps today. Forgive me for any quick words, and wash my heart clean. Send Your strong angels to pitch their tents around my bed. Give me peaceful dreams and strong strength for tomorrow. Amen!")}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" /> Listen to Evening Prayer
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === "reminders" && (
          <motion.div key="reminders" className="max-w-xl mx-auto bg-white border-3 border-emerald-100 rounded-[32px] p-6 space-y-6 text-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-4xl border border-emerald-200 animate-bounce">
              🔔
            </div>
            
            <div className="space-y-2">
              <h4 className="font-black font-serif text-lg text-brand-dark">Set a Prayer Alarm!</h4>
              <p className="text-xs text-brand-stone font-semibold">
                Select a preset. When the alarm ticks down, a sweet voice and a ring will remind you to pause and speak with God.
              </p>
            </div>

            {timerActive ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <span className="text-[10px] font-black text-emerald-800 uppercase block mb-1">Prayer Alert Active</span>
                <span className="text-3xl font-black text-emerald-600 font-mono tracking-wider">
                  {reminderName}: {reminderTimer}s
                </span>
                <p className="text-xxs text-brand-stone mt-1">Please keep the app open to trigger the blessing alarm!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => startTimerPreset("Quick Blessing", 5)}
                  className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xxs font-black text-emerald-800 cursor-pointer"
                >
                  ⚡ Quick Test (5 Seconds)
                </button>
                <button
                  onClick={() => startTimerPreset("Lunchtime Thanks", 15)}
                  className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xxs font-black text-emerald-800 cursor-pointer"
                >
                  🍎 Lunch Thanks (15 Seconds)
                </button>
                <button
                  onClick={() => startTimerPreset("Evening Bedtime", 30)}
                  className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xxs font-black text-emerald-800 cursor-pointer"
                >
                  🛌 Bedtime Blessing (30 Seconds)
                </button>
                <button
                  onClick={() => startTimerPreset("Quiet Peace Check", 60)}
                  className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xxs font-black text-emerald-800 cursor-pointer"
                >
                  🕊️ Quiet Moment (60 Seconds)
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
