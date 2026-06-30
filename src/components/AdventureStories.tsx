import React, { useState } from "react";
import { PRESET_STORIES } from "../data";
import { Story, Scene } from "../types";
import { BookOpen, Sparkles, ChevronLeft, ChevronRight, Volume2, Square, Wand2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AdventureStories() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Custom generator state
  const [isGenerating, setIsGenerating] = useState(false);
  const [childName, setChildName] = useState("");
  const [storySetting, setStorySetting] = useState("a glowing forest");
  const [moralValue, setMoralValue] = useState("sharing and kindness");
  const [genError, setGenError] = useState("");

  const handleSelectStory = (story: Story) => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setSelectedStory(story);
    setCurrentSceneIndex(0);
  };

  const handleNextScene = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    if (selectedStory && currentSceneIndex < selectedStory.scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    }
  };

  const handlePrevScene = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
    }
  };

  const speakCurrentScene = () => {
    if (!selectedStory) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const scene = selectedStory.scenes[currentSceneIndex];
    const textToSpeak = `${scene.title}. ${scene.text}`;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.9; // Friendly, paced reading
    utterance.pitch = 1.1; // Cheerful pitch
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleGenerateCustomStory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenError("");
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character: childName || "Leo",
          setting: storySetting,
          values: moralValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate custom story. Make sure your Gemini API key is configured.");
      }

      const data = await response.json();
      const customStory: Story = {
        id: `custom-${Date.now()}`,
        title: data.title || "Your Custom Adventure!",
        category: "Custom",
        emoji: "✨📖",
        description: `A unique Bible-inspired story generated especially for ${childName || "you"}!`,
        moral: data.moral || "Always follow love.",
        verse: data.verse || "Let all that you do be done in love. - 1 Corinthians 16:14",
        scenes: data.scenes.map((s: any, idx: number) => ({
          title: s.title || `Part ${idx + 1}`,
          text: s.text,
          illustrationPrompt: s.illustrationPrompt || "",
          fallbackImage: "✨🌟"
        }))
      };

      setSelectedStory(customStory);
      setCurrentSceneIndex(0);
    } catch (err: any) {
      console.error(err);
      setGenError(err.message || "Oops! Something went wrong while generating the story.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8" id="adventure-stories-root">
      <AnimatePresence mode="wait">
        {!selectedStory ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Header banner */}
            <div className="bg-brand-sand p-6 rounded-[32px] text-brand-dark shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-brand-sand/55">
              <div className="relative z-10 space-y-2 text-center md:text-left">
                <span className="bg-brand-olive/20 text-brand-stone font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                  📖 Adventure Time
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-brand-dark">
                  Grand Bible Adventures!
                </h2>
                <p className="text-sm md:text-base text-brand-stone max-w-lg font-medium">
                  Step inside the stories of courage, faith, and peace. Pick a preloaded adventure or build your own!
                </p>
              </div>
              <div className="text-6xl md:text-8xl select-none mt-4 md:mt-0 animate-bounce duration-1000">
                ⛵
              </div>
            </div>

            {/* List and Custom Builder Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Presets Column */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold text-brand-stone font-serif flex items-center gap-2">
                  <BookOpen className="text-brand-olive w-5 h-5" /> Preset Bible Stories
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PRESET_STORIES.map((story) => (
                    <motion.button
                      key={story.id}
                      onClick={() => handleSelectStory(story)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white border-2 border-brand-sand/60 hover:border-brand-olive text-left p-5 rounded-[24px] shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-48 cursor-pointer"
                      id={`story-btn-${story.id}`}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start w-full">
                          <span className="text-3xl">{story.emoji}</span>
                          <span className="text-xs font-bold text-brand-stone uppercase bg-brand-cream/60 px-2.5 py-1 rounded-md">
                            {story.category}
                          </span>
                        </div>
                        <h4 className="font-bold text-lg text-brand-dark font-serif line-clamp-1">{story.title}</h4>
                        <p className="text-xs text-brand-stone/80 line-clamp-2">{story.description}</p>
                      </div>
                      <div className="text-xs font-bold text-brand-olive flex items-center gap-1 mt-2">
                        Read Story <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Custom Story Creator Card */}
              <div className="bg-brand-cream/40 border-2 border-brand-sand p-6 rounded-[32px] space-y-4 shadow-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-brand-olive w-5 h-5" />
                  <h3 className="text-lg font-bold text-brand-dark font-serif">AI Story Maker</h3>
                </div>
                <p className="text-xs text-brand-stone font-medium">
                  Put yourself or a friend in a customized moral story! Gemini will craft a wonderful, safe adventure.
                </p>

                <form onSubmit={handleGenerateCustomStory} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-brand-stone mb-1">
                      Hero Name:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Leo, Chloe, or Noah"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full bg-white border border-brand-sand rounded-xl px-3 py-2 text-sm text-brand-dark focus:outline-hidden focus:ring-2 focus:ring-brand-olive"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-stone mb-1">
                      Adventure Setting:
                    </label>
                    <select
                      value={storySetting}
                      onChange={(e) => setStorySetting(e.target.value)}
                      className="w-full bg-white border border-brand-sand rounded-xl px-3 py-2 text-sm text-brand-dark focus:outline-hidden focus:ring-2 focus:ring-brand-olive"
                    >
                      <option value="a beautiful grassy valley">Beautiful Grassy Valley 🌳</option>
                      <option value="a glowing ancient forest">Glowing Ancient Forest 🌲</option>
                      <option value="a sandy seashore with crabs">Sandy Seashore with Crabs 🦀</option>
                      <option value="a majestic golden castle">Majestic Golden Castle 🏰</option>
                      <option value="a modern sunny playground">Modern Playground 🎡</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-stone mb-1">
                      Core Moral Value:
                    </label>
                    <select
                      value={moralValue}
                      onChange={(e) => setMoralValue(e.target.value)}
                      className="w-full bg-white border border-brand-sand rounded-xl px-3 py-2 text-sm text-brand-dark focus:outline-hidden focus:ring-2 focus:ring-brand-olive"
                    >
                      <option value="sharing and caring for friends">Sharing and Caring 🤝</option>
                      <option value="courage to do what is right">Courage & Bravery 💪</option>
                      <option value="kindness to stray animals">Kindness to Animals 🐱</option>
                      <option value="saying sorry and making peace">Forgiveness & Peace 🕊️</option>
                      <option value="trusting and listing to parents">Listening & Trusting ❤️</option>
                    </select>
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
                    className="w-full bg-brand-olive hover:bg-brand-stone text-white font-bold py-2.5 px-4 rounded-xl text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    id="generate-story-btn"
                  >
                    {isGenerating ? (
                      <>
                        <Wand2 className="w-4 h-4 animate-spin" />
                        Writing custom story...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Create My Story!
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="story-viewer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white border-2 border-brand-sand rounded-[32px] shadow-sm p-6 md:p-8 space-y-6 animate-fade-in"
          >
            {/* Viewer Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-brand-sand pb-4 gap-4">
              <div className="space-y-1">
                <button
                  onClick={() => {
                    stopSpeaking();
                    setSelectedStory(null);
                  }}
                  className="text-xs font-bold text-brand-stone hover:text-brand-dark flex items-center gap-1 cursor-pointer bg-brand-sand/55 hover:bg-brand-sand px-3 py-1.5 rounded-full transition-all"
                  id="back-stories-btn"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Adventures
                </button>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl">{selectedStory.emoji}</span>
                  <h2 className="text-2xl font-bold font-serif text-brand-dark">{selectedStory.title}</h2>
                </div>
              </div>

              {/* Speech Controls */}
              <div className="flex items-center gap-2 self-end md:self-auto">
                {isSpeaking ? (
                  <button
                    onClick={speakCurrentScene}
                    className="flex items-center gap-1 text-sm font-bold bg-brand-clay/15 text-brand-clay border-2 border-brand-clay/30 px-4 py-2 rounded-full cursor-pointer hover:bg-brand-clay/25 transition-all"
                  >
                    <Square className="w-4 h-4 fill-current" /> Stop Listening
                  </button>
                ) : (
                  <button
                    onClick={speakCurrentScene}
                    className="flex items-center gap-1 text-sm font-bold bg-brand-cream text-brand-stone border-2 border-brand-sand px-4 py-2 rounded-full cursor-pointer hover:bg-brand-sand transition-all animate-pulse"
                  >
                    <Volume2 className="w-4 h-4" /> Listen to Story
                  </button>
                )}
              </div>
            </div>

            {/* Main Stage */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              {/* Illustration Block */}
              <div className="md:col-span-2 bg-brand-cream/35 border-2 border-brand-sand rounded-[24px] h-64 md:h-80 flex flex-col items-center justify-center p-4 relative overflow-hidden shadow-inner">
                {/* Visual representation card */}
                <div className="text-8xl select-none animate-pulse">
                  {selectedStory.scenes[currentSceneIndex].fallbackImage}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-center bg-[#FDFBF7]/90 backdrop-blur-xs py-1.5 px-3 rounded-xl border border-brand-sand/60">
                  <p className="text-xxs text-brand-stone font-mono italic max-w-xs line-clamp-2">
                    Visual prompt: "{selectedStory.scenes[currentSceneIndex].illustrationPrompt}"
                  </p>
                </div>
              </div>

              {/* Narration Block */}
              <div className="md:col-span-3 space-y-6">
                <div className="space-y-2">
                  <span className="text-brand-olive font-bold text-sm font-serif tracking-wider uppercase">
                    {selectedStory.scenes[currentSceneIndex].title}
                  </span>
                  <p className="text-brand-dark text-lg md:text-xl leading-relaxed font-serif font-medium">
                    {selectedStory.scenes[currentSceneIndex].text}
                  </p>
                </div>

                {/* Progress dot indicators */}
                <div className="flex gap-2 justify-center md:justify-start">
                  {selectedStory.scenes.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        stopSpeaking();
                        setCurrentSceneIndex(idx);
                      }}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        idx === currentSceneIndex ? "w-8 bg-brand-olive" : "w-3 bg-brand-sand hover:bg-brand-olive/35"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation / Next and Previous */}
            <div className="flex items-center justify-between pt-4 border-t border-brand-sand">
              <button
                onClick={handlePrevScene}
                disabled={currentSceneIndex === 0}
                className="flex items-center gap-1 font-bold text-sm text-brand-stone hover:text-brand-dark disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer bg-brand-sand/30 hover:bg-brand-sand px-4 py-2.5 rounded-xl transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Part
              </button>

              {currentSceneIndex === selectedStory.scenes.length - 1 ? (
                <button
                  onClick={() => {
                    stopSpeaking();
                    setSelectedStory(null);
                  }}
                  className="flex items-center gap-1.5 font-bold text-sm bg-brand-sage text-white px-5 py-2.5 rounded-xl shadow-md cursor-pointer hover:bg-brand-olive transition-all"
                  id="finish-story-btn"
                >
                  Finished! Collect stars 🌟
                </button>
              ) : (
                <button
                  onClick={handleNextScene}
                  className="flex items-center gap-1 font-bold text-sm bg-brand-olive text-white px-5 py-2.5 rounded-xl shadow-md cursor-pointer hover:bg-brand-stone transition-all"
                >
                  Next Part <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Ending Moral and Verse (Displayed fully on the final page) */}
            {currentSceneIndex === selectedStory.scenes.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-brand-sage/15 border-2 border-brand-sage/30 p-6 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  <h4 className="font-bold text-brand-dark font-serif text-lg">Adventure Moral:</h4>
                </div>
                <p className="text-brand-stone font-medium text-sm md:text-base leading-relaxed font-serif">
                  "{selectedStory.moral}"
                </p>
                <div className="pt-2 border-t border-brand-sage/25 mt-2">
                  <p className="text-xxs font-bold text-brand-olive tracking-wider uppercase mb-1">Adventure Verse:</p>
                  <p className="text-xs text-brand-stone font-serif font-medium italic">"{selectedStory.verse}"</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
