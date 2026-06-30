import React, { useState } from "react";
import { ENHANCED_STORIES, EnhancedStory } from "../storiesData";
import { BookOpen, Volume2, Square, ChevronLeft, ChevronRight, Sparkles, Check, Play, Heart, Star, Award, MessageCircleQuestion } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface KingdomStoriesProps {
  onAddScore: (points: number) => void;
}

export default function KingdomStories({ onAddScore }: KingdomStoriesProps) {
  const [selectedStory, setSelectedStory] = useState<EnhancedStory | null>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [completedScenes, setCompletedScenes] = useState<Record<string, boolean>>({});

  const handleSelectStory = (story: EnhancedStory) => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setSelectedStory(story);
    setCurrentSceneIndex(0);
    setSelectedAnswer(null);
    setHasCheckedAnswer(false);
  };

  const handleNextScene = () => {
    stopSpeaking();
    if (selectedStory && currentSceneIndex < selectedStory.scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
      setSelectedAnswer(null);
      setHasCheckedAnswer(false);
    }
  };

  const handlePrevScene = () => {
    stopSpeaking();
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
      setSelectedAnswer(null);
      setHasCheckedAnswer(false);
    }
  };

  const speakText = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Child-friendly slow pace
    utterance.pitch = 1.15; // Bright, pleasant tone
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const speakCurrentScene = () => {
    if (!selectedStory) return;
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    const scene = selectedStory.scenes[currentSceneIndex];
    speakText(`${scene.title}. ${scene.text}`);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleChoiceSelect = (idx: number) => {
    if (hasCheckedAnswer) return;
    setSelectedAnswer(idx);
  };

  const checkSceneQuestion = () => {
    if (selectedAnswer === null || !selectedStory) return;
    const currentScene = selectedStory.scenes[currentSceneIndex];
    const correct = selectedAnswer === currentScene.question.answerIndex;
    setIsAnswerCorrect(correct);
    setHasCheckedAnswer(true);

    if (correct) {
      onAddScore(5); // 5 coins for correct scene questions
      // Mark scene as completed
      setCompletedScenes(prev => ({
        ...prev,
        [`${selectedStory.id}-${currentSceneIndex}`]: true
      }));
    }
  };

  const finishStoryAndCollectChallenge = () => {
    if (!selectedStory) return;
    onAddScore(selectedStory.storyChallenge.points);
    stopSpeaking();
    setSelectedStory(null);
  };

  return (
    <div className="space-y-6" id="kingdom-stories-root">
      <AnimatePresence mode="wait">
        {!selectedStory ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Header banner */}
            <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 p-6 rounded-[32px] text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-amber-300">
              <div className="relative z-10 space-y-2 text-center md:text-left">
                <span className="bg-white/20 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                  📖 Kingdom Adventure Time
                </span>
                <h2 className="text-3xl md:text-4xl font-black font-serif tracking-tight">
                  Bible Adventure Stories!
                </h2>
                <p className="text-sm md:text-base text-white/90 max-w-lg font-semibold">
                  Journey through tales of courage, faith, and peace. Read aloud, answer quests, and learn lessons of love!
                </p>
              </div>
              <div className="text-6xl md:text-8xl select-none mt-4 md:mt-0 animate-bounce duration-1000">
                ⛵
              </div>
            </div>

            {/* Stories Grid */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-stone font-serif flex items-center gap-2">
                <BookOpen className="text-orange-500 w-5 h-5" /> Tap a Story to Begin!
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ENHANCED_STORIES.map((story) => (
                  <motion.button
                    key={story.id}
                    onClick={() => handleSelectStory(story)}
                    whileHover={{ scale: 1.03, rotate: 0.5 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-white border-3 border-orange-100 hover:border-orange-400 text-left p-5 rounded-[28px] shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-56 cursor-pointer relative overflow-hidden"
                    id={`story-card-${story.id}`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50/50 rounded-full translate-x-8 -translate-y-8" />
                    <div className="space-y-2.5 relative z-10">
                      <div className="flex justify-between items-start w-full">
                        <span className="text-4xl filter drop-shadow-sm">{story.emoji}</span>
                        <span className="text-[10px] font-black text-orange-600 uppercase bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                          {story.category}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-lg text-brand-dark font-serif line-clamp-1 leading-tight">{story.title}</h4>
                      <p className="text-xs text-brand-stone font-semibold line-clamp-2">{story.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between w-full mt-4 relative z-10">
                      <div className="text-xs font-bold text-orange-500 flex items-center gap-1">
                        Read Story <ChevronRight className="w-4 h-4" />
                      </div>
                      <span className="text-xxs font-black bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md border border-amber-200">
                        +{story.storyChallenge.points} Coins
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="story-viewer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white border-3 border-orange-200 rounded-[36px] shadow-lg p-6 md:p-8 space-y-6"
          >
            {/* Viewer Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b-2 border-brand-sand pb-4 gap-4">
              <div className="space-y-1">
                <button
                  onClick={() => {
                    stopSpeaking();
                    setSelectedStory(null);
                  }}
                  className="text-xs font-bold text-brand-stone hover:text-brand-dark flex items-center gap-1 cursor-pointer bg-brand-sand/55 hover:bg-brand-sand px-3 py-1.5 rounded-full transition-all"
                  id="back-stories-btn"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Stories
                </button>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl filter drop-shadow-xs">{selectedStory.emoji}</span>
                  <h2 className="text-2xl font-black font-serif text-brand-dark">{selectedStory.title}</h2>
                </div>
              </div>

              {/* Speech Controls */}
              <div className="flex items-center gap-2 self-end md:self-auto">
                {isSpeaking ? (
                  <button
                    onClick={speakCurrentScene}
                    className="flex items-center gap-1 text-xs font-black bg-red-100 text-red-600 border-2 border-red-200 px-4 py-2.5 rounded-full cursor-pointer hover:bg-red-200 transition-all shadow-xs"
                  >
                    <Square className="w-4 h-4 fill-current mr-1" /> Stop Reading
                  </button>
                ) : (
                  <button
                    onClick={speakCurrentScene}
                    className="flex items-center gap-1 text-xs font-black bg-orange-100 text-orange-600 border-2 border-orange-200 px-4 py-2.5 rounded-full cursor-pointer hover:bg-orange-200 transition-all shadow-xs animate-pulse"
                  >
                    <Volume2 className="w-4 h-4 mr-1 animate-bounce" /> Read To Me
                  </button>
                )}
              </div>
            </div>

            {/* Main Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              {/* Illustration Block */}
              <div className="lg:col-span-2 bg-amber-50/50 border-3 border-orange-100 rounded-[28px] h-72 md:h-80 flex flex-col items-center justify-center p-4 relative overflow-hidden shadow-inner">
                {/* Visual representation card */}
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="text-8xl select-none filter drop-shadow-md"
                >
                  {selectedStory.scenes[currentSceneIndex].fallbackImage}
                </motion.div>
                <div className="absolute bottom-3 left-3 right-3 text-center bg-white/95 backdrop-blur-xs py-1.5 px-3 rounded-xl border border-orange-100">
                  <p className="text-xxs text-brand-stone font-mono italic max-w-xs mx-auto line-clamp-2 leading-tight">
                    "{selectedStory.scenes[currentSceneIndex].illustrationPrompt}"
                  </p>
                </div>
              </div>

              {/* Narration Block */}
              <div className="lg:col-span-3 space-y-6">
                <div className="space-y-3">
                  <span className="text-orange-500 font-black text-xs font-serif tracking-wider uppercase bg-orange-50 px-3 py-1 rounded-full border border-orange-100 inline-block">
                    {selectedStory.scenes[currentSceneIndex].title}
                  </span>
                  <p className="text-brand-dark text-lg md:text-xl leading-relaxed font-serif font-extrabold">
                    {selectedStory.scenes[currentSceneIndex].text}
                  </p>
                </div>

                {/* Question Quest for the current scene */}
                <div className="bg-amber-50/30 border-2 border-amber-200/60 p-5 rounded-2xl space-y-3 shadow-xs">
                  <div className="flex items-center gap-1.5 text-orange-600">
                    <MessageCircleQuestion className="w-5 h-5 shrink-0" />
                    <span className="font-extrabold text-xs uppercase tracking-wide">Scene Quiz Quest (+5 Coins)</span>
                  </div>
                  <h5 className="font-bold text-sm text-brand-dark">
                    {selectedStory.scenes[currentSceneIndex].question.q}
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {selectedStory.scenes[currentSceneIndex].question.choices.map((choice, idx) => {
                      const isSelected = selectedAnswer === idx;
                      const isCorrectAnswer = idx === selectedStory.scenes[currentSceneIndex].question.answerIndex;
                      
                      let btnClass = "bg-white border-2 border-brand-sand hover:border-orange-300 text-brand-dark";
                      if (isSelected) {
                        btnClass = "bg-orange-50 border-orange-400 text-orange-700 font-extrabold";
                      }
                      if (hasCheckedAnswer) {
                        if (isCorrectAnswer) {
                          btnClass = "bg-emerald-50 border-emerald-400 text-emerald-800 font-black";
                        } else if (isSelected) {
                          btnClass = "bg-red-50 border-red-300 text-red-700";
                        } else {
                          btnClass = "bg-white border-brand-sand opacity-50";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={hasCheckedAnswer}
                          onClick={() => handleChoiceSelect(idx)}
                          className={`w-full p-2.5 rounded-xl text-xs text-left cursor-pointer transition-all ${btnClass}`}
                        >
                          <span className="font-black mr-1">{String.fromCharCode(65 + idx)}.</span> {choice}
                        </button>
                      );
                    })}
                  </div>

                  {!hasCheckedAnswer ? (
                    <button
                      disabled={selectedAnswer === null}
                      onClick={checkSceneQuestion}
                      className="w-full mt-2 py-2 bg-orange-400 hover:bg-orange-500 disabled:opacity-40 text-white text-xs font-black rounded-xl cursor-pointer transition-all shadow-xs flex items-center justify-center gap-1"
                    >
                      <Check className="w-4 h-4" /> Check Answer
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-xl text-xs font-semibold ${
                        isAnswerCorrect ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                    >
                      {isAnswerCorrect ? (
                        <p className="flex items-center gap-1">
                          🎉 <strong>Great Job!</strong> You earned 5 Stars! {selectedStory.scenes[currentSceneIndex].question.explanation}
                        </p>
                      ) : (
                        <p>
                          😢 <strong>Not quite!</strong> The correct answer is: <strong>{selectedStory.scenes[currentSceneIndex].question.choices[selectedStory.scenes[currentSceneIndex].question.answerIndex]}</strong>. {selectedStory.scenes[currentSceneIndex].question.explanation}
                        </p>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-2 justify-center md:justify-start pt-2">
                  {selectedStory.scenes.map((_, idx) => {
                    const sceneDone = completedScenes[`${selectedStory.id}-${idx}`];
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          stopSpeaking();
                          setCurrentSceneIndex(idx);
                          setSelectedAnswer(null);
                          setHasCheckedAnswer(false);
                        }}
                        className={`h-3.5 rounded-full transition-all duration-300 relative ${
                          idx === currentSceneIndex ? "w-10 bg-orange-400" : "w-3.5 bg-brand-sand hover:bg-orange-200"
                        }`}
                      >
                        {sceneDone && (
                          <span className="absolute -top-1 right-0 text-[8px]">⭐</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigation / Next and Previous */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-brand-sand">
              <button
                onClick={handlePrevScene}
                disabled={currentSceneIndex === 0}
                className="flex items-center gap-1 font-black text-xs text-brand-stone hover:text-brand-dark disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer bg-brand-sand/30 hover:bg-brand-sand px-4 py-2.5 rounded-xl transition-all border border-brand-sand"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Part
              </button>

              {currentSceneIndex === selectedStory.scenes.length - 1 ? (
                <button
                  onClick={finishStoryAndCollectChallenge}
                  disabled={!hasCheckedAnswer}
                  className="flex items-center gap-1.5 font-black text-xs bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-md cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  id="finish-story-btn"
                >
                  <Sparkles className="w-4 h-4 mr-1 animate-spin" /> Finish Adventure & Earn Points!
                </button>
              ) : (
                <button
                  onClick={handleNextScene}
                  disabled={!hasCheckedAnswer}
                  className="flex items-center gap-1 font-black text-xs bg-orange-400 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl shadow-md cursor-pointer transition-all"
                >
                  Next Part <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Ending Moral, Prayer & Challenge (Displayed fully on the final page) */}
            {currentSceneIndex === selectedStory.scenes.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-orange-50/60 border-2 border-orange-200 p-6 rounded-3xl space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Moral & Prayer */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">💡</span>
                      <h4 className="font-black text-brand-dark font-serif text-base">Adventure Moral & Promise:</h4>
                    </div>
                    <p className="text-brand-stone font-semibold text-xs leading-relaxed font-serif bg-white p-3 rounded-xl border border-orange-100">
                      "{selectedStory.moral}"
                    </p>
                    <p className="text-xxs font-black text-orange-500 tracking-wider uppercase mb-1">Adventure Verse:</p>
                    <p className="text-xs text-brand-stone font-serif font-extrabold italic bg-white p-3 rounded-xl border border-orange-100">
                      "{selectedStory.verse}"
                    </p>
                  </div>

                  {/* Prayer & Challenge */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-red-500">
                      <Heart className="w-5 h-5 fill-current" />
                      <h4 className="font-black text-brand-dark font-serif text-base">Let's Pray Together</h4>
                    </div>
                    <p className="text-brand-dark font-extrabold text-xs leading-relaxed font-serif bg-red-50/40 p-3.5 rounded-xl border border-red-100 italic">
                      "{selectedStory.storyPrayer}"
                    </p>

                    <div className="bg-amber-100/50 border border-amber-300 p-4 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-amber-700 flex items-center gap-1">
                          <Award className="w-4 h-4" /> Kingdom Kid Challenge!
                        </span>
                        <span className="text-[10px] font-black bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
                          +{selectedStory.storyChallenge.points} Coins
                        </span>
                      </div>
                      <h6 className="font-extrabold text-xs text-brand-dark">{selectedStory.storyChallenge.title}</h6>
                      <p className="text-xxs text-brand-stone font-bold leading-relaxed">{selectedStory.storyChallenge.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
