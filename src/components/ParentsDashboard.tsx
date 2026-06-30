import { useState, useEffect } from "react";
import { Shield, Sparkles, BookOpen, Clock, Award, CheckCircle, FileText, Heart, PlusCircle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface JournalEntry {
  id: string;
  date: string;
  text: string;
}

interface PrayerRequest {
  id: string;
  date: string;
  request: string;
  answered: boolean;
}

export default function ParentsDashboard({ userScore }: { userScore: number }) {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [newPrayer, setNewPrayer] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    // Journal
    const journalLocal = localStorage.getItem("kids_bible_journal");
    if (journalLocal) {
      try {
        setJournalEntries(JSON.parse(journalLocal));
      } catch (e) {
        console.error(e);
      }
    }

    // Prayers
    const prayersLocal = localStorage.getItem("kids_bible_prayers");
    if (prayersLocal) {
      try {
        setPrayers(JSON.parse(prayersLocal));
      } catch (e) {
        console.error(e);
      }
    } else {
      const defaultPrayers: PrayerRequest[] = [
        { id: "p1", date: "Jun 28, 2026", request: "Praying for grandma to feel better soon and have strong strength.", answered: false },
        { id: "p2", date: "Jun 29, 2026", request: "Thanking God for giving me friendly helpers in school today.", answered: true }
      ];
      setPrayers(defaultPrayers);
      localStorage.setItem("kids_bible_prayers", JSON.stringify(defaultPrayers));
    }
  }, []);

  const handleAddPrayer = () => {
    if (!newPrayer.trim()) return;

    const newReq: PrayerRequest = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      request: newPrayer.trim(),
      answered: false
    };

    const updated = [newReq, ...prayers];
    setPrayers(updated);
    localStorage.setItem("kids_bible_prayers", JSON.stringify(updated));
    setNewPrayer("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleToggleAnswered = (id: string) => {
    const updated = prayers.map((p) => {
      if (p.id === id) return { ...p, answered: !p.answered };
      return p;
    });
    setPrayers(updated);
    localStorage.setItem("kids_bible_prayers", JSON.stringify(updated));
  };

  const handleDeletePrayer = (id: string) => {
    const updated = prayers.filter((p) => p.id !== id);
    setPrayers(updated);
    localStorage.setItem("kids_bible_prayers", JSON.stringify(updated));
  };

  return (
    <div className="space-y-8" id="parents-dashboard-root">
      {/* Banner */}
      <div className="bg-brand-sand p-6 rounded-[32px] text-brand-dark shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-brand-sand/55">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="bg-brand-olive/20 text-brand-stone font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
            👨‍👩‍👧‍👦 Parent's Command Center
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-brand-dark">
            Parents' Progress Hub!
          </h2>
          <p className="text-sm md:text-base text-brand-stone max-w-lg font-medium">
            Monitor reading completions, verify quiz performance, check out weekly prayer activity streaks, review personal journal entries, and track certificates earned!
          </p>
        </div>
        <div className="text-5xl mt-4 md:mt-0 animate-pulse duration-[5000ms]">👨‍👩‍👦‍👦🏡❤️</div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border-2 border-brand-sand rounded-[24px] p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 bg-brand-olive/15 rounded-xl flex items-center justify-center text-brand-olive shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-brand-stone font-bold block uppercase tracking-wider">Reading Progress</span>
            <span className="text-sm font-black text-brand-dark">3 / 5 Stories</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border-2 border-brand-sand rounded-[24px] p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 bg-brand-sage/20 rounded-xl flex items-center justify-center text-brand-olive shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-brand-stone font-bold block uppercase tracking-wider">Quiz Success</span>
            <span className="text-sm font-black text-brand-dark">{userScore} Stars Earned</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border-2 border-brand-sand rounded-[24px] p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 bg-brand-cream border border-brand-sand rounded-xl flex items-center justify-center text-brand-dark shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-brand-stone font-bold block uppercase tracking-wider">Time Spent</span>
            <span className="text-sm font-black text-brand-dark">45 mins / week</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border-2 border-brand-sand rounded-[24px] p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 bg-brand-gold/25 rounded-xl flex items-center justify-center text-brand-gold shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-brand-stone font-bold block uppercase tracking-wider">Achievements</span>
            <span className="text-sm font-black text-brand-dark">4 Badges unlocked</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 6 Columns: Journal Reviewer */}
        <div className="lg:col-span-6 bg-white border-2 border-brand-sand rounded-[32px] p-6 shadow-sm space-y-5">
          <h3 className="font-bold font-serif text-brand-stone border-b border-brand-sand/65 pb-3 flex items-center gap-2 text-md">
            <FileText className="w-5 h-5 text-brand-olive" /> Review Child's Journals
          </h3>

          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
            {journalEntries.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <span className="text-4xl">✍️</span>
                <p className="text-xs text-brand-stone/60 font-semibold italic">
                  Your child hasn't saved any journal entries yet. Once they write in the Morning Devotional, their entries will show up here!
                </p>
              </div>
            ) : (
              journalEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-brand-cream/15 border border-brand-sand/45 p-4 rounded-2xl space-y-2"
                >
                  <span className="text-[10px] font-black text-brand-olive uppercase tracking-wider">
                    Written on {entry.date}
                  </span>
                  <p className="text-xs text-brand-stone font-semibold leading-relaxed">
                    "{entry.text}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right 6 Columns: Family Prayer Requests Manager */}
        <div className="lg:col-span-6 bg-white border-2 border-brand-sand rounded-[32px] p-6 shadow-sm space-y-5">
          <h3 className="font-bold font-serif text-brand-stone border-b border-brand-sand/65 pb-3 flex items-center gap-2 text-md">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500/15" /> Family Prayer Requests
          </h3>

          {/* Add custom prayer requests */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-bold text-brand-stone uppercase tracking-wide">Add Family Prayer Point</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newPrayer}
                onChange={(e) => setNewPrayer(e.target.value)}
                placeholder="Praying for school year, family wellness, etc..."
                className="flex-1 px-4 py-2.5 border-2 border-brand-sand/65 rounded-xl text-xs font-semibold text-brand-stone focus:outline-none focus:border-brand-olive"
              />
              <button
                onClick={handleAddPrayer}
                disabled={!newPrayer.trim()}
                className="bg-brand-olive hover:bg-brand-stone text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer flex items-center gap-1 shrink-0 disabled:opacity-40"
              >
                <PlusCircle className="w-4 h-4" /> Add
              </button>
            </div>
            {showSuccess && (
              <span className="text-[10px] text-brand-olive font-extrabold animate-pulse">Prayer request logged!</span>
            )}
          </div>

          {/* Prayers List */}
          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 pt-3 border-t border-brand-sand/65">
            {prayers.length === 0 ? (
              <p className="text-xs text-brand-stone/50 italic text-center py-6 font-semibold">No prayer requests recorded yet.</p>
            ) : (
              prayers.map((p) => (
                <div
                  key={p.id}
                  className={`p-3.5 rounded-2xl border text-xs flex justify-between items-start transition-all ${
                    p.answered
                      ? "bg-brand-sage/10 border-brand-sage/35 text-brand-stone/60"
                      : "bg-white border-brand-sand/40 text-brand-dark"
                  }`}
                >
                  <div className="space-y-1 max-w-[80%]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-black text-brand-stone/50">{p.date}</span>
                      {p.answered && (
                        <span className="bg-brand-sage text-white text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                          Answered! 🎉
                        </span>
                      )}
                    </div>
                    <p className={`font-semibold leading-relaxed ${p.answered ? "line-through" : ""}`}>
                      {p.request}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleAnswered(p.id)}
                      className={`px-2 py-1 rounded-lg text-[9px] font-bold cursor-pointer transition-colors ${
                        p.answered
                          ? "bg-white border border-brand-sand text-brand-stone"
                          : "bg-brand-sage text-white"
                      }`}
                    >
                      {p.answered ? "Undo" : "Amen!"}
                    </button>
                    <button
                      onClick={() => handleDeletePrayer(p.id)}
                      className="text-brand-clay hover:text-red-500 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
