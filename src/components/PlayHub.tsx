import React, { useState, useEffect } from "react";
import { MEMORY_VERSES, PRESET_QUIZZES } from "../data";
import { MemoryVerse, Quiz } from "../types";
import { Shield, Gamepad2, Award, Star, Trophy, ArrowRight, Check, Volume2, HelpCircle, ShieldAlert, Sparkles, RefreshCcw, Timer, Users, School } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PlayHubProps {
  onAddScore: (points: number) => void;
  collectedVerses: string[];
  onCollectVerse: (ref: string) => void;
}

type PlayMode = "verse" | "quiz";
type VerseSubGame = "puzzle" | "missing" | "race" | "voice";
type LeaderboardTab = "weekly" | "church" | "school";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  score: number;
}

const LEADERBOARDS: Record<LeaderboardTab, LeaderboardEntry[]> = {
  weekly: [
    { rank: 1, name: "Leo Star", avatar: "🦁", score: 280 },
    { rank: 2, name: "Chloe Joy", avatar: "🦊", score: 240 },
    { rank: 3, name: "You (Kingdom Kid)", avatar: "🧒", score: 180 },
    { rank: 4, name: "David Brave", avatar: "🐏", score: 150 },
    { rank: 5, name: "Sarah Grace", avatar: "🐑", score: 110 }
  ],
  church: [
    { rank: 1, name: "Faith Chapel Kids", avatar: "⛪", score: 1450 },
    { rank: 2, name: "Grace Fellowship Juniors", avatar: "🕊️", score: 1220 },
    { rank: 3, name: "Cross and Crown Team (You)", avatar: "👑", score: 980 },
    { rank: 4, name: "St. John's Youth", avatar: "🔔", score: 870 },
    { rank: 5, name: "Zion Kingdom Stars", avatar: "⭐", score: 620 }
  ],
  school: [
    { rank: 1, name: "Zion Academy Grade 2", avatar: "🎒", score: 940 },
    { rank: 2, name: "Emmanuel Elementary", avatar: "🏫", score: 850 },
    { rank: 3, name: "You (Cross & Crown)", avatar: "🧒", score: 720 },
    { rank: 4, name: "Saint Mary's Grade 1", avatar: "🍎", score: 610 },
    { rank: 5, name: "Hope Christian Prep", avatar: "✏️", score: 530 }
  ]
};

