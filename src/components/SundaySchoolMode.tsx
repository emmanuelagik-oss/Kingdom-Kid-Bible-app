import React, { useState } from "react";
import { BookOpen, Users, CheckSquare, Star, Award, Calendar, ChevronRight, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Student {
  id: string;
  name: string;
  avatar: string;
  present: boolean;
  stars: number;
}

const INITIAL_CLASSROOM: Student[] = [
  { id: "s1", name: "Daniel Brave", avatar: "🦁", present: true, stars: 35 },
  { id: "s2", name: "Esther Crown", avatar: "👑", present: true, stars: 40 },
  { id: "s3", name: "Noah Ark", avatar: "⛵", present: false, stars: 20 },
  { id: "s4", name: "Ruth Heart", avatar: "🌾", present: true, stars: 45 },
  { id: "s5", name: "Samuel Ear", avatar: "👂🏼", present: true, stars: 30 }
];

interface LessonPlan {
  id: string;
  title: string;
  focus: string;
  verse: string;
  teacherTip: string;
  steps: string[];
}

const LESSON_PLANS: LessonPlan[] = [
  {
    id: "l1",
    title: "Lesson 1: Brave Little Shepherds",
    focus: "Courage Over Fear (David & Goliath)",
    verse: "The Lord is my light and my salvation; whom shall I fear? - Psalm 27:1",
    teacherTip: "Use five smooth craft stones during class check-in to illustrate David's absolute trust.",
    steps: [
      "Gathering Time (Play 'Shake the Leaves' action song)",
      "Read Story: David & Goliath (Narrated aloud)",
      "Solve Shield Word Scramble together",
      "Craft Activity: Build cardboard shepherd slings",
      "Closing Circle Prayer and Coin reward distribution"
    ]
  },
  {
    id: "l2",
    title: "Lesson 2: The Floating Rainbow Rescue",
    focus: "Trusting Obedience (Noah's Ark)",
    verse: "When I see the rainbow in the clouds, I will remember my covenant. - Genesis 9:16",
    teacherTip: "Have students draw water doodles on the whiteboard while telling the story.",
    steps: [
      "Gathering Check-In (Draw today's mood on drawing pads)",
      "Watch Animated Episode: Noah's Whale & Storm",
      "Solve Missing Word Quizzes about the Ark",
      "Coloring Challenge: Rainbow and animal stickers",
      "Dismissal blessing and star awards"
    ]
  }
];

interface SundaySchoolModeProps {
  onAddScore: (points: number) => void;
}

export default function SundaySchoolMode({ onAddScore }: SundaySchoolModeProps) {
  const [activeTab, setActiveTab] = useState<"plans" | "classroom">("plans");
  const [selectedPlan, setSelectedPlan] = useState<LessonPlan>(LESSON_PLANS[0]);
  const [classroom, setClassroom] = useState<Student[]>(INITIAL_CLASSROOM);
  const [attendanceClaimed, setAttendanceClaimed] = useState(false);

  const togglePresent = (id: string) => {
    setClassroom(prev =>
      prev.map(st => (st.id === id ? { ...st, present: !st.present } : st))
    );
  };

  const awardStarsToPresent = () => {
    if (attendanceClaimed) return;
    setClassroom(prev =>
      prev.map(st => (st.present ? { ...st, stars: st.stars + 5 } : st))
    );
    onAddScore(50); // Teacher receives 50 coins for complete check-in!
    setAttendanceClaimed(true);
  };

  return (
    <div className="space-y-6" id="sunday-school-root">
      {/* Tab toggle */}
      <div className="flex justify-center">
        <div className="bg-emerald-100/50 p-1 rounded-2xl flex items-center border border-emerald-200">
          <button
            onClick={() => setActiveTab("plans")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === "plans" ? "bg-emerald-500 text-white shadow-xs" : "text-emerald-800"
            }`}
          >
            <BookOpen className="w-4 h-4" /> 📖 Curriculum Lesson Plans
          </button>
          <button
            onClick={() => setActiveTab("classroom")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === "classroom" ? "bg-emerald-500 text-white shadow-xs" : "text-emerald-800"
            }`}
          >
            <Users className="w-4 h-4" /> 🏫 Kids Attendance & Logs
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "plans" && (
          <motion.div key="plans" className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Curriculums selection side panel */}
            <div className="lg:col-span-2 bg-white border-3 border-emerald-100 rounded-[32px] p-5 h-fit space-y-4">
              <h4 className="font-extrabold text-sm text-emerald-700 flex items-center gap-1.5 border-b border-brand-sand pb-3">
                <Calendar className="w-5 h-5" /> Weekly Curriculums
              </h4>

              <div className="space-y-2">
                {LESSON_PLANS.map((plan) => {
                  const active = plan.id === selectedPlan.id;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        active
                          ? "bg-emerald-50 border-emerald-300 scale-[1.01]"
                          : "bg-white border-brand-sand/50 hover:border-emerald-100"
                      }`}
                    >
                      <div className="min-w-0">
                        <h5 className="font-extrabold text-xs text-brand-dark leading-snug">{plan.title}</h5>
                        <p className="text-[10px] text-brand-stone font-semibold mt-1 truncate">Focus: {plan.focus}</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${active ? "text-emerald-500" : "text-brand-stone/30"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Plan Details */}
            <div className="lg:col-span-3 bg-white border-3 border-emerald-200 rounded-[36px] p-6 space-y-5">
              <div className="flex items-center gap-3 border-b border-brand-sand pb-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-xl border border-emerald-200 select-none">
                  📓
                </div>
                <div>
                  <h4 className="font-black text-base text-brand-dark font-serif leading-none">{selectedPlan.title}</h4>
                  <span className="text-[10px] font-black text-emerald-600 block mt-1 uppercase tracking-wide">
                    Topic: {selectedPlan.focus}
                  </span>
                </div>
              </div>

              {/* Memory Verse Box */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-1">
                <span className="text-[9px] font-black text-amber-700 bg-amber-200/50 px-2.5 py-0.5 rounded-full uppercase">Class Memory Verse:</span>
                <p className="text-xs font-serif font-extrabold text-brand-dark italic">
                  "{selectedPlan.verse}"
                </p>
              </div>

              {/* Steps lists */}
              <div className="space-y-3">
                <h5 className="font-extrabold text-xs text-brand-stone flex items-center gap-1.5 uppercase tracking-wide">
                  <CheckSquare className="w-4 h-4 text-emerald-500" /> Class Session Checklist:
                </h5>

                <div className="space-y-2">
                  {selectedPlan.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 bg-brand-sand/15 border border-brand-sand/55 rounded-xl text-xxs font-semibold text-brand-stone"
                    >
                      <span className="bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">
                        {idx + 1}
                      </span>
                      <p className="pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teacher tips */}
              <div className="bg-emerald-50/55 border border-emerald-200 p-4 rounded-xl">
                <h6 className="text-[10px] font-black text-emerald-800 uppercase flex items-center gap-1">
                  💡 Teacher's Lesson tip:
                </h6>
                <p className="text-xxs text-brand-stone font-semibold mt-1 leading-relaxed">
                  "{selectedPlan.teacherTip}"
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "classroom" && (
          <motion.div key="classroom" className="max-w-2xl mx-auto bg-white border-3 border-emerald-100 rounded-[32px] p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-brand-sand pb-4">
              <div>
                <h4 className="font-black text-base text-brand-dark font-serif leading-none">Class Register check-in</h4>
                <p className="text-xxs text-brand-stone font-semibold block mt-1">Check student attendance to grant them class star awards!</p>
              </div>
              <span className="text-4xl animate-bounce">🎒📋</span>
            </div>

            {/* Attendance list */}
            <div className="space-y-2">
              {classroom.map((student) => (
                <div
                  key={student.id}
                  className={`p-3.5 border-2 rounded-2xl flex items-center justify-between transition-all ${
                    student.present
                      ? "bg-emerald-50/50 border-emerald-300"
                      : "bg-white border-brand-sand/40 opacity-70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl select-none">{student.avatar}</span>
                    <div>
                      <h5 className="font-extrabold text-xs text-brand-dark">{student.name}</h5>
                      <span className="text-[9px] font-black text-amber-600 block mt-0.5">
                        ⭐ {student.stars} Class Stars
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => togglePresent(student.id)}
                    className={`px-3 py-1.5 rounded-xl text-xxs font-black border transition-all cursor-pointer ${
                      student.present
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "bg-white text-brand-stone border-brand-sand/70 hover:border-brand-sand"
                    }`}
                  >
                    {student.present ? "Present ✓" : "Absent ❌"}
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-brand-sand">
              {!attendanceClaimed ? (
                <button
                  onClick={awardStarsToPresent}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Award className="w-4.5 h-4.5" /> Close Register & Award present students +5 Stars!
                </button>
              ) : (
                <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-center text-emerald-800 text-xs font-black">
                  🎉 Class attendance complete! Students awarded! You earned +50 Coins!
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
