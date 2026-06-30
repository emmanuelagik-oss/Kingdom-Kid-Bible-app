import { useState, useEffect } from "react";
import { Sparkles, BookOpen, Heart, Award, HelpCircle, Save, Calendar, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface JournalEntry {
  id: string;
  date: string;
  text: string;
}

export default function DailyDevotional() {
  const [journalInput, setJournalInput] = useState("");
  const [savedEntries, setSavedEntries] = useState<JournalEntry[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load journal entries from localStorage on mount
  useEffect(() => {
    const local = localStorage.getItem("kids_bible_journal");
    if (local) {
      try {
        setSavedEntries(JSON.parse(local));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSaveJournal = () => {
    if (!journalInput.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: journalInput.trim(),
    };

    const updated = [newEntry, ...savedEntries];
    setSavedEntries(updated);
    localStorage.setItem("kids_bible_journal", JSON.stringify(updated));
    setJournalInput("");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDeleteEntry = (id: string) => {
    const updated = savedEntries.filter((entry) => entry.id !== id);
    setSavedEntries(updated);
    localStorage.setItem("kids_bible_journal", JSON.stringify(updated));
  };

  return (
    <div className="space-y-8" id="daily-devotional-root">
      {/* Banner */}
      <div className="bg-brand-sand p-6 rounded-[32px] text-brand-dark shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-brand-sand/55">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="bg-brand-olive/20 text-brand-stone font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
            🌅 Morning Daily Devotional
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-brand-dark">
            Today's Fresh Manna Scroll!
          </h2>
          <p className="text-sm md:text-base text-brand-stone max-w-lg font-medium">
            Every single morning: read a beautiful Bible verse, discover a lovely moral story, pray together, take the daily challenge, and write in your secret journal vault!
          </p>
        </div>
        <div className="text-5xl mt-4 md:mt-0 animate-bounce duration-[4000ms]">🌅📚🐑</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Columns: Today's Devotion */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border-2 border-brand-sand rounded-[32px] p-6 shadow-sm space-y-6 relative overflow-hidden">
            {/* Header Date */}
            <div className="flex items-center justify-between border-b border-brand-sand/65 pb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-olive" />
                <span className="font-serif font-bold text-brand-stone text-md">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </span>
              </div>
              <span className="bg-brand-sage/20 text-brand-stone font-black text-xxs px-3 py-1 rounded-full">
                Active Scroll
              </span>
            </div>

            {/* 1. Scripture Verse */}
            <div className="bg-brand-sage/15 border border-brand-sage/40 p-5 rounded-2xl space-y-2">
              <span className="text-xxs font-black text-brand-olive uppercase tracking-widest block">
                📜 1. The Morning Word:
              </span>
              <p className="text-sm md:text-base text-brand-stone font-bold italic leading-relaxed">
                "John 15:12 — 'My command is this: Love each other as I have loved you.'"
              </p>
            </div>

            {/* 2. Morning Story */}
            <div className="space-y-2">
              <span className="text-xxs font-black text-brand-stone uppercase tracking-widest block">
                📖 2. Today's Morning Story:
              </span>
              <h4 className="font-bold font-serif text-brand-dark text-base">
                Barnaby the Little Lamb & The Prickly Patch
              </h4>
              <p className="text-xs md:text-sm text-brand-stone leading-relaxed font-medium bg-brand-cream/15 p-4 rounded-2xl border border-brand-sand/35">
                Little Barnaby lamb was chasing a butterfly when he got his fluffy wool stuck in a prickly patch of brambles. He couldn't move! He let out a sad bleat. Instantly, his friends Barnaby Rabbit and Pippa Squirrel heard him. They collaborated and held the prickly branches back, helping Barnaby step out safely. When we love and help each other, we make our meadows look just like God's heaven!
              </p>
            </div>

            {/* 3. Morning Prayer */}
            <div className="bg-rose-50/60 border border-rose-200 p-4 rounded-2xl space-y-1.5 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-rose-300 opacity-20">
                <Heart className="w-16 h-16 fill-current" />
              </div>
              <span className="text-xxs font-black text-rose-700 uppercase tracking-widest block relative z-10">
                🙏 3. Morning Prayer:
              </span>
              <p className="text-xs md:text-sm text-brand-stone font-bold italic leading-relaxed relative z-10">
                "Dear Jesus, thank You for Your endless love for me. Help me to keep my eyes wide open today for anyone who is stuck, lonely, or needs help, so that I can share Your warmth with them. Amen."
              </p>
            </div>

            {/* 4. Question & Challenge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Question */}
              <div className="bg-brand-cream/35 border border-brand-sand p-4 rounded-2xl space-y-1.5">
                <span className="text-xxs font-black text-brand-stone uppercase tracking-wider block flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> 4. Daily Question:
                </span>
                <p className="text-xs text-brand-stone font-semibold leading-relaxed">
                  Who might feel a little left out or lonely in your class or neighborhood? How can you help them feel loved today?
                </p>
              </div>

              {/* Challenge */}
              <div className="bg-brand-gold/15 border border-brand-gold p-4 rounded-2xl space-y-1.5">
                <span className="text-xxs font-black text-brand-stone uppercase tracking-wider block flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-brand-gold fill-brand-gold/10" /> 5. Morning Challenge:
                </span>
                <p className="text-xs text-brand-stone font-semibold leading-relaxed">
                  Write a small note of appreciation or draw a happy yellow sun for someone in your family today, thanking them for being so special!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Daily Reflection Journal */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-brand-sand rounded-[32px] p-6 shadow-sm space-y-5">
            <div className="border-b border-brand-sand/65 pb-3">
              <span className="bg-brand-sage/20 text-brand-stone text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                ✍️ 6. My Spiritual Journal Vault
              </span>
              <h3 className="text-md font-bold font-serif text-brand-dark mt-2">
                Write down your thoughts & prayers:
              </h3>
            </div>

            {/* Input form */}
            <div className="space-y-3">
              <textarea
                value={journalInput}
                onChange={(e) => setJournalInput(e.target.value)}
                placeholder="What is your answer to the daily question? Or write a sweet thank-you prayer to God..."
                className="w-full h-32 p-4 border-2 border-brand-sand/65 rounded-2xl text-xs md:text-sm font-semibold text-brand-stone placeholder-brand-stone/40 focus:outline-none focus:border-brand-olive focus:ring-2 focus:ring-brand-sage/15 resize-none"
              />
              <button
                onClick={handleSaveJournal}
                disabled={!journalInput.trim()}
                className="w-full bg-brand-olive hover:bg-brand-stone text-white font-bold py-3.5 px-6 rounded-2xl text-xs md:text-sm shadow-xs transition-all cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                id="save-journal-entry-btn"
              >
                <Save className="w-4 h-4" /> Save in Secret Vault
              </button>

              {savedSuccess && (
                <span className="text-xs text-brand-olive font-extrabold block text-center animate-pulse">
                  ✨ Saved successfully! Parents can review this in the Dashboard! ✨
                </span>
              )}
            </div>

            {/* Previous entries */}
            <div className="space-y-3 pt-3 border-t border-brand-sand/65">
              <h4 className="text-xs font-bold text-brand-stone uppercase tracking-wide">
                Saved Journal Entries ({savedEntries.length})
              </h4>

              <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                <AnimatePresence>
                  {savedEntries.length === 0 ? (
                    <p className="text-[11px] text-brand-stone/50 italic font-semibold text-center py-4">
                      No saved entries yet. Your journal is private and securely encrypted!
                    </p>
                  ) : (
                    savedEntries.map((entry) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-brand-cream/20 border border-brand-sand/45 p-3 rounded-xl space-y-1 relative group"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-black text-brand-olive uppercase tracking-wider">
                            {entry.date}
                          </span>
                          <button
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="text-brand-clay hover:text-red-500 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-brand-stone font-semibold leading-relaxed">
                          {entry.text}
                        </p>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