export default function PlayHub({ onAddScore, collectedVerses, onCollectVerse }: PlayHubProps) {
  const [activeMode, setActiveMode] = useState<PlayMode>("verse");
  
  // Verse Master states
  const [selectedVerse, setSelectedVerse] = useState<MemoryVerse>(MEMORY_VERSES[0]);
  const [verseGame, setVerseGame] = useState<VerseSubGame>("puzzle");
  
  // Game 1: Word Scramble Puzzle states
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [assembledWords, setAssembledWords] = useState<string[]>([]);
  const [puzzleWon, setPuzzleWon] = useState(false);
  const [puzzleError, setPuzzleError] = useState(false);

  // Game 2: Missing Word states
  const [missingWordIndex, setMissingWordIndex] = useState(0);
  const [missingChoices, setMissingChoices] = useState<string[]>([]);
  const [selectedMissingChoice, setSelectedMissingChoice] = useState<string | null>(null);
  const [missingCheckState, setMissingCheckState] = useState<"idle" | "correct" | "incorrect">("idle");

  // Game 3: Verse Race states
  const [raceActive, setRaceActive] = useState(false);
  const [raceTimeLeft, setRaceTimeLeft] = useState(15);
  const [raceWordsOrder, setRaceWordsOrder] = useState<string[]>([]);
  const [raceAssembled, setRaceAssembled] = useState<string[]>([]);
  const [raceScore, setRaceScore] = useState<"idle" | "won" | "lost">("idle");

  // Game 4: Voice Reading Simulation states
  const [micActive, setMicActive] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);

  // Quiz states
  const [selectedQuizKey, setSelectedQuizKey] = useState<string>("beginner");
  const [quizActive, setQuizActive] = useState(false);
  const [quizQuestionIdx, setQuizQuestionIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarsEarned, setQuizStarsEarned] = useState(0);

  // Leaderboard states
  const [leaderboardTab, setLeaderboardTab] = useState<LeaderboardTab>("weekly");

  // Load and Scramble words for Word Scramble
  useEffect(() => {
    initScramble(selectedVerse);
    initMissingWord(selectedVerse);
    resetRace();
    setMicActive(false);
    setPronunciationScore(null);
  }, [selectedVerse, verseGame]);

  const initScramble = (verseObj: MemoryVerse) => {
    const clean = verseObj.verse.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(/\s+/);
    const scrambled = [...clean].sort(() => Math.random() - 0.5);
    if (scrambled.join(" ") === clean.join(" ") && clean.length > 1) {
      scrambled.reverse();
    }
    setScrambledWords(scrambled);
    setAssembledWords([]);
    setPuzzleWon(false);
    setPuzzleError(false);
  };

  const initMissingWord = (verseObj: MemoryVerse) => {
    const clean = verseObj.verse.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(/\s+/);
    const randomIdx = Math.floor(Math.random() * clean.length);
    setMissingWordIndex(randomIdx);
    
    // Make alternative options
    const targetWord = clean[randomIdx];
    const alternativePool = ["love", "heart", "Lord", "light", "grace", "shepherd", "strong", "truth", "hope", "peace"];
    const filteredAlternatives = alternativePool.filter(w => w.toLowerCase() !== targetWord.toLowerCase());
    
    const choices = [targetWord];
    while (choices.length < 3 && filteredAlternatives.length > 0) {
      const randAlt = filteredAlternatives.splice(Math.floor(Math.random() * filteredAlternatives.length), 1)[0];
      choices.push(randAlt);
    }
    setMissingChoices(choices.sort(() => Math.random() - 0.5));
    setSelectedMissingChoice(null);
    setMissingCheckState("idle");
  };

  // Puzzle Actions
  const handleScrambleWordTap = (word: string, fromAssembled: boolean) => {
    if (puzzleWon) return;
    setPuzzleError(false);
    if (fromAssembled) {
      setAssembledWords(prev => prev.filter(w => w !== word));
      setScrambledWords(prev => [...prev, word]);
    } else {
      setScrambledWords(prev => prev.filter(w => w !== word));
      setAssembledWords(prev => [...prev, word]);
    }
  };

  const checkScrambleAnswer = () => {
    const cleanTarget = selectedVerse.verse.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(/\s+/);
    if (assembledWords.join(" ") === cleanTarget.join(" ")) {
      setPuzzleWon(true);
      onAddScore(selectedVerse.points);
      onCollectVerse(selectedVerse.reference);
    } else {
      setPuzzleError(true);
    }
  };

  // Missing Word Actions
  const handleMissingChoiceSelect = (choice: string) => {
    if (missingCheckState !== "idle") return;
    setSelectedMissingChoice(choice);
  };

  const checkMissingWord = () => {
    if (!selectedMissingChoice) return;
    const clean = selectedVerse.verse.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(/\s+/);
    const correctWord = clean[missingWordIndex];
    if (selectedMissingChoice.toLowerCase() === correctWord.toLowerCase()) {
      setMissingCheckState("correct");
      onAddScore(selectedVerse.points);
      onCollectVerse(selectedVerse.reference);
    } else {
      setMissingCheckState("incorrect");
    }
  };

  // Race Actions
  const startRace = () => {
    const clean = selectedVerse.verse.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(/\s+/);
    setRaceWordsOrder([...clean]);
    setRaceAssembled([]);
    setRaceTimeLeft(12 + clean.length);
    setRaceActive(true);
    setRaceScore("idle");
  };

  const resetRace = () => {
    setRaceActive(false);
    setRaceAssembled([]);
    setRaceScore("idle");
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (raceActive && raceTimeLeft > 0 && raceScore === "idle") {
      timer = setTimeout(() => setRaceTimeLeft(prev => prev - 1), 1000);
    } else if (raceActive && raceTimeLeft === 0 && raceScore === "idle") {
      setRaceScore("lost");
    }
    return () => clearTimeout(timer);
  }, [raceActive, raceTimeLeft, raceScore]);

  const handleRaceWordClick = (word: string) => {
    if (!raceActive || raceScore !== "idle") return;
    const currentTargetIndex = raceAssembled.length;
    const correctWord = raceWordsOrder[currentTargetIndex];

    if (word.toLowerCase() === correctWord.toLowerCase()) {
      const newAssembled = [...raceAssembled, word];
      setRaceAssembled(newAssembled);
      if (newAssembled.length === raceWordsOrder.length) {
        setRaceScore("won");
        onAddScore(selectedVerse.points + 10); // Bonus for fast race!
        onCollectVerse(selectedVerse.reference);
      }
    } else {
      setRaceScore("lost");
    }
  };

  // Voice Reading Simulator
  const handleSimulateVoice = () => {
    setMicActive(true);
    setPronunciationScore(null);
    speakText(selectedVerse.verse);

    setTimeout(() => {
      setMicActive(false);
      setPronunciationScore(95); // 95% Match rating
      onAddScore(selectedVerse.points);
      onCollectVerse(selectedVerse.reference);
    }, 2500);
  };

  const speakText = (text: string) => {
    window.speechSynthesis.cancel();
    const ut = new SpeechSynthesisUtterance(text);
    ut.rate = 0.95;
    ut.pitch = 1.1;
    window.speechSynthesis.speak(ut);
  };

  // Quiz Quest Actions
  const startQuiz = (key: string) => {
    setSelectedQuizKey(key);
    setQuizActive(true);
    setQuizQuestionIdx(0);
    setQuizAnswers([]);
    setQuizFinished(false);
    setQuizStarsEarned(0);
  };

  const handleQuizAnswer = (choiceIdx: number) => {
    const currentQuiz = PRESET_QUIZZES[selectedQuizKey];
    const question = currentQuiz.questions[quizQuestionIdx];
    const isCorrect = choiceIdx === question.correctIndex;

    const updatedAnswers = [...quizAnswers, choiceIdx];
    setQuizAnswers(updatedAnswers);

    if (isCorrect) {
      setQuizStarsEarned(prev => prev + 1);
    }

    if (quizQuestionIdx < currentQuiz.questions.length - 1) {
      setTimeout(() => setQuizQuestionIdx(prev => prev + 1), 1200);
    } else {
      setTimeout(() => {
        setQuizFinished(true);
        // Calculate stars/score reward
        const scoreEarned = (isCorrect ? quizStarsEarned + 1 : quizStarsEarned) * 15;
        onAddScore(scoreEarned);
      }, 1200);
    }
  };

  return (
    <div className="space-y-6" id="playhub-root">
      {/* Toggles */}
      <div className="flex justify-center">
        <div className="bg-amber-100/50 p-1 rounded-2xl flex items-center border border-amber-300">
          <button
            onClick={() => setActiveMode("verse")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 ${
              activeMode === "verse" ? "bg-amber-400 text-white shadow-xs" : "text-amber-800"
            }`}
          >
            <Shield className="w-4 h-4" /> 🛡️ Verse Word Games
          </button>
          <button
            onClick={() => setActiveMode("quiz")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 ${
              activeMode === "quiz" ? "bg-amber-400 text-white shadow-xs" : "text-amber-800"
            }`}
          >
            <Gamepad2 className="w-4 h-4" /> 🎮 Bible Quiz Quests
          </button>
        </div>
      </div>

      {activeMode === "verse" ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Shelf */}
          <div className="lg:col-span-1 bg-white border-3 border-amber-100 rounded-3xl p-5 space-y-4 h-fit">
            <h4 className="font-extrabold text-sm text-amber-700 flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> Select Verse
            </h4>
            <div className="space-y-2">
              {MEMORY_VERSES.map((verse) => {
                const isSel = verse.reference === selectedVerse.reference;
                const isDone = collectedVerses.includes(verse.reference);
                return (
                  <button
                    key={verse.reference}
                    onClick={() => setSelectedVerse(verse)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSel ? "bg-amber-50 border-amber-300" : "bg-white border-brand-sand hover:border-amber-200"
                    }`}
                  >
                    <div className="truncate">
                      <p className="text-xxs font-black text-amber-800">{verse.reference}</p>
                      <p className="text-[10px] text-brand-stone font-semibold truncate">"{verse.verse}"</p>
                    </div>
                    {isDone && <Check className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Game Canvas */}
          <div className="lg:col-span-3 bg-white border-3 border-amber-200 rounded-[32px] p-6 space-y-6">
            {/* Sub Mode select */}
            <div className="border-b border-brand-sand pb-4 flex flex-wrap gap-2 justify-center md:justify-start">
              {(["puzzle", "missing", "race", "voice"] as VerseSubGame[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setVerseGame(mode)}
                  className={`px-3.5 py-1.5 rounded-lg text-xxs font-black border transition-all cursor-pointer ${
                    verseGame === mode
                      ? "bg-amber-400 text-white border-amber-400"
                      : "bg-amber-50 text-amber-800 border-amber-200 hover:border-amber-300"
                  }`}
                >
                  {mode === "puzzle" && "🧩 Word Puzzle"}
                  {mode === "missing" && "❓ Missing Words"}
                  {mode === "race" && "⚡ Verse Race"}
                  {mode === "voice" && "🎙️ Voice Reading"}
                </button>
              ))}
            </div>

            {/* Selected Verse Display */}
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 text-center space-y-1">
              <span className="text-[10px] font-black text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block">
                Verse Target: {selectedVerse.reference}
              </span>
              <p className="text-sm font-extrabold font-serif text-brand-dark">
                "{selectedVerse.verse}"
              </p>
            </div>

            {/* Game Canvas Modules */}
            <AnimatePresence mode="wait">
              {verseGame === "puzzle" && (
                <motion.div key="puzzle" className="space-y-5">
                  <div className="space-y-2">
                    <h5 className="font-bold text-xs text-brand-stone">Tap the words in the correct order!</h5>
                    
                    {/* Assembled Slots */}
                    <div className="bg-brand-sand/20 min-h-[64px] p-4 rounded-xl border border-dashed border-brand-sand flex flex-wrap gap-2 items-center">
                      {assembledWords.length === 0 && (
                        <p className="text-xxs text-brand-stone font-bold italic mx-auto">Tap scrambled words below to fill the slots...</p>
                      )}
                      {assembledWords.map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleScrambleWordTap(word, true)}
                          className="bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-black px-3 py-1.5 rounded-lg border border-amber-300 transition-all cursor-pointer"
                        >
                          {word}
                        </button>
                      ))}
                    </div>

                    {/* Scrambled Pool */}
                    <div className="flex flex-wrap gap-2 p-3 bg-amber-50/20 border border-amber-100 rounded-xl">
                      {scrambledWords.map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleScrambleWordTap(word, false)}
                          className="bg-white hover:bg-amber-50 text-brand-dark text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-brand-sand transition-all cursor-pointer"
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>

                  {puzzleError && (
                    <p className="text-red-500 font-bold text-xxs flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> Oops! Words are not in correct order yet. Try rearranging!
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => initScramble(selectedVerse)}
                      className="bg-brand-sand hover:bg-brand-stone text-brand-stone hover:text-white px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-colors"
                    >
                      <RefreshCcw className="w-4 h-4 inline mr-1" /> Reset
                    </button>
                    {!puzzleWon ? (
                      <button
                        onClick={checkScrambleAnswer}
                        disabled={scrambledWords.length > 0}
                        className="bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all"
                      >
                        Check Puzzle
                      </button>
                    ) : (
                      <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-xl flex items-center gap-1.5 text-emerald-800 text-xs font-black">
                        🎉 Splendid Job! You assembled the verse and earned {selectedVerse.points} Coins!
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {verseGame === "missing" && (
                <motion.div key="missing" className="space-y-4">
                  <h5 className="font-bold text-xs text-brand-stone">What word is missing in this spot?</h5>
                  
                  {/* Sentential preview with a hole */}
                  <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 text-center">
                    <p className="text-base font-bold font-serif text-brand-dark leading-relaxed">
                      "
                      {selectedVerse.verse.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(/\s+/).map((w, idx) => (
                        <span key={idx}>
                          {idx === missingWordIndex ? (
                            <span className="inline-block w-24 border-b-3 border-amber-400 bg-amber-100 text-amber-700 text-xs px-2 py-0.5 mx-1 font-black rounded-lg">
                              {selectedMissingChoice || "???"}
                            </span>
                          ) : (
                            w
                          )}
                          {" "}
                        </span>
                      ))}
                      "
                    </p>
                  </div>

                  {/* Multiple Choices */}
                  <div className="grid grid-cols-3 gap-3">
                    {missingChoices.map((choice, idx) => {
                      const isSel = selectedMissingChoice === choice;
                      return (
                        <button
                          key={idx}
                          disabled={missingCheckState !== "idle"}
                          onClick={() => handleMissingChoiceSelect(choice)}
                          className={`p-3.5 rounded-xl text-xs font-black border-2 transition-all cursor-pointer text-center ${
                            isSel
                              ? "bg-amber-100 border-amber-400 text-amber-800 shadow-sm"
                              : "bg-white border-brand-sand hover:border-amber-200 text-brand-dark"
                          }`}
                        >
                          {choice}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {missingCheckState === "idle" ? (
                      <button
                        onClick={checkMissingWord}
                        disabled={!selectedMissingChoice}
                        className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer transition-all"
                      >
                        Check Word
                      </button>
                    ) : missingCheckState === "correct" ? (
                      <div className="w-full p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-black text-center">
                        🎉 Correct! You locked this shield in place and earned {selectedVerse.points} Coins!
                      </div>
                    ) : (
                      <div className="w-full flex gap-2">
                        <button
                          onClick={() => initMissingWord(selectedVerse)}
                          className="flex-1 py-2.5 bg-red-100 text-red-700 border border-red-300 font-black text-xs rounded-xl cursor-pointer"
                        >
                          ❌ Not Correct! Tap to Try Again
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {verseGame === "race" && (
                <motion.div key="race" className="space-y-4">
                  {!raceActive ? (
                    <div className="text-center py-6 space-y-3">
                      <h5 className="font-extrabold text-sm text-brand-stone">Tap the words as fast as you can in correct order under the ticking clock!</h5>
                      <button
                        onClick={startRace}
                        className="bg-amber-400 hover:bg-amber-500 text-white font-black text-xs px-5 py-3 rounded-xl cursor-pointer shadow-xs"
                      >
                        Start Verse Race! ⏰💨
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Race Dashboard */}
                      <div className="flex justify-between items-center bg-amber-50 p-3 rounded-xl border border-amber-200">
                        <span className="text-xxs font-black text-amber-700 flex items-center gap-1">
                          <Timer className="w-3.5 h-3.5 animate-spin" /> Time Left: {raceTimeLeft}s
                        </span>
                        <span className="text-xxs font-black text-amber-700">
                          Assembled: {raceAssembled.length} / {raceWordsOrder.length}
                        </span>
                      </div>

                      {/* Assembled readout */}
                      <div className="bg-brand-sand/15 p-4 rounded-xl border border-dashed border-brand-sand min-h-[48px] flex flex-wrap gap-2 text-xs font-bold text-amber-800">
                        {raceAssembled.map((w, idx) => (
                          <span key={idx}>{w}</span>
                        ))}
                      </div>

                      {/* Scrambled button pool */}
                      {raceScore === "idle" && (
                        <div className="flex flex-wrap gap-2 p-3 bg-amber-50/20 border border-amber-100 rounded-xl">
                          {[...raceWordsOrder].sort(() => 0.5 - Math.random()).map((word, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleRaceWordClick(word)}
                              className="bg-white hover:bg-amber-50 text-brand-dark text-xs font-bold px-3 py-2 rounded-xl border-2 border-brand-sand transition-all cursor-pointer"
                            >
                              {word}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Race Results */}
                      {raceScore === "won" && (
                        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-black text-center">
                          🏆 Super Speed! You won the race and earned {selectedVerse.points + 10} Coins!
                        </div>
                      )}
                      {raceScore === "lost" && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs font-black text-center space-y-2">
                          <p>⏰ Time ran out or incorrect sequence tapped!</p>
                          <button
                            onClick={startRace}
                            className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-xxs font-black cursor-pointer"
                          >
                            Try Race Again
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {verseGame === "voice" && (
                <motion.div key="voice" className="space-y-4">
                  <h5 className="font-bold text-xs text-brand-stone">Speak the verse into your microphone!</h5>
                  
                  <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 text-center space-y-4">
                    <p className="text-sm font-extrabold font-serif text-brand-dark italic">
                      "{selectedVerse.verse}"
                    </p>

                    <button
                      onClick={handleSimulateVoice}
                      disabled={micActive}
                      className={`p-5 rounded-full shadow-lg text-white font-black text-xs transition-all cursor-pointer ${
                        micActive ? "bg-red-500 animate-ping" : "bg-amber-400 hover:bg-amber-500"
                      }`}
                    >
                      {micActive ? "🎤 Listening..." : "🎤 Click to Speak"}
                    </button>
                  </div>

                  {pronunciationScore && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1"
                    >
                      <h6 className="font-extrabold text-xs text-emerald-800">🎉 Excellent Pronunciation Rating: {pronunciationScore}%!</h6>
                      <p className="text-xxs text-emerald-700">You earned {selectedVerse.points} Coins for reading the verse aloud!</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quiz main panel */}
          <div className="lg:col-span-3 bg-white border-3 border-amber-200 rounded-[32px] p-6 space-y-6">
            {!quizActive ? (
              <div className="space-y-6">
                {/* Banner inside */}
                <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-black text-brand-dark font-serif text-base">Test Your Bible Knowledge!</h4>
                    <p className="text-xxs text-brand-stone font-semibold">Take dynamic quizzes. Rise up the ranks from Beginner to Champion!</p>
                  </div>
                  <span className="text-4xl animate-bounce">👑🏆</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(PRESET_QUIZZES).map((levelKey) => {
                    const level = PRESET_QUIZZES[levelKey];
                    return (
                      <div
                        key={levelKey}
                        className="bg-white border-2 border-brand-sand rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400 transition-all shadow-xs"
                      >
                        <div className="space-y-1">
                          <span className="text-xxs font-black text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full capitalize">
                            {levelKey} Level
                          </span>
                          <h5 className="font-bold text-sm text-brand-dark font-serif">{level.title}</h5>
                          <p className="text-[10px] text-brand-stone font-semibold">3 interactive multiple-choice questions.</p>
                        </div>
                        <button
                          onClick={() => startQuiz(levelKey)}
                          className="mt-4 bg-amber-400 hover:bg-amber-500 text-white text-xxs font-black py-2 rounded-xl cursor-pointer shadow-xs transition-colors"
                        >
                          Start Quest
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-brand-sand pb-4">
                  <span className="text-xxs font-black text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full">
                    {PRESET_QUIZZES[selectedQuizKey].title}
                  </span>
                  <button
                    onClick={() => setQuizActive(false)}
                    className="text-xxs text-brand-stone font-bold hover:text-brand-dark bg-brand-sand/30 px-3 py-1 rounded-lg"
                  >
                    Quit Quiz
                  </button>
                </div>

                {!quizFinished ? (
                  <div className="space-y-4">
                    {/* Progress */}
                    <div className="flex gap-2">
                      {PRESET_QUIZZES[selectedQuizKey].questions.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 rounded-full flex-1 transition-all ${
                            idx <= quizQuestionIdx ? "bg-amber-400" : "bg-brand-sand"
                          }`}
                        />
                      ))}
                    </div>

                    <h5 className="font-black text-sm md:text-base text-brand-dark font-serif">
                      {PRESET_QUIZZES[selectedQuizKey].questions[quizQuestionIdx].question}
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {PRESET_QUIZZES[selectedQuizKey].questions[quizQuestionIdx].choices.map((choice, idx) => {
                        const hasAns = quizAnswers[quizQuestionIdx] !== undefined;
                        const isChosen = quizAnswers[quizQuestionIdx] === idx;
                        const isCorrectAns = idx === PRESET_QUIZZES[selectedQuizKey].questions[quizQuestionIdx].correctIndex;

                        let btnStyle = "bg-white border-2 border-brand-sand hover:border-amber-300 text-brand-dark";
                        if (hasAns) {
                          if (isCorrectAns) {
                            btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-800 font-extrabold";
                          } else if (isChosen) {
                            btnStyle = "bg-red-50 border-red-300 text-red-700";
                          } else {
                            btnStyle = "bg-white border-brand-sand opacity-50";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={hasAns}
                            onClick={() => handleQuizAnswer(idx)}
                            className={`p-3.5 rounded-xl text-xs text-left cursor-pointer transition-all ${btnStyle}`}
                          >
                            <span className="font-black mr-1">{String.fromCharCode(65 + idx)}.</span> {choice}
                          </button>
                        );
                      })}
                    </div>

                    {quizAnswers[quizQuestionIdx] !== undefined && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xxs font-semibold text-amber-900"
                      >
                        {quizAnswers[quizQuestionIdx] === PRESET_QUIZZES[selectedQuizKey].questions[quizQuestionIdx].correctIndex ? (
                          <p>🎉 Correct! {PRESET_QUIZZES[selectedQuizKey].questions[quizQuestionIdx].explanation}</p>
                        ) : (
                          <p>❌ Not quite! {PRESET_QUIZZES[selectedQuizKey].questions[quizQuestionIdx].explanation}</p>
                        )}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 space-y-4">
                    <h5 className="font-black text-lg text-brand-dark font-serif">Quest Completed! 🎉</h5>
                    <div className="flex justify-center gap-1.5 text-3xl">
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-10 h-10 ${
                            idx < quizStarsEarned ? "fill-amber-400 text-amber-400" : "text-brand-sand"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-brand-stone font-semibold">
                      You got {quizStarsEarned} out of 3 questions correct! You earned {quizStarsEarned * 15} Stars & Coins!
                    </p>
                    <button
                      onClick={() => setQuizActive(false)}
                      className="bg-amber-400 hover:bg-amber-500 text-white font-black text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                    >
                      Collect Rewards
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Leaderboards */}
          <div className="lg:col-span-1 bg-white border-3 border-amber-100 rounded-3xl p-5 space-y-4 h-fit">
            <h4 className="font-extrabold text-sm text-amber-700 flex items-center gap-1.5 border-b border-brand-sand pb-3">
              <Trophy className="w-4 h-4 text-amber-500" /> Leaderboards
            </h4>

            {/* Selector */}
            <div className="grid grid-cols-3 gap-1 bg-amber-50 p-1 rounded-xl">
              {(["weekly", "church", "school"] as LeaderboardTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setLeaderboardTab(tab)}
                  className={`py-1 rounded-lg text-[9px] font-black transition-all capitalize cursor-pointer ${
                    leaderboardTab === tab ? "bg-amber-400 text-white" : "text-amber-800 hover:bg-amber-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-2 pt-1">
              {LEADERBOARDS[leaderboardTab].map((entry) => (
                <div
                  key={entry.name}
                  className={`flex items-center justify-between p-2 rounded-xl text-xxs font-semibold border ${
                    entry.name.includes("You")
                      ? "bg-amber-50 border-amber-300"
                      : "bg-white border-brand-sand/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-black text-brand-stone/60">{entry.rank}.</span>
                    <span className="text-base">{entry.avatar}</span>
                    <span className="text-brand-dark text-[11px] font-bold truncate max-w-[100px]">{entry.name}</span>
                  </div>
                  <span className="font-black text-amber-600">{entry.score} ⭐</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
