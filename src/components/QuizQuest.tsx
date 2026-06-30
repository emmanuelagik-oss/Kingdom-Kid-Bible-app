import React, { useState } from "react";
import { PRESET_QUIZZES } from "../data";
import { Quiz, QuizQuestion } from "../types";
import { Award, CheckCircle2, XCircle, ChevronRight, HelpCircle, Star, Sparkles, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface QuizQuestProps {
  onAddScore: (points: number) => void;
}

export default function QuizQuest({ onAddScore }: QuizQuestProps) {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Custom Quiz Generator states
  const [isGenerating, setIsGenerating] = useState(false);
  const [customTopic, setCustomTopic] = useState("");
  const [genError, setGenError] = useState("");

  const handleStartPresetQuiz = (levelKey: string) => {
    setSelectedLevel(levelKey);
    const quiz = PRESET_QUIZZES[levelKey];
    setCurrentQuiz(quiz);
    resetQuizState(quiz);
  };

  const resetQuizState = (quiz: Quiz) => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuizScore(0);
    setShowResults(false);
  };

  const handleSelectAnswer = (choiceIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(choiceIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuiz) return;
    setIsAnswered(true);

    const question = currentQuiz.questions[currentQuestionIndex];
    if (selectedAnswer === question.correctIndex) {
      setQuizScore(quizScore + 1);
      onAddScore(15); // Add 15 general XP/Score points to user
    }
  };

  const handleNextQuestion = () => {
    if (!currentQuiz) return;

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleGenerateCustomQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim()) return;

    setIsGenerating(true);
    setGenError("");

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: customTopic }),
      });

      if (!response.ok) {
        throw new Error("Unable to build quiz. Verify your Gemini API key is configured.");
      }

      const generatedData = await response.json();
      if (!generatedData.questions || !Array.isArray(generatedData.questions)) {
        throw new Error("Format of generated quiz was invalid.");
      }

      const customQuiz: Quiz = {
        title: generatedData.title || `Custom Quiz: ${customTopic}`,
        questions: generatedData.questions.map((q: any) => ({
          question: q.question,
          choices: q.choices,
          correctIndex: q.correctIndex,
          explanation: q.explanation
        }))
      };

      setSelectedLevel("custom");
      setCurrentQuiz(customQuiz);
      resetQuizState(customQuiz);
    } catch (err: any) {
      console.error(err);
      setGenError(err.message || "Failed to make custom quiz. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStars = (score: number, total: number) => {
    const percentage = score / total;
    let starsCount = 1;
    if (percentage === 1) starsCount = 3;
    else if (percentage >= 0.5) starsCount = 2;

    return (
      <div className="flex gap-2 justify-center py-4">
        {[1, 2, 3].map((starNum) => (
          <motion.div
            key={starNum}
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: starNum * 0.2, type: "spring", stiffness: 100 }}
          >
            <Star
              className={`w-12 h-12 ${
                starNum <= starsCount
                  ? "fill-yellow-400 text-yellow-400 filter drop-shadow-[0_4px_6px_rgba(250,204,21,0.4)]"
                  : "text-slate-200"
              }`}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8" id="quiz-quest-root">
      <AnimatePresence mode="wait">
        {!currentQuiz ? (
          <motion.div
            key="quiz-landing"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Header banner */}
            <div className="bg-brand-sand p-6 rounded-[32px] text-brand-dark shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-brand-sand/55">
              <div className="relative z-10 space-y-2 text-center md:text-left">
                <span className="bg-brand-olive/20 text-brand-stone font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                  🎮 Interactive Play
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-brand-dark">
                  Bible Hero Quests!
                </h2>
                <p className="text-sm md:text-base text-brand-stone max-w-lg font-medium">
                  Challenge your memory, earn magical golden stars, and learn sweet truths. Choose a quest or make your own!
                </p>
              </div>
              <div className="text-6xl md:text-8xl select-none mt-4 md:mt-0 animate-bounce duration-1000">
                🎮
              </div>
            </div>

            {/* Presets and generator grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Preset Levels Column */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold text-brand-stone font-serif flex items-center gap-2">
                  <Award className="text-brand-olive w-5 h-5" /> Choose Your Quest Level
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Beginner */}
                  <motion.button
                    onClick={() => handleStartPresetQuiz("beginner")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-white border-2 border-brand-sand/65 hover:border-brand-olive p-5 rounded-[24px] shadow-xs text-left space-y-3 cursor-pointer flex flex-col justify-between h-44"
                    id="quiz-btn-beginner"
                  >
                    <div>
                      <div className="w-10 h-10 bg-brand-cream rounded-xl flex items-center justify-center text-xl">
                        👶🏼
                      </div>
                      <h4 className="font-bold text-brand-dark font-serif mt-2">Level 1: Beginner</h4>
                      <p className="text-xxs text-brand-stone/85 leading-normal">
                        Perfect for little explorers starting out. Friendly questions on Noah and early heroes.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-brand-olive">Start Quest →</span>
                  </motion.button>

                  {/* Explorer */}
                  <motion.button
                    onClick={() => handleStartPresetQuiz("explorer")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-white border-2 border-brand-sand/65 hover:border-brand-olive p-5 rounded-[24px] shadow-xs text-left space-y-3 cursor-pointer flex flex-col justify-between h-44"
                    id="quiz-btn-explorer"
                  >
                    <div>
                      <div className="w-10 h-10 bg-brand-cream rounded-xl flex items-center justify-center text-xl">
                        🏹
                      </div>
                      <h4 className="font-bold text-brand-dark font-serif mt-2">Level 2: Explorer</h4>
                      <p className="text-xxs text-brand-stone/85 leading-normal">
                        Great for kids who know their heroes! Features David, Jonah, and Queen Esther.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-brand-olive">Start Quest →</span>
                  </motion.button>

                  {/* Hero */}
                  <motion.button
                    onClick={() => handleStartPresetQuiz("hero")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-white border-2 border-brand-sand/65 hover:border-brand-olive p-5 rounded-[24px] shadow-xs text-left space-y-3 cursor-pointer flex flex-col justify-between h-44"
                    id="quiz-btn-hero"
                  >
                    <div>
                      <div className="w-10 h-10 bg-brand-cream rounded-xl flex items-center justify-center text-xl">
                        🌟
                      </div>
                      <h4 className="font-bold text-brand-dark font-serif mt-2">Level 3: Bible Hero</h4>
                      <p className="text-xxs text-brand-stone/85 leading-normal">
                        Test your ultimate New Testament knowledge! Questions on Baby Jesus and miracles.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-brand-olive">Start Quest →</span>
                  </motion.button>
                </div>
              </div>

              {/* AI Quiz Generator Card */}
              <div className="bg-brand-cream/40 border-2 border-brand-sand p-6 rounded-[32px] space-y-4 shadow-xs h-fit">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-brand-olive w-5 h-5" />
                  <h3 className="text-lg font-bold text-brand-dark font-serif">Custom Quiz Maker</h3>
                </div>
                <p className="text-xs text-brand-stone font-medium">
                  Have a favorite Bible story, animal, or character? Type it in, and let Gemini cook up a custom 3-question quiz!
                </p>

                <form onSubmit={handleGenerateCustomQuiz} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-stone mb-1">
                      Choose any topic:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Angels, Miracles, Animals, Parables"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      className="w-full bg-white border border-brand-sand rounded-xl px-3 py-2.5 text-sm text-brand-dark focus:outline-hidden focus:ring-2 focus:ring-brand-olive"
                      required
                    />
                  </div>

                  {genError && (
                    <div className="p-2 bg-brand-clay/10 border border-brand-clay/30 rounded-lg text-brand-clay text-xs font-medium">
                      {genError}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isGenerating}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-brand-olive hover:bg-brand-stone text-white font-bold py-2.5 px-4 rounded-xl text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    id="submit-custom-quiz-btn"
                  >
                    {isGenerating ? (
                      <>
                        <Wand2 className="w-4 h-4 animate-spin" />
                        Generating Quest...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Custom Quiz
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-player"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white border-2 border-brand-sand rounded-[32px] shadow-sm p-6 md:p-8 space-y-6"
          >
            {/* Player Header */}
            <div className="flex items-center justify-between border-b border-brand-sand pb-4">
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setCurrentQuiz(null);
                    setSelectedLevel(null);
                  }}
                  className="text-xs font-bold text-brand-stone hover:text-brand-dark flex items-center gap-1 cursor-pointer bg-brand-sand/40 hover:bg-brand-sand px-3 py-1.5 rounded-full"
                  id="quit-quiz-btn"
                >
                  Quit Quest
                </button>
                <h3 className="text-xl font-bold font-serif text-brand-dark mt-2">{currentQuiz.title}</h3>
              </div>

              <div className="bg-brand-sage/15 text-brand-olive px-3.5 py-1.5 rounded-full text-xs font-bold border border-brand-sage/25">
                Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
              </div>
            </div>

            {!showResults ? (
              /* Quiz Gameplay Screen */
              <div className="space-y-6">
                {/* Question Block */}
                <div className="bg-brand-cream/35 p-6 rounded-[24px] border border-brand-sand space-y-2 relative overflow-hidden">
                  <div className="absolute right-4 top-4 text-brand-sand/55">
                    <HelpCircle className="w-16 h-16" />
                  </div>
                  <span className="text-xxs font-bold uppercase tracking-wider text-brand-olive">
                    Question Card
                  </span>
                  <h4 className="text-lg md:text-xl font-bold font-serif text-brand-dark leading-snug relative z-10">
                    {currentQuiz.questions[currentQuestionIndex].question}
                  </h4>
                </div>

                {/* Choices Block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {currentQuiz.questions[currentQuestionIndex].choices.map((choice, idx) => {
                    let btnClass = "bg-white border-2 border-brand-sand/65 hover:border-brand-olive hover:bg-brand-cream/15 text-brand-stone";
                    
                    if (isAnswered) {
                      const isCorrectChoice = idx === currentQuiz.questions[currentQuestionIndex].correctIndex;
                      const isSelectedChoice = idx === selectedAnswer;

                      if (isCorrectChoice) {
                        btnClass = "bg-brand-sage/15 border-brand-sage text-brand-dark font-serif font-bold";
                      } else if (isSelectedChoice) {
                        btnClass = "bg-brand-clay/15 border-brand-clay text-brand-clay font-bold";
                      } else {
                        btnClass = "bg-white border-brand-sand text-brand-stone/40 opacity-60";
                      }
                    } else if (selectedAnswer === idx) {
                      btnClass = "bg-brand-sand/20 border-brand-olive text-brand-dark font-bold";
                    }

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleSelectAnswer(idx)}
                        disabled={isAnswered}
                        whileHover={!isAnswered ? { scale: 1.01 } : {}}
                        whileTap={!isAnswered ? { scale: 0.99 } : {}}
                        className={`p-4 rounded-xl text-left text-sm md:text-base transition-all duration-200 flex items-center justify-between cursor-pointer ${btnClass}`}
                        id={`choice-btn-${idx}`}
                      >
                        <span className="flex gap-2 items-center">
                          <span className="w-6 h-6 rounded-full bg-brand-sand/40 flex items-center justify-center font-bold text-xs text-brand-stone">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {choice}
                        </span>

                        {isAnswered && idx === currentQuiz.questions[currentQuestionIndex].correctIndex && (
                          <CheckCircle2 className="w-5 h-5 text-brand-olive shrink-0" />
                        )}
                        {isAnswered && idx === selectedAnswer && idx !== currentQuiz.questions[currentQuestionIndex].correctIndex && (
                          <XCircle className="w-5 h-5 text-brand-clay shrink-0" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation Card (Appears after answering) */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-brand-sage/10 border border-brand-sage/25 p-5 rounded-2xl space-y-2"
                    >
                      <h5 className="font-bold text-brand-olive flex items-center gap-1.5 text-sm">
                        {selectedAnswer === currentQuiz.questions[currentQuestionIndex].correctIndex ? (
                          <>🎉 Woohoo! That's correct!</>
                        ) : (
                          <>💡 Let's Learn Together!</>
                        )}
                      </h5>
                      <p className="text-brand-stone text-xs md:text-sm leading-relaxed font-serif font-medium">
                        {currentQuiz.questions[currentQuestionIndex].explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit / Next Button */}
                <div className="flex justify-end pt-2">
                  {!isAnswered ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className="bg-brand-olive text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-xs hover:bg-brand-stone transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      id="submit-answer-btn"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="bg-brand-stone text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-xs hover:bg-brand-olive transition-all cursor-pointer flex items-center gap-1"
                      id="next-question-btn"
                    >
                      {currentQuestionIndex < currentQuiz.questions.length - 1 ? (
                        <>Next Question <ChevronRight className="w-4 h-4" /></>
                      ) : (
                        <>Show My Score Card</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Results Screen */
              <div className="text-center py-6 space-y-6 max-w-md mx-auto">
                <span className="text-6xl animate-bounce duration-1000 block">🏆</span>
                
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold font-serif text-brand-dark">Quest Completed!</h4>
                  <p className="text-sm text-brand-stone">
                    You answered <span className="font-bold text-brand-dark">{quizScore}</span> out of{" "}
                    <span className="font-bold text-brand-dark">{currentQuiz.questions.length}</span> questions correctly!
                  </p>
                </div>

                {renderStars(quizScore, currentQuiz.questions.length)}

                <div className="bg-brand-cream border border-brand-sand p-4 rounded-xl">
                  <p className="text-xs text-brand-stone font-bold font-serif">
                    {quizScore === currentQuiz.questions.length
                      ? "Incredible! You are a genuine Bible Hero Explorer! 🌟"
                      : quizScore >= 2
                      ? "Fantastic job! Keep reading stories to learn even more! 📚"
                      : "Good try, little star! Stories are a fun way to learn! Let's do it again! 🌈"}
                  </p>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      resetQuizState(currentQuiz);
                    }}
                    className="bg-brand-sand/40 text-brand-stone font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-brand-sand transition-all cursor-pointer"
                    id="retry-quiz-btn"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={() => {
                      setCurrentQuiz(null);
                      setSelectedLevel(null);
                    }}
                    className="bg-brand-olive text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-brand-stone transition-all cursor-pointer"
                    id="back-to-levels-btn"
                  >
                    Back to Quests
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
