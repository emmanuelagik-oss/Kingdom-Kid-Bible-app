import React, { useState } from "react";
import { Play, Tv, Sparkles, Star, Award, RotateCcw, Volume2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Video {
  id: string;
  title: string;
  heroName: string;
  duration: string;
  points: number;
  thumbnail: string;
  description: string;
  scenes: Array<{
    narrative: string;
    subtitles: string;
    emoji: string;
    visualColor: string;
  }>;
}

const VIDEOS: Video[] = [
  {
    id: "david",
    title: "David: The Giant-Slayer & Shepherd Hero",
    heroName: "David",
    duration: "2:30",
    points: 15,
    thumbnail: "🎯🐑🛡️",
    description: "Watch how a small shepherd boy with absolute faith stood up against the terrifying giant Goliath!",
    scenes: [
      { narrative: "In a beautiful grassy valley, young David played his sweet harp and watched his fluffy sheep.", subtitles: "[Cheerful Music] David: 'God is my shepherd, I have everything I need!'", emoji: "🐑🎶🌳", visualColor: "bg-emerald-50" },
      { narrative: "Suddenly, a giant named Goliath over nine feet tall stepped out of the hills, making the entire army shake with fear!", subtitles: "Goliath: 'Is there anyone brave enough to fight me?'", emoji: "🧔🏽‍♂️🛡️💥", visualColor: "bg-amber-50" },
      { narrative: "With five smooth stones and his trusty slingshot, David ran forward with absolute courage. He knew God was on his side!", subtitles: "David: 'You come with a sword, but I come in the name of the Lord!'", emoji: "🎯🪨✨", visualColor: "bg-sky-50" },
      { narrative: "Whiz! The stone flew through the air. The giant fell down! Perfect peace and victory fell upon the country.", subtitles: "[Triumphant Brass Fanfare] The soldiers cheer: 'Hooray for David! Hooray for God!'", emoji: "👑🏆🌟", visualColor: "bg-purple-50" }
    ]
  },
  {
    id: "elijah",
    title: "Elijah: The Fire & Chariot Prophet",
    heroName: "Elijah",
    duration: "3:10",
    points: 20,
    thumbnail: "🔥☁️✨",
    description: "Witness the amazing showdown on Mount Carmel and the spectacular chariots of fire!",
    scenes: [
      { narrative: "Prophet Elijah stood alone against 450 silent false prophets. He built a wet stone altar.", subtitles: "Elijah: 'Let the God who answers with real fire be the true Lord of all!'", emoji: "⛰️🪵💧", visualColor: "bg-slate-100" },
      { narrative: "Elijah prayed a simple, humble prayer. Instantly, a magnificent blaze of golden fire fell from heaven!", subtitles: "[Whoosh of Fire] The crowd gasps: 'The Lord, He is God! The Lord, He is God!'", emoji: "🔥🌩️🙌", visualColor: "bg-amber-100" },
      { narrative: "Elijah traveled the land doing great wonders. When his mission was complete, a whirlwind appeared.", subtitles: "Elijah looks up: 'God's glory is here! See the glowing path!'", emoji: "🌪️✨⛅", visualColor: "bg-sky-50" },
      { narrative: "A spectacular chariot made of bright golden fire carried Elijah up into the starry clouds!", subtitles: "[Majestic Chariot Sounds] 'The chariots of Israel and its horsemen!'", emoji: "🐎🔥👑", visualColor: "bg-orange-100" }
    ]
  },
  {
    id: "daniel",
    title: "Daniel: Courage in the Hungry Den",
    heroName: "Daniel",
    duration: "2:45",
    points: 15,
    thumbnail: "🦁🙏👼",
    description: "Spend a peaceful night in the lions' den and learn the power of persistent daily prayer.",
    scenes: [
      { narrative: "Daniel knelt before his open window, praying to God three times a day with a bright, peaceful heart.", subtitles: "Daniel: 'Thank You Lord for Your wisdom, Your safety, and Your sweet love.'", emoji: "🪟🙏🌅", visualColor: "bg-orange-50" },
      { narrative: "Because of his faithfulness, Daniel was thrown into a deep, dark den filled with rumbling, hungry lions.", subtitles: "[Lions Roaring] King Darius: 'May your God rescue you, Daniel!'", emoji: "🪨🦁🐾", visualColor: "bg-stone-100" },
      { narrative: "In the middle of the dark night, God sent a glowing, white angel who gently shut the lions' heavy mouths.", subtitles: "[Soft Celestial Light] Angel: 'Peace be with you, Daniel. You are safe.'", emoji: "👼🦁💖", visualColor: "bg-yellow-50" },
      { narrative: "The next morning, Daniel emerged without a single scratch, and King Darius decreed God is the living King forever!", subtitles: "Darius: 'Praise the God of Daniel, who rescues and saves!'", emoji: "🦁🏆✨", visualColor: "bg-emerald-50" }
    ]
  },
  {
    id: "jonah",
    title: "Jonah: The Big Whale Rescue",
    heroName: "Jonah",
    duration: "2:20",
    points: 15,
    thumbnail: "🐋⛵🫧",
    description: "Deep dive under the ocean wave with Jonah and discover God's infinite, second-chance grace.",
    scenes: [
      { narrative: "Jonah hopped on a wooden ship to run away from God's instructions. A giant storm tossed the waves!", subtitles: "Jonah: 'This storm is because of me! Throw me in, and the sea will quiet down.'", emoji: "⛵🌧️🌊", visualColor: "bg-indigo-50" },
      { narrative: "Splash! Jonah fell into the ocean. Instantly, the wind quieted. But Jonah did not sink!", subtitles: "Jonah: 'Help me, Lord!' [Deep Water Bubbles]", emoji: "🌊🫧🫧", visualColor: "bg-sky-100" },
      { narrative: "A giant, friendly blue whale sent by God swallowed Jonah whole, keeping him warm and cozy inside.", subtitles: "Jonah prays: 'I am so sorry, God! I will listen to Your voice now.'", emoji: "🐋🙏💖", visualColor: "bg-blue-100" },
      { narrative: "With a giant gulp, the friendly whale gently sneezed Jonah onto a sunny, sandy beach! Jonah ran to fulfill his mission.", subtitles: "Jonah: 'Hooray! God's forgiveness is wider than the sea!'", emoji: "🏖️🐳☀️", visualColor: "bg-amber-50" }
    ]
  },
  {
    id: "jesus",
    title: "Jesus: The Miracles & Love Kingdom",
    heroName: "Jesus",
    duration: "3:30",
    points: 25,
    thumbnail: "⛵🍞❤️",
    description: "Experience the incredible miracles of Jesus—feeding the 5,000 and calming the stormy waves!",
    scenes: [
      { narrative: "A massive crowd was hungry in the hills. A small boy offered five barley loaves and two tiny fish.", subtitles: "Jesus smiles: 'Thank You Father for this food. Let us share it with everyone!'", emoji: "🍞🐟🧒", visualColor: "bg-amber-50" },
      { narrative: "The disciples handed out food. Amazingly, the baskets never went empty! Everyone ate until they were full.", subtitles: "Disciples: 'Look! There are twelve full baskets of leftovers!'", emoji: "🧺✨🥖", visualColor: "bg-yellow-50" },
      { narrative: "Later that night on a rocking fishing boat, a wild gale blew! The disciples panicked.", subtitles: "Peter: 'Lord, save us, the waves are too high!'", emoji: "⛵🌧️🌊", visualColor: "bg-blue-200" },
      { narrative: "Jesus stood up at the bow and rebuked the storm. Peace instantly painted the lake.", subtitles: "Jesus: 'Quiet! Be still!' [Perfect calm descends]", emoji: "✋☀️⛵", visualColor: "bg-sky-50" }
    ]
  }
];

interface AnimatedVideosProps {
  onAddScore: (points: number) => void;
}

export default function AnimatedVideos({ onAddScore }: AnimatedVideosProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [claimedPoints, setClaimedPoints] = useState<Record<string, boolean>>({});

  const handleSelectVideo = (video: Video) => {
    window.speechSynthesis.cancel();
    setSelectedVideo(video);
    setCurrentSceneIndex(0);
    setIsPlaying(false);
    setIsCompleted(false);
  };

  const speakVideoNarrative = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const handlePlayScene = () => {
    if (!selectedVideo) return;
    setIsPlaying(true);
    const scene = selectedVideo.scenes[currentSceneIndex];
    speakVideoNarrative(`${scene.narrative}. ${scene.subtitles}`);

    // Auto-advance scene simulation or let kid control
  };

  const handleNextScene = () => {
    window.speechSynthesis.cancel();
    if (!selectedVideo) return;
    if (currentSceneIndex < selectedVideo.scenes.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
      setIsPlaying(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevScene = () => {
    window.speechSynthesis.cancel();
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(prev => prev - 1);
      setIsPlaying(false);
      setIsCompleted(false);
    }
  };

  const handleClaimPoints = () => {
    if (!selectedVideo) return;
    onAddScore(selectedVideo.points);
    setClaimedPoints(prev => ({ ...prev, [selectedVideo.id]: true }));
    setSelectedVideo(null);
  };

  return (
    <div className="space-y-6" id="animated-videos-root">
      <AnimatePresence mode="wait">
        {!selectedVideo ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Banner */}
            <div className="bg-gradient-to-r from-red-400 via-rose-400 to-pink-500 p-6 rounded-[32px] text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-rose-300">
              <div className="relative z-10 space-y-2 text-center md:text-left">
                <span className="bg-white/20 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                  🎥 Kingdom Kids Tube
                </span>
                <h2 className="text-3xl md:text-4xl font-black font-serif tracking-tight">
                  Animated Bible Videos!
                </h2>
                <p className="text-sm md:text-base text-white/95 max-w-lg font-semibold">
                  Step inside interactive cartoons of your favorite Bible heroes. Watch, listen, and learn!
                </p>
              </div>
              <div className="text-6xl md:text-8xl select-none mt-4 md:mt-0 animate-pulse">
                🍿🎥
              </div>
            </div>

            {/* Videos Grid */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-stone font-serif flex items-center gap-2">
                <Tv className="text-rose-500 w-5 h-5" /> Select an Episode to Watch
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {VIDEOS.map((video) => {
                  const done = claimedPoints[video.id];
                  return (
                    <motion.div
                      key={video.id}
                      whileHover={{ scale: 1.03 }}
                      className="bg-white border-3 border-rose-100 rounded-[28px] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col h-full"
                    >
                      {/* Thumbnail */}
                      <div className="bg-rose-50 h-44 flex items-center justify-center text-7xl select-none relative group border-b border-rose-100">
                        <span>{video.thumbnail}</span>
                        <button
                          onClick={() => handleSelectVideo(video)}
                          className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                        >
                          <span className="bg-white text-rose-500 p-3.5 rounded-full shadow-lg transform hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 fill-current" />
                          </span>
                        </button>
                        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {video.duration} Mins
                        </span>
                      </div>

                      {/* Info */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <h4 className="font-extrabold text-base text-brand-dark font-serif line-clamp-1 leading-tight">
                            {video.title}
                          </h4>
                          <p className="text-xs text-brand-stone font-medium line-clamp-2">
                            {video.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-rose-50">
                          <button
                            onClick={() => handleSelectVideo(video)}
                            className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-black px-4 py-2 rounded-xl cursor-pointer shadow-xs transition-colors"
                          >
                            Watch Episode
                          </button>
                          <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                            {done ? "Watched ✓" : `+${video.points} Coins`}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="theater-player"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-brand-stone/95 text-white border-4 border-rose-400 rounded-[36px] shadow-xl p-6 md:p-8 space-y-6"
          >
            {/* Player Header */}
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <div className="space-y-0.5">
                <button
                  onClick={() => {
                    window.speechSynthesis.cancel();
                    setSelectedVideo(null);
                  }}
                  className="text-[10px] font-black text-rose-300 hover:text-white flex items-center gap-1 cursor-pointer bg-white/10 px-3 py-1.5 rounded-full transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Videos
                </button>
                <h3 className="text-lg md:text-xl font-black font-serif tracking-tight mt-1">
                  {selectedVideo.title}
                </h3>
              </div>
              <span className="text-rose-400 bg-white px-3 py-1 rounded-full text-[10px] font-black uppercase">
                Episode Player
              </span>
            </div>

            {/* Simulated Interactive Video Screen */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch">
              {/* Screen stage */}
              <div className="md:col-span-3 bg-black rounded-2xl overflow-hidden aspect-video flex flex-col justify-between p-4 relative border border-white/10 shadow-inner">
                {/* Visual rendering panel */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all ${selectedVideo.scenes[currentSceneIndex].visualColor}`}>
                  <motion.div
                    key={currentSceneIndex}
                    initial={{ scale: 0.6, rotate: -5 }}
                    animate={{ scale: isPlaying ? [1, 1.1, 1] : 1, rotate: 0 }}
                    transition={{ duration: 1 }}
                    className="text-9xl select-none filter drop-shadow-md"
                  >
                    {selectedVideo.scenes[currentSceneIndex].emoji}
                  </motion.div>
                </div>

                {/* Corner watermarks */}
                <span className="relative z-10 self-start bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-xs">
                  Kingdom Kid Tube • LIVE
                </span>

                {/* Play state prompts */}
                <div className="relative z-10 self-center flex flex-col items-center justify-center space-y-2 mt-12 bg-black/30 p-4 rounded-xl backdrop-blur-xs">
                  {!isPlaying ? (
                    <button
                      onClick={handlePlayScene}
                      className="bg-white/90 hover:bg-white text-rose-600 p-4 rounded-full shadow-lg transform hover:scale-110 transition-all cursor-pointer"
                    >
                      <Play className="w-8 h-8 fill-current translate-x-0.5" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-white">
                      <Volume2 className="w-5 h-5 animate-bounce text-rose-400" />
                      <span className="text-xs font-black animate-pulse">Playing Narrative Audio...</span>
                    </div>
                  )}
                </div>

                {/* Beautiful Subtitles and Captions */}
                <div className="relative z-10 w-full bg-black/75 p-3.5 rounded-xl border border-white/10 text-center">
                  <p className="text-yellow-300 font-bold text-xs md:text-sm font-sans">
                    {selectedVideo.scenes[currentSceneIndex].subtitles}
                  </p>
                </div>
              </div>

              {/* Episode narrative guide & details */}
              <div className="md:col-span-2 bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-xxs font-black text-rose-400 bg-rose-950 px-2.5 py-1 rounded-full border border-rose-900 inline-block">
                    Scene {currentSceneIndex + 1} of {selectedVideo.scenes.length}
                  </span>
                  <h4 className="font-extrabold text-sm text-white font-serif">Scene Explanation</h4>
                  <p className="text-xs text-white/80 leading-relaxed font-semibold">
                    {selectedVideo.scenes[currentSceneIndex].narrative}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xxs text-white/50 font-bold leading-tight">
                    *Tip: Press "Play" to hear the character speak aloud in the theater! Keep kids inside the app.
                  </p>

                  <div className="flex gap-2">
                    {selectedVideo.scenes.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-2 rounded-full flex-1 transition-all ${
                          idx <= currentSceneIndex ? "bg-rose-500" : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Player controller buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                disabled={currentSceneIndex === 0}
                onClick={handlePrevScene}
                className="flex items-center gap-1.5 font-bold text-xs bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Previous Scene
              </button>

              {isCompleted ? (
                <motion.button
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  onClick={handleClaimPoints}
                  className="flex items-center gap-1.5 font-black text-xs bg-rose-500 hover:bg-rose-600 text-white px-5 py-3 rounded-xl shadow-md cursor-pointer transition-all"
                >
                  <Award className="w-4 h-4 mr-1 animate-spin" /> Finish Episode & Earn {selectedVideo.points} Coins!
                </motion.button>
              ) : (
                <button
                  onClick={handleNextScene}
                  className="flex items-center gap-1 font-black text-xs bg-rose-500 hover:bg-rose-600 text-white px-5 py-3 rounded-xl shadow-md cursor-pointer transition-all"
                >
                  Next Scene
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
