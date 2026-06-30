import React, { useState } from "react";
import { Music, Play, Pause, SkipForward, SkipBack, Heart, Sparkles, Volume2, Share2, Disc, Video, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Song {
  id: string;
  title: string;
  artist: string;
  category: "Alabaster Street" | "Action Songs" | "Memory Verse" | "Tutorials";
  duration: string;
  lyrics: string[];
  emoji: string;
}

const PLAYLIST: Song[] = [
  {
    id: "as1",
    title: "Sovereign Hands of Love",
    artist: "Alabaster Street Voices",
    category: "Alabaster Street",
    duration: "3:15",
    emoji: "🕊️🎸",
    lyrics: [
      "Your hands created the starry night,",
      "Your breath breathed into me the morning light.",
      "No wind is too stormy, no wave too deep,",
      "In Your sovereign hands, my soul You keep.",
      "We sing Hallelujah, the King of peace!",
      "Whose grace and mercy will never cease."
    ]
  },
  {
    id: "as2",
    title: "Walking on Waves",
    artist: "Alabaster Street Voices",
    category: "Alabaster Street",
    duration: "2:45",
    emoji: "⛵🌊",
    lyrics: [
      "When the storm is blowing loud and wild,",
      "You whisper: 'Peace, be still, My child.'",
      "I step out on the rolling blue,",
      "Because my eyes are fixed on You.",
      "We walk on waves of faith and light,",
      "Empowered by Your sovereign might!"
    ]
  },
  {
    id: "act1",
    title: "Shake the Leaves (Joy Action Song)",
    artist: "Kingdom Kids Choir",
    category: "Action Songs",
    duration: "2:10",
    emoji: "🌳🕺",
    lyrics: [
      "Stand tall like a giant green oak tree! [Stand tall]",
      "Wiggle your branches left and right! [Wiggle arms]",
      "Shake the leaves of joy on your hands! [Shake fingers]",
      "And stomp your feet with all your might! [Stomp feet]",
      "We praise God with every movement we make,",
      "And jump for joy for Jesus' sake! [Jump up!]"
    ]
  },
  {
    id: "mv1",
    title: "God Is Love (1 John 4:8 Song)",
    artist: "Scripture Singers",
    category: "Memory Verse",
    duration: "1:55",
    emoji: "❤️🎤",
    lyrics: [
      "God is love, God is love,",
      "Perfect and pure from heaven above.",
      "Whoever lives in love, lives in God,",
      "He walks the path that Jesus trod.",
      "1 John 4 verse 8 is our song,",
      "We praise His holy name all day long!"
    ]
  },
  {
    id: "tut1",
    title: "Little Shepherd Harp Tutorial",
    artist: "David's Academy",
    category: "Tutorials",
    duration: "4:00",
    emoji: "🎵🐑",
    lyrics: [
      "Lesson 1: The Golden Harp Strings.",
      "Pluck the first string for God's creation. [Ding!]",
      "Pluck the second string for Noah's promise. [Dong!]",
      "Pluck the third string for shepherd courage. [Clang!]",
      "Play them together to sing a praise song,",
      "To keep your mind joyful and strong!"
    ]
  }
];

interface TutorialVideo {
  title: string;
  duration: string;
  emoji: string;
  trainer: string;
  desc: string;
}

const VIDEOS_TUTORIALS: TutorialVideo[] = [
  { title: "Sovereign Hands Dance Tutorial", duration: "3:40", emoji: "🕺✨", trainer: "Sister Grace", desc: "Learn the colorful hand movements for the Alabaster Street hit song!" },
  { title: "Easy 3-Chord Ukulele Worship", duration: "5:15", emoji: "🎸🏕️", trainer: "Brother Dan", desc: "Learn to play 'God Is Love' on your ukulele with just 3 fingers." },
  { title: "Tambourine Action Praise Masterclass", duration: "2:50", emoji: "🥁🔔", trainer: "Aunt Sarah", desc: "Learn the proper tambourine shakes and taps for fast Sunday school action songs." }
];

export default function KingdomWorship() {
  const [activeTab, setActiveTab] = useState<"player" | "videos">("player");
  const [currentSong, setCurrentSong] = useState<Song>(PLAYLIST[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(30); // Simulated percentage
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});

  // Lyrics scroller timer
  const [lyricIndex, setLyricIndex] = useState(0);

  const handlePlayPause = () => {
    window.speechSynthesis.cancel();
    if (!isPlaying) {
      setIsPlaying(true);
      speakLyricsLine(currentSong.lyrics[lyricIndex]);
    } else {
      setIsPlaying(false);
    }
  };

  const handleNextSong = () => {
    window.speechSynthesis.cancel();
    const curIdx = PLAYLIST.findIndex(s => s.id === currentSong.id);
    const nextIdx = (curIdx + 1) % PLAYLIST.length;
    setCurrentSong(PLAYLIST[nextIdx]);
    setLyricIndex(0);
    setPlaybackProgress(0);
    setIsPlaying(false);
  };

  const handlePrevSong = () => {
    window.speechSynthesis.cancel();
    const curIdx = PLAYLIST.findIndex(s => s.id === currentSong.id);
    let prevIdx = curIdx - 1;
    if (prevIdx < 0) prevIdx = PLAYLIST.length - 1;
    setCurrentSong(PLAYLIST[prevIdx]);
    setLyricIndex(0);
    setPlaybackProgress(0);
    setIsPlaying(false);
  };

  const speakLyricsLine = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.onend = () => {
      if (isPlaying) {
        // Auto scroll lyrics
        setLyricIndex(prev => {
          const next = (prev + 1) % currentSong.lyrics.length;
          if (next === 0) {
            setIsPlaying(false);
            setPlaybackProgress(100);
          } else {
            setPlaybackProgress(Math.floor((next / currentSong.lyrics.length) * 100));
            // Lazy speak next line
            setTimeout(() => {
              if (isPlaying) speakLyricsLine(currentSong.lyrics[next]);
            }, 1000);
          }
          return next;
        });
      }
    };
    window.speechSynthesis.speak(utterance);
  };

  const toggleLike = (id: string) => {
    setIsLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6" id="kingdom-worship-root">
      {/* Tab bar */}
      <div className="flex justify-center">
        <div className="bg-rose-100/50 p-1 rounded-2xl flex items-center border border-rose-200">
          <button
            onClick={() => setActiveTab("player")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === "player" ? "bg-rose-500 text-white shadow-xs" : "text-rose-800"
            }`}
          >
            <Music className="w-4 h-4" /> 🎵 Songs & Lyrics Player
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === "videos" ? "bg-rose-500 text-white shadow-xs" : "text-rose-800"
            }`}
          >
            <Video className="w-4 h-4" /> 🎥 Dance & Tutorials
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "player" && (
          <motion.div key="player" className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Playlist list column */}
            <div className="lg:col-span-2 bg-white border-3 border-rose-100 rounded-[32px] p-5 space-y-4 h-fit">
              <h4 className="font-extrabold text-sm text-rose-700 flex items-center gap-1.5 border-b border-brand-sand pb-3">
                <Disc className="w-5 h-5 animate-spin duration-[6000ms]" /> Music Library
              </h4>

              <div className="space-y-2">
                {PLAYLIST.map((song) => {
                  const active = song.id === currentSong.id;
                  const isFav = isLiked[song.id];
                  return (
                    <div
                      key={song.id}
                      onClick={() => {
                        window.speechSynthesis.cancel();
                        setCurrentSong(song);
                        setLyricIndex(0);
                        setPlaybackProgress(0);
                        setIsPlaying(false);
                      }}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        active
                          ? "bg-rose-50 border-rose-300 scale-[1.01]"
                          : "bg-white border-brand-sand/50 hover:border-rose-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-2xl shrink-0">{song.emoji}</span>
                        <div className="min-w-0">
                          <h5 className="font-extrabold text-xs text-brand-dark leading-none truncate">{song.title}</h5>
                          <span className="text-[9px] font-black text-rose-500 uppercase tracking-wide block mt-1">
                            {song.artist}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(song.id);
                          }}
                          className="p-1"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? "fill-rose-500 text-rose-500" : "text-brand-stone/40"}`} />
                        </button>
                        <span className="text-[10px] text-brand-stone/60 font-bold">{song.duration}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Simulated Active Music Console */}
            <div className="lg:col-span-3 bg-white border-3 border-rose-200 rounded-[36px] p-6 flex flex-col justify-between space-y-6">
              {/* Spinning Disc Header */}
              <div className="flex items-center gap-4">
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                  className="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center text-3xl shadow-md border-4 border-rose-100 shrink-0 select-none"
                >
                  💿
                </motion.div>
                <div>
                  <span className="text-[10px] font-black bg-rose-50 text-rose-600 border border-rose-100 px-2.5 py-0.5 rounded-full uppercase">
                    {currentSong.category}
                  </span>
                  <h4 className="font-black text-base md:text-lg text-brand-dark font-serif mt-0.5 leading-snug">
                    {currentSong.title}
                  </h4>
                  <p className="text-xxs font-black text-brand-stone uppercase tracking-widest">{currentSong.artist}</p>
                </div>
              </div>

              {/* Active Scroll Lyrics box */}
              <div className="bg-rose-50/50 border-2 border-rose-100 p-5 rounded-2xl h-48 overflow-y-auto flex flex-col items-center justify-center text-center space-y-2 shadow-inner">
                {currentSong.lyrics.map((line, idx) => {
                  const isActive = idx === lyricIndex;
                  return (
                    <motion.p
                      key={idx}
                      animate={isActive ? { scale: 1.05, opacity: 1 } : { scale: 0.95, opacity: 0.4 }}
                      className={`text-xs md:text-sm font-serif leading-relaxed ${
                        isActive ? "text-rose-600 font-extrabold filter drop-shadow-xxs" : "text-brand-stone font-semibold"
                      }`}
                    >
                      {isActive && "🎵 "} {line} {isActive && " 🎵"}
                    </motion.p>
                  );
                })}
              </div>

              {/* Player Progress line slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-brand-stone/60 font-bold">
                  <span>{Math.floor((playbackProgress / 100) * 3)}:00</span>
                  <span>{currentSong.duration}</span>
                </div>
                <div className="h-2 bg-brand-sand/55 rounded-full overflow-hidden border border-brand-sand relative">
                  <div
                    style={{ width: `${playbackProgress}%` }}
                    className="h-full bg-rose-500 rounded-full transition-all"
                  />
                </div>
              </div>

              {/* Controller buttons */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={handlePrevSong}
                  className="bg-brand-sand hover:bg-brand-stone text-brand-stone hover:text-white p-3 rounded-xl border border-brand-sand transition-all cursor-pointer"
                >
                  <SkipBack className="w-5 h-5 fill-current" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="bg-rose-500 hover:bg-rose-600 text-white p-4.5 rounded-full shadow-lg transform hover:scale-105 transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
                </button>

                <button
                  onClick={handleNextSong}
                  className="bg-brand-sand hover:bg-brand-stone text-brand-stone hover:text-white p-3 rounded-xl border border-brand-sand transition-all cursor-pointer"
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "videos" && (
          <motion.div key="videos" className="space-y-6">
            {/* Banner card */}
            <div className="bg-rose-50 border-3 border-rose-100 p-6 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[9px] font-black bg-rose-100 text-rose-600 px-2.5 py-0.5 rounded-full uppercase">Dance & tutorials</span>
                <h4 className="font-black text-brand-dark font-serif text-lg leading-snug">Worship Praise Masterclasses!</h4>
                <p className="text-xs text-brand-stone font-semibold">Join action dance tutorials and easy instrument plays inside the app!</p>
              </div>
              <span className="text-5xl animate-bounce">💃🎸🥁</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VIDEOS_TUTORIALS.map((video, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-rose-100 rounded-2xl overflow-hidden p-5 space-y-4 flex flex-col justify-between shadow-xxs"
                >
                  <div className="space-y-2">
                    <div className="bg-rose-50 h-32 flex items-center justify-center text-5xl border rounded-xl select-none">
                      {video.emoji}
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-rose-500">{video.trainer} • Trainer</span>
                      <h5 className="font-extrabold text-sm text-brand-dark leading-tight">{video.title}</h5>
                      <p className="text-[10px] text-brand-stone font-semibold">{video.desc}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-rose-50">
                    <button
                      onClick={() => alert(`Enjoy watching: ${video.title}!`)}
                      className="text-xxs font-black text-white bg-rose-500 hover:bg-rose-600 px-3.5 py-2 rounded-xl"
                    >
                      Play Tutorial
                    </button>
                    <span className="text-xxs text-brand-stone/60 font-bold">{video.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
