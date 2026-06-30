import React, { useState, useEffect } from "react";
import { 
  BookOpen, Heart, Sparkles, ChevronLeft, ChevronRight, 
  Volume2, VolumeX, Award, CheckCircle, HelpCircle, Trophy, 
  Star, MessageSquare, Calendar, List, Bookmark, MapPin, 
  RotateCcw, Check, Lock, Play, Square, Save, Flame, Compass, 
  ArrowLeft, ArrowRight, ShieldAlert, BadgeInfo
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types
interface StoryCategory {
  id: string;
  name: string;
  section: "Old Testament" | "New Testament";
  days: [number, number]; // [startDay, endDay]
  emoji: string;
  color: string;
  desc: string;
}

interface QuizQuestion {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

interface FullBibleStory {
  storyTitle: string;
  storyText: string;
  visualDescription: string;
  mainLesson: string;
  verseText: string;
  verseReference: string;
  prayer: string;
  discussionQuestions: string[];
  weeklyChallenge: string;
  rewardBadgeTitle: string;
  rewardBadgeEmoji: string;
  quiz: QuizQuestion[];
}

// 34 categories to split Day 1 to 365 as requested
const STORIES_CATEGORIES: StoryCategory[] = [
  // Old Testament
  { id: "creation", name: "Creation", section: "Old Testament", days: [1, 10], emoji: "🌅", color: "from-amber-400 to-yellow-500", desc: "How God created our beautiful world" },
  { id: "adam_eve", name: "Adam & Eve", section: "Old Testament", days: [11, 20], emoji: "🌳", color: "from-emerald-400 to-teal-500", desc: "The beautiful Garden of Eden" },
  { id: "noah", name: "Noah", section: "Old Testament", days: [21, 30], emoji: "⛵", color: "from-sky-400 to-blue-500", desc: "The great ark and rainbow of hope" },
  { id: "babel", name: "Babel", section: "Old Testament", days: [31, 40], emoji: "🗼", color: "from-orange-400 to-amber-500", desc: "The tall tower and many languages" },
  { id: "abraham", name: "Abraham", section: "Old Testament", days: [41, 55], emoji: "⛺", color: "from-yellow-400 to-orange-500", desc: "Leaving home with big faith in God" },
  { id: "isaac", name: "Isaac", section: "Old Testament", days: [56, 70], emoji: "🐑", color: "from-lime-400 to-emerald-500", desc: "God's wonderful promise of a family" },
  { id: "jacob", name: "Jacob", section: "Old Testament", days: [71, 85], emoji: "🪜", color: "from-indigo-400 to-purple-500", desc: "The ladder to heaven and a new name" },
  { id: "joseph", name: "Joseph", section: "Old Testament", days: [86, 100], emoji: "🧥", color: "from-pink-400 to-rose-500", desc: "A colorful coat and powerful dreams" },
  { id: "moses", name: "Moses", section: "Old Testament", days: [101, 125], emoji: "🌊", color: "from-blue-400 to-cyan-500", desc: "The red sea and the ten commandments" },
  { id: "joshua", name: "Joshua", section: "Old Testament", days: [126, 140], emoji: "🎺", color: "from-red-400 to-orange-500", desc: "The walls of Jericho tumbling down" },
  { id: "gideon", name: "Gideon", section: "Old Testament", days: [141, 150], emoji: "🏺", color: "from-violet-400 to-indigo-500", desc: "God's small but brave trumpet army" },
  { id: "ruth", name: "Ruth", section: "Old Testament", days: [151, 160], emoji: "🌾", color: "from-amber-300 to-yellow-600", desc: "A loyal heart in the wheat fields" },
  { id: "samuel", name: "Samuel", section: "Old Testament", days: [161, 175], emoji: "👂", color: "from-teal-400 to-emerald-600", desc: "The little boy who listened to God's voice" },
  { id: "david", name: "David", section: "Old Testament", days: [176, 200], emoji: "👑", color: "from-yellow-500 to-amber-600", desc: "The shepherd boy who became king" },
  { id: "solomon", name: "Solomon", section: "Old Testament", days: [201, 210], emoji: "🏛️", color: "from-indigo-500 to-purple-600", desc: "Building the temple with wise choices" },
  { id: "elijah", name: "Elijah", section: "Old Testament", days: [211, 225], emoji: "🔥", color: "from-orange-500 to-red-600", desc: "Chariots of fire and powerful prayers" },
  { id: "elisha", name: "Elisha", section: "Old Testament", days: [226, 240], emoji: "🍯", color: "from-amber-400 to-orange-600", desc: "Miracles of multiplying oil and kindness" },
  { id: "esther", name: "Esther", section: "Old Testament", days: [241, 250], emoji: "👸", color: "from-pink-500 to-rose-600", desc: "The brave queen who saved her people" },
  { id: "daniel", name: "Daniel", section: "Old Testament", days: [251, 265], emoji: "🦁", color: "from-yellow-600 to-amber-700", desc: "Brave prayers in the lions' den" },
  { id: "jonah", name: "Jonah", section: "Old Testament", days: [266, 275], emoji: "🐋", color: "from-sky-500 to-blue-600", desc: "The big fish and a second chance" },
  { id: "nehemiah", name: "Nehemiah", section: "Old Testament", days: [276, 285], emoji: "🧱", color: "from-stone-400 to-stone-600", desc: "Rebuilding the strong walls of Jerusalem" },

  // New Testament
  { id: "birth_jesus", name: "Birth of Jesus", section: "New Testament", days: [286, 295], emoji: "⭐️", color: "from-amber-400 to-orange-500", desc: "The cozy stable baby under the star" },
  { id: "john_baptist", name: "John the Baptist", section: "New Testament", days: [296, 300], emoji: "🍯", color: "from-yellow-500 to-lime-600", desc: "A wild voice preparing the way" },
  { id: "baptism_jesus", name: "Baptism of Jesus", section: "New Testament", days: [301, 305], emoji: "🕊️", color: "from-cyan-400 to-blue-500", desc: "Heaven opens and a dove descends" },
  { id: "choosing_disciples", name: "Choosing the disciples", section: "New Testament", days: [306, 310], emoji: "🎣", color: "from-emerald-400 to-teal-600", desc: "Fishermen called to catch hearts" },
  { id: "miracles_jesus", name: "Miracles of Jesus", section: "New Testament", days: [311, 325], emoji: "✨", color: "from-purple-400 to-indigo-600", desc: "Healing hands and walking on stormy waves" },
  { id: "parables", name: "Parables", section: "New Testament", days: [326, 340], emoji: "🌱", color: "from-lime-400 to-emerald-500", desc: "Stories of mustard seeds and lost sheep" },
  { id: "cross", name: "The Cross", section: "New Testament", days: [341, 345], emoji: "✝️", color: "from-red-500 to-rose-600", desc: "Jesus' infinite, perfect love for us" },
  { id: "resurrection", name: "Resurrection", section: "New Testament", days: [346, 350], emoji: "🌅", color: "from-yellow-400 to-orange-500", desc: "The empty tomb and victory of life" },
  { id: "ascension", name: "Ascension", section: "New Testament", days: [351, 354], emoji: "☁️", color: "from-sky-400 to-cyan-500", desc: "Jesus rises to heaven and promises to return" },
  { id: "pentecost", name: "Pentecost", section: "New Testament", days: [355, 358], emoji: "🔥", color: "from-red-400 to-yellow-500", desc: "The Holy Spirit arrives like rushing wind and fire" },
  { id: "peter", name: "Peter", section: "New Testament", days: [359, 361], emoji: "🗝️", color: "from-blue-500 to-indigo-600", desc: "Brave sermon leadership and church building" },
  { id: "paul", name: "Paul", section: "New Testament", days: [362, 364], emoji: "⛵", color: "from-teal-500 to-emerald-600", desc: "Grand voyages and letters of faith" },
  { id: "revelation", name: "Revelation", section: "New Testament", days: [365, 365], emoji: "🏰", color: "from-purple-500 to-pink-600", desc: "The crystal city and new heaven promise" }
];

// Offline high-quality preloaded stories for key days so the app is immediately playable
const PRELOADED_STORIES: Record<number, FullBibleStory> = {
  1: {
    storyTitle: "The Sparkling Light of Creation",
    storyText: "In the very beginning, before there were tall trees, singing birds, or splashing oceans, everything was quiet and dark. But God was there, and He had a wonderful plan to create a beautiful playground! God spoke into the darkness and said, 'Let there be light!' Instantly, a warm, golden glow filled the universe, pushing away the darkness. God saw that the light was good, warm, and happy. He named the light Day, and the darkness He named Night. This was the very first day of our world—a perfect gift of light made out of love just for you and me!",
    visualDescription: "A beautiful golden sun rising over soft pastel purple clouds under sparkling stars.",
    mainLesson: "God is full of light and goodness, and He always chases away our dark or fearful times.",
    verseText: "God said, 'Let there be light,' and there was light.",
    verseReference: "Genesis 1:3",
    prayer: "Dear God, thank You for the warm light and for creating this beautiful world for us. Help me to shine brightly like Your love today! Amen.",
    discussionQuestions: [
      "How do you feel when you see the beautiful morning sunshine?",
      "Why do you think God wanted our world to have light first?"
    ],
    weeklyChallenge: "Every morning when you wake up, look at the sunlight and say a happy 'Thank You, God!'",
    rewardBadgeTitle: "First Day Pioneer",
    rewardBadgeEmoji: "🌅",
    quiz: [
      {
        question: "What did God create on the very first day?",
        choices: ["Light", "Puppies", "Tall trees", "Airplanes"],
        correctIndex: 0,
        explanation: "God spoke and created light first to fill the world with warmth!"
      },
      {
        question: "What did God call the light?",
        choices: ["Yellow", "Day", "Sunny", "Sparkles"],
        correctIndex: 1,
        explanation: "God named the warm light 'Day' and the darkness 'Night'!"
      },
      {
        question: "How did God create the light?",
        choices: ["Using a match", "By speaking words", "By clapping His hands", "Using a flashlight"],
        correctIndex: 1,
        explanation: "God created everything beautifully simply by speaking His powerful words!"
      }
    ]
  },
  21: {
    storyTitle: "Noah's Ark and the Big Floating Zoo",
    storyText: "A long, long time ago, God saw that people had forgotten how to be kind. But there was one man named Noah who loved God with all his heart. God told Noah to build a giant wooden boat called an Ark. It was as long as three football fields! Noah trusted God and built it exactly as instructed, even though there was no rain yet. Then, animals of every shape and size came walking two-by-two—tall giraffes, heavy elephants, roaring lions, and tiny squeaking mice! God shut the door safely, and when the rain came, the giant ark floated peacefully on top of the waters. When the storm ended, God placed a beautiful multi-colored rainbow in the sky as a promise never to flood the earth again!",
    visualDescription: "A massive, friendly-looking wooden boat floating on gentle blue waves with two tiny giraffes peaking their heads out of a window under a glowing rainbow.",
    mainLesson: "Even when storms of life look big, trusting God keeps us safe, and He always keeps His promises.",
    verseText: "I have set my rainbow in the clouds, and it will be the sign of the covenant.",
    verseReference: "Genesis 9:13",
    prayer: "Dear God, when I feel scared, help me to trust in You just like Noah did. Thank You for always keeping Your promises. Amen.",
    discussionQuestions: [
      "Which animal would you want to play with on Noah's ark?",
      "What do you think of when you see a beautiful rainbow in the sky?"
    ],
    weeklyChallenge: "Draw a colorful rainbow and write God's promise on it to hang in your room!",
    rewardBadgeTitle: "Rainbow Captain",
    rewardBadgeEmoji: "⛵",
    quiz: [
      {
        question: "What did Noah build to keep the animals safe?",
        choices: ["A castle", "A giant floating Ark", "A wooden house", "A playground"],
        correctIndex: 1,
        explanation: "Noah built a huge Ark to float on the waters and keep the animals safe!"
      },
      {
        question: "How did the animals walk into the Ark?",
        choices: ["Two by two", "Ten by ten", "Only the fast ones", "Flying only"],
        correctIndex: 0,
        explanation: "Animals of every kind marched two-by-two into Noah's big floating ark!"
      },
      {
        question: "What sign did God place in the sky as a promise?",
        choices: ["A bright yellow star", "A big white cloud", "A colorful rainbow", "A flying dove"],
        correctIndex: 2,
        explanation: "A beautiful rainbow is God's sign of a promise of love and protection!"
      }
    ]
  },
  176: {
    storyTitle: "The Shepherd Boy's Giant Faith",
    storyText: "Before he was a grand king, David was just a small shepherd boy who looked after his father's fluffy white sheep. He loved to sing happy songs to God on his little harp. One day, a giant soldier named Goliath came to scare the army, shouting mean things. None of the tall, strong soldiers dared to face him. But David said, 'God, who saved me from the bear and the lion, will help me keep our family safe!' David chose five smooth stones from a bubbling stream, put one in his sling, and swung it around and around. With just one launch, the stone landed perfectly, and the scary giant fell! David didn't need armor or swords—he only needed his giant faith in God!",
    visualDescription: "A small brave boy holding a simple sling looking towards a giant helmet under a bright clear sky.",
    mainLesson: "You are never too small or young to do brave things when you trust in God's mighty power.",
    verseText: "The Lord is my shepherd, I shall not want.",
    verseReference: "Psalm 23:1",
    prayer: "Dear God, thank You for being my protector and shepherd. Help me to be brave and full of faith even when my problems look giant-sized! Amen.",
    discussionQuestions: [
      "David was small, but he was very brave. What makes you feel brave?",
      "How did David learn to trust God while watching his fluffy sheep?"
    ],
    weeklyChallenge: "Find a small smooth stone, wash it, and keep it in your pocket this week as a reminder that God makes you strong!",
    rewardBadgeTitle: "Giant Slayer",
    rewardBadgeEmoji: "👑",
    quiz: [
      {
        question: "What job did young David have before he became king?",
        choices: ["A fisherman", "A baker", "A shepherd boy", "A tentmaker"],
        correctIndex: 2,
        explanation: "David was a humble shepherd looking after family sheep!"
      },
      {
        question: "What did David use to defeat the giant Goliath?",
        choices: ["A giant iron sword", "A simple sling and smooth stone", "A heavy metal shield", "A long bow and arrow"],
        correctIndex: 1,
        explanation: "David trusted God and defeated Goliath with a simple sling and a smooth stone!"
      },
      {
        question: "Who did David say would help him win?",
        choices: ["His older brothers", "The king's horses", "The Lord God", "The shepherd dogs"],
        correctIndex: 2,
        explanation: "David knew that God is our ultimate strength and helper in all things!"
      }
    ]
  },
  286: {
    storyTitle: "The Star of the Cozy Stable",
    storyText: "On a quiet, starry night in Bethlehem, a mother named Mary and her husband Joseph were looking for a cozy place to rest. All the rooms in town were full, but a kind innkeeper offered them his warm stable. Inside, among friendly donkeys and sleepy cows, Baby Jesus was born! Mary wrapped him in warm cloths and laid Him gently in a manger filled with sweet-smelling hay. High above, a giant, brilliant star began to shine, lighting up the entire stable! Angels sang beautiful songs of joy in the sky, telling the shepherds in the fields that a Savior of love and peace was born to bring happiness to the whole world!",
    visualDescription: "A bright glowing Christmas star shining down on a small wooden stable on a quiet dark night.",
    mainLesson: "Jesus came to earth in a humble, cozy place to show us that love is the greatest treasure of all.",
    verseText: "For unto us a child is born, unto us a son is given.",
    verseReference: "Isaiah 9:6",
    prayer: "Dear Lord Jesus, thank You for coming to earth to be my friend and savior. Fill our home with Your sweet peace and joy. Amen.",
    discussionQuestions: [
      "How do you think Mary felt sleeping in a cozy stable with animals?",
      "Why did the angels want the shepherds to know about baby Jesus?"
    ],
    weeklyChallenge: "Do a secret kind act for someone in your family today to share Jesus' love!",
    rewardBadgeTitle: "Star of Bethlehem",
    rewardBadgeEmoji: "⭐️",
    quiz: [
      {
        question: "Where was Baby Jesus born because the hotels were full?",
        choices: ["In a castle", "In a cozy stable", "In a boat", "In a giant palace"],
        correctIndex: 1,
        explanation: "Jesus was born in a humble, cozy stable surrounded by gentle animals!"
      },
      {
        question: "What did Mary use as a bed for Baby Jesus?",
        choices: ["A wooden cradle", "A soft wool blanket", "A manger with hay", "A soft feather bed"],
        correctIndex: 2,
        explanation: "Mary laid Baby Jesus in a manger, which is a cozy feeding box for sheep!"
      },
      {
        question: "What appeared in the sky to guide visitors to the baby?",
        choices: ["A bright glowing star", "A flying white dove", "A glowing rainbow", "A golden chariot"],
        correctIndex: 0,
        explanation: "A giant beautiful Christmas star shone brightly in the sky to guide the visitors!"
      }
    ]
  },
  346: {
    storyTitle: "The Joyful Sunday Morning",
    storyText: "Early on Sunday morning, just as the warm pink sun was beginning to peek over the hills, some women walked sadly to the tomb where Jesus had been buried. They wondered how they would move the giant stone that covered the entrance. But when they arrived, they were amazed! The giant stone had been rolled away, and a bright angel sitting on it smiled at them! The angel said, 'Do not be afraid! He is not here, for He has risen, just as He promised!' Soon, Jesus appeared to His disciples, waving His hands, eating food, and filling their hearts with ultimate joy. Jesus had conquered death, showing us that His love is alive forever!",
    visualDescription: "A beautiful bright sunrise over green hills with an open round stone tomb with yellow light pouring out.",
    mainLesson: "Jesus is alive, and His incredible love is stronger than anything in the world!",
    verseText: "He is not here; he has risen, just as he said.",
    verseReference: "Matthew 28:6",
    prayer: "Dear Jesus, thank You for being alive and loving me forever! Fill my life with Your resurrection joy and hope. Amen.",
    discussionQuestions: [
      "How do you think the women felt when they saw the open tomb and the smiling angel?",
      "What does it mean to you that Jesus' love is alive today?"
    ],
    weeklyChallenge: "Celebrate this week by giving someone a high-five and saying, 'Have a happy, joyful day!'",
    rewardBadgeTitle: "Victory Champion",
    rewardBadgeEmoji: "🌅",
    quiz: [
      {
        question: "What was rolled away from the entrance of the tomb?",
        choices: ["A heavy wooden door", "A giant stone", "A brick wall", "An iron gate"],
        correctIndex: 1,
        explanation: "An angel rolled away the heavy stone to reveal that the tomb was open!"
      },
      {
        question: "Who was sitting on the stone to tell the women the happy news?",
        choices: ["A little sheep", "A Roman soldier", "A bright angel", "A fisherman"],
        correctIndex: 2,
        explanation: "A shining, smiling angel told the women that Jesus has risen!"
      },
      {
        question: "What did the angel say about Jesus?",
        choices: ["He went to Galilee", "He is still sleeping", "He has risen, just as He said", "He is lost"],
        correctIndex: 2,
        explanation: "The angel declared that Jesus is alive and risen, defeating darkness!"
      }
    ]
  }
};

interface ThreeSixtyFiveStoriesProps {
  userScore: number;
  onAddScore: (points: number) => void;
}

export default function ThreeSixtyFiveStories({ userScore, onAddScore }: ThreeSixtyFiveStoriesProps) {
  // Navigation states
  const [activeSection, setActiveSection] = useState<"Old Testament" | "New Testament">("Old Testament");
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Story state
  const [story, setStory] = useState<FullBibleStory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Interactive story features states
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [claimedBadge, setClaimedBadge] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [diaryText, setDiaryText] = useState("");
  const [diarySaved, setDiarySaved] = useState(false);

  // Verse Scramble game states
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [selectedWordsIndices, setSelectedWordsIndices] = useState<number[]>([]);
  const [verseSolved, setVerseSolved] = useState(false);

  // Quiz states
  const [quizScore, setQuizScore] = useState<number>(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Local storage lists
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [unlockedBadges, setUnlockedBadges] = useState<{title: string, emoji: string}[]>([]);

  // Load completion states from LocalStorage
  useEffect(() => {
    const savedCompleted = localStorage.getItem("kingdom_completed_days");
    if (savedCompleted) {
      setCompletedDays(JSON.parse(savedCompleted));
    }
    const savedBadges = localStorage.getItem("kingdom_claimed_badges");
    if (savedBadges) {
      setUnlockedBadges(JSON.parse(savedBadges));
    }
  }, []);

  // Set selected category initially
  useEffect(() => {
    if (!selectedCategory) {
      const defaultCat = STORIES_CATEGORIES.find(c => c.section === activeSection);
      if (defaultCat) setSelectedCategory(defaultCat);
    }
  }, [activeSection]);

  // Handle Tab Switch
  const handleSectionSwitch = (sect: "Old Testament" | "New Testament") => {
    setActiveSection(sect);
    const defaultCat = STORIES_CATEGORIES.find(c => c.section === sect);
    if (defaultCat) setSelectedCategory(defaultCat);
    setSelectedDay(null);
    resetStoryState();
  };

  const resetStoryState = () => {
    setStory(null);
    setApiError("");
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setShowQuestions(false);
    setClaimedBadge(false);
    setShowCelebration(false);
    setDiaryText("");
    setDiarySaved(false);
    setVerseSolved(false);
    setSelectedWordsIndices([]);
    setQuizScore(0);
    setCurrentQuizIndex(0);
    setSelectedChoice(null);
    setQuizSubmitted(false);
    setQuizCompleted(false);
  };

  // Scramble a verse
  const setupVerseGame = (verse: string) => {
    // Remove punctuation and clean words
    const cleanWords = verse.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g,"").split(/\s+/);
    // Add indices to keep words unique
    const wordsWithIndex = cleanWords.map((word, idx) => ({ word, idx }));
    // Shuffle
    const shuffled = [...wordsWithIndex].sort(() => Math.random() - 0.5);
    setScrambledWords(shuffled.map(item => item.word));
    setSelectedWordsIndices([]);
    setVerseSolved(false);
  };

  const handleWordClick = (scrambledIdx: number, word: string) => {
    if (verseSolved) return;

    // Toggle select
    if (selectedWordsIndices.includes(scrambledIdx)) {
      setSelectedWordsIndices(prev => prev.filter(i => i !== scrambledIdx));
    } else {
      setSelectedWordsIndices(prev => [...prev, scrambledIdx]);
    }
  };

  // Check solve
  useEffect(() => {
    if (story && scrambledWords.length > 0 && selectedWordsIndices.length === scrambledWords.length) {
      const builtText = selectedWordsIndices.map(idx => scrambledWords[idx]).join(" ").toLowerCase();
      const targetClean = story.verseText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g,"").split(/\s+/).join(" ").toLowerCase();
      
      // Let's do a friendly sub-string or split comparison to ensure minor mismatch doesn't block the child
      if (builtText === targetClean || targetClean.includes(builtText) || builtText.length > targetClean.length * 0.85) {
        setVerseSolved(true);
        onAddScore(30); // Earn 30 stars for solving!
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }
  }, [selectedWordsIndices, scrambledWords, story]);

  // Load / Generate Story
  const loadStoryForDay = async (day: number) => {
    resetStoryState();
    setSelectedDay(day);
    setIsLoading(true);

    // 1. Check if we have preloaded offline copy
    if (PRELOADED_STORIES[day]) {
      const offlineStory = PRELOADED_STORIES[day];
      setStory(offlineStory);
      setupVerseGame(offlineStory.verseText);
      setIsLoading(false);
      return;
    }

    // 2. Otherwise generate dynamically from Gemini
    try {
      const cat = STORIES_CATEGORIES.find(c => day >= c.days[0] && day <= c.days[1]);
      const topicName = cat ? cat.name : "Bible Story";

      const response = await fetch("/api/generate-365-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: activeSection,
          topic: topicName,
          dayNumber: day
        })
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data: FullBibleStory = await response.json();
      setStory(data);
      setupVerseGame(data.verseText);
    } catch (err: any) {
      console.warn("Dynamic generate failed, fallback to smart template", err);
      // Perfect safe fallback story so the child can ALWAYS play any day
      const cat = STORIES_CATEGORIES.find(c => day >= c.days[0] && day <= c.days[1]);
      const topicName = cat ? cat.name : "Generosity";
      const fallback: FullBibleStory = {
        storyTitle: `Day ${day}: The Gift of ${topicName}`,
        storyText: `In the beautiful land of the Bible, God always showed His children how to walk with love, patience, and kind faith. Today, on Day ${day}, we study the wonderful theme of ${topicName}. The Bible teaches that whenever we choose kindness, share our happy smiles, or help a friend carry a heavy basket, we make God's heart jump with joy! In this story, people gathered to share their food, sing happy psalms of thanksgiving under the olive trees, and pray for peace. Remember that God created your unique hands and loving heart to be a light in the world, spreading hope to everyone you meet!`,
        visualDescription: "A shining star casting a happy yellow glow on a lush green olive tree hill with cute white sheep grazing.",
        mainLesson: `God's love for you is infinite, and practicing ${topicName} makes you a true faith champion.`,
        verseText: "Serve one another humbly in love.",
        verseReference: "Galatians 5:13",
        prayer: `Dear Heavenly Father, thank You for Day ${day} and for teaching me about ${topicName}. Help me to serve others with a sweet smile and a big heart today. Amen.`,
        discussionQuestions: [
          `What is one simple way we can practice ${topicName} in our home today?`,
          "Why does God love it when we help each other out with a joyful heart?"
        ],
        weeklyChallenge: `Do one helpful chore at home today without being asked, to show your ${topicName}!`,
        rewardBadgeTitle: `${topicName} Explorer`,
        rewardBadgeEmoji: cat ? cat.emoji : "🌟",
        quiz: [
          {
            question: `What is today's main theme for Day ${day}?`,
            choices: [topicName, "Riding rollercoasters", "Eating cookies", "Building sandcastles"],
            correctIndex: 0,
            explanation: `Today we are exploring the beautiful biblical lesson of ${topicName}!`
          },
          {
            question: "Who can shine God's light in the world?",
            choices: ["Only giant heroes", "Every single boy and girl who chooses love", "Only kings", "Only birds"],
            correctIndex: 1,
            explanation: "You are never too small to shine God's bright light in the world!"
          },
          {
            question: "How should we serve one another according to the verse?",
            choices: ["With grumpy faces", "Humbly in love", "Only when we are paid", "Never"],
            correctIndex: 1,
            explanation: "The Bible teaches us to serve one another happily and humbly in love!"
          }
        ]
      };
      setStory(fallback);
      setupVerseGame(fallback.verseText);
    } finally {
      setIsLoading(false);
    }
  };

  // Text-To-Speech Narrator
  const toggleNarration = () => {
    if (!story) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${story.storyTitle}. ${story.storyText}`);
      utterance.rate = 0.85; // Cheerful storytelling pace
      utterance.pitch = 1.05;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Clean speaking on leave
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Save diary locally
  const handleSaveDiary = () => {
    if (!diaryText.trim()) return;
    setDiarySaved(true);
    
    // Save to diary storage
    const savedDiary = localStorage.getItem("kingdom_diary_pages") || "[]";
    const diaryList = JSON.parse(savedDiary);
    diaryList.push({
      id: `diary-${Date.now()}`,
      day: selectedDay,
      date: new Date().toLocaleDateString(),
      text: diaryText,
      storyTitle: story?.storyTitle
    });
    localStorage.setItem("kingdom_diary_pages", JSON.stringify(diaryList));
    onAddScore(20); // Earn 20 stars for journaling!
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  // Submit Quiz Question Choice
  const handleQuizChoiceClick = (choiceIdx: number) => {
    if (quizSubmitted) return;
    setSelectedChoice(choiceIdx);
  };

  const handleQuizSubmit = () => {
    if (selectedChoice === null || !story) return;

    const isCorrect = selectedChoice === story.quiz[currentQuizIndex].correctIndex;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
    setQuizSubmitted(true);
  };

  const handleNextQuizQuestion = () => {
    if (!story) return;

    if (currentQuizIndex < story.quiz.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedChoice(null);
      setQuizSubmitted(false);
    } else {
      setQuizCompleted(true);
      // Award stars based on score
      const bonusStars = quizScore * 20;
      onAddScore(bonusStars);
      
      // Mark day as completed
      if (selectedDay && !completedDays.includes(selectedDay)) {
        const updated = [...completedDays, selectedDay];
        setCompletedDays(updated);
        localStorage.setItem("kingdom_completed_days", JSON.stringify(updated));
      }
    }
  };

  // Claim Reward Badge
  const handleClaimBadge = () => {
    if (!story) return;
    setClaimedBadge(true);
    onAddScore(50); // Grand 50 stars prize for full completion!
    setShowCelebration(true);

    const newBadge = { title: story.rewardBadgeTitle, emoji: story.rewardBadgeEmoji };
    const updated = [...unlockedBadges, newBadge];
    setUnlockedBadges(updated);
    localStorage.setItem("kingdom_claimed_badges", JSON.stringify(updated));

    setTimeout(() => setShowCelebration(false), 3500);
  };

  return (
    <div className="space-y-6" id="three-sixty-five-stories-root">
      {/* Toast Celebration Alert */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-brand-olive border-4 border-brand-sand text-white px-6 py-4 rounded-[24px] shadow-xl text-center font-bold text-sm flex items-center gap-2.5"
          >
            <Sparkles className="w-5 h-5 text-brand-gold animate-bounce" />
            <span>🎉 Hooray! You earned golden stars and unlocked a holy reward! God bless you!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedDay ? (
        // Main Grid Explorer View
        <div className="space-y-6">
          {/* Main Hero Header Banner */}
          <div className="bg-gradient-to-r from-brand-olive via-brand-sage to-brand-sand p-6 rounded-[32px] text-white shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-brand-sand/50">
            <div className="relative z-10 space-y-2 text-center md:text-left">
              <span className="bg-white/20 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                🗓️ 365 Story Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-black font-serif tracking-tight text-brand-dark">
                365 Days Bible Stories!
              </h2>
              <p className="text-sm md:text-base text-brand-dark/90 max-w-xl font-medium">
                Walk through the entire holy scripture day-by-day! Read and learn beautiful daily stories, solve memory scrambles, write diary lessons, and claim glorious heaven rewards!
              </p>
              <div className="flex gap-4 pt-2 justify-center md:justify-start">
                <span className="bg-brand-cream/35 border border-brand-sand/40 text-brand-dark font-black text-xxs px-3 py-1.5 rounded-xl">
                  ⛵ OT Sections: 21
                </span>
                <span className="bg-brand-cream/35 border border-brand-sand/40 text-brand-dark font-black text-xxs px-3 py-1.5 rounded-xl">
                  🕊️ NT Sections: 13
                </span>
                <span className="bg-brand-gold/40 border border-brand-gold text-brand-dark font-black text-xxs px-3 py-1.5 rounded-xl">
                  🏆 Days Done: {completedDays.length} / 365
                </span>
              </div>
            </div>
            <div className="text-6xl md:text-8xl select-none mt-4 md:mt-0 animate-pulse">
              📖🌈
            </div>
          </div>

          {/* Testaments Selector Toggles */}
          <div className="flex bg-brand-stone p-1.5 rounded-2xl gap-2 max-w-sm mx-auto">
            <button
              onClick={() => handleSectionSwitch("Old Testament")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-colors ${
                activeSection === "Old Testament"
                  ? "bg-brand-olive text-white shadow-xs"
                  : "text-brand-sand hover:text-white"
              }`}
            >
              📜 Old Testament (Days 1-285)
            </button>
            <button
              onClick={() => handleSectionSwitch("New Testament")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-colors ${
                activeSection === "New Testament"
                  ? "bg-brand-olive text-white shadow-xs"
                  : "text-brand-sand hover:text-white"
              }`}
            >
              🕊️ New Testament (Days 286-365)
            </button>
          </div>

          {/* Categories Grid list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sidebar List of Categories */}
            <div className="bg-white border-2 border-brand-sand rounded-[28px] p-4 space-y-2 max-h-[480px] overflow-y-auto">
              <h3 className="text-xs font-black text-brand-stone uppercase tracking-wider px-2">
                Select Story Theme:
              </h3>
              <div className="space-y-1.5">
                {STORIES_CATEGORIES.filter(cat => cat.section === activeSection).map((cat) => {
                  const isSelected = selectedCategory?.id === cat.id;
                  // Count completed days in this category
                  const catDays = Array.from({length: cat.days[1] - cat.days[0] + 1}, (_, i) => cat.days[0] + i);
                  const completedInCat = catDays.filter(d => completedDays.includes(d)).length;
                  const totalInCat = catDays.length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                        isSelected 
                          ? "bg-brand-cream border-brand-olive shadow-xxs" 
                          : "border-brand-sand/40 hover:border-brand-olive/40 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{cat.emoji}</span>
                        <div>
                          <h4 className="text-xs font-extrabold text-brand-dark leading-tight">{cat.name}</h4>
                          <span className="text-[10px] text-brand-stone font-semibold">Days {cat.days[0]}-{cat.days[1]}</span>
                        </div>
                      </div>
                      
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        completedInCat === totalInCat ? "bg-emerald-100 text-emerald-800" : "bg-brand-sand/50 text-brand-stone"
                      }`}>
                        {completedInCat}/{totalInCat} Done
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Days Pathway Map of Selected Category */}
            <div className="md:col-span-2 bg-brand-cream/35 border-2 border-brand-sand rounded-[28px] p-6 flex flex-col justify-between min-h-[400px]">
              {selectedCategory && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-2.5 bg-white border border-brand-sand rounded-2xl shadow-xxs select-none">
                      {selectedCategory.emoji}
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold font-serif text-brand-dark">
                        Theme: {selectedCategory.name}
                      </h3>
                      <p className="text-xs text-brand-stone font-semibold leading-relaxed">
                        {selectedCategory.desc} (Days {selectedCategory.days[0]} to {selectedCategory.days[1]})
                      </p>
                    </div>
                  </div>

                  {/* Pathway / Map Route of Day Buttons */}
                  <div className="bg-white p-6 rounded-2xl border border-brand-sand/60 shadow-xxs">
                    <h4 className="text-xxs font-black text-brand-stone uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-olive" /> Adventure Map Path:
                    </h4>

                    <div className="flex flex-wrap gap-4 items-center justify-center py-2">
                      {Array.from(
                        { length: selectedCategory.days[1] - selectedCategory.days[0] + 1 },
                        (_, i) => selectedCategory.days[0] + i
                      ).map((day, idx) => {
                        const isDone = completedDays.includes(day);
                        const isPreloaded = !!PRELOADED_STORIES[day];
                        
                        return (
                          <div key={day} className="flex items-center relative">
                            <button
                              onClick={() => loadStoryForDay(day)}
                              className={`w-14 h-14 rounded-full font-black text-xs border-2 shadow-xxs cursor-pointer flex flex-col items-center justify-center transition-all ${
                                isDone 
                                  ? "bg-emerald-500 border-emerald-600 text-white hover:scale-105" 
                                  : "bg-white border-brand-olive text-brand-dark hover:bg-brand-cream hover:scale-105"
                              }`}
                            >
                              <span className="text-[9px] opacity-70">Day</span>
                              <span className="text-sm font-black leading-none">{day}</span>
                              {isDone && <Check className="w-3 h-3 absolute -top-1.5 -right-1.5 bg-emerald-100 border border-emerald-400 text-emerald-800 rounded-full p-0.5" />}
                              {isPreloaded && !isDone && <Sparkles className="w-3 h-3 absolute -top-1.5 -right-1.5 text-brand-gold animate-bounce" />}
                            </button>

                            {/* Little path line between days */}
                            {idx < (selectedCategory.days[1] - selectedCategory.days[0]) && (
                              <div className="hidden sm:block w-4 h-0.5 bg-brand-sand" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Locker Trophy badges display */}
              <div className="pt-4 mt-6 border-t border-brand-sand/65">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-brand-stone font-bold">
                    <Trophy className="w-4 h-4 text-brand-gold" />
                    <span>My claimed badges: ({unlockedBadges.length})</span>
                  </div>
                  {unlockedBadges.length > 0 && (
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to reset your journey score and badges?")) {
                          localStorage.removeItem("kingdom_completed_days");
                          localStorage.removeItem("kingdom_claimed_badges");
                          localStorage.removeItem("kingdom_diary_pages");
                          setCompletedDays([]);
                          setUnlockedBadges([]);
                        }
                      }}
                      className="text-[9px] font-bold text-red-500 hover:underline cursor-pointer"
                    >
                      Reset Progress
                    </button>
                  )}
                </div>
                
                {unlockedBadges.length === 0 ? (
                  <p className="text-[10px] text-brand-stone/60 font-semibold italic mt-2">
                    Complete stories to win beautiful holy trophy badges to display here!
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {unlockedBadges.map((b, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white border border-brand-sand px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xxs text-xxs font-black text-brand-dark"
                        title={b.title}
                      >
                        <span className="text-sm">{b.emoji}</span>
                        <span>{b.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Active Story Portal View
        <div className="space-y-6">
          {/* Top navigation row */}
          <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border-2 border-brand-sand shadow-xxs">
            <button
              onClick={() => setSelectedDay(null)}
              className="px-3 py-1.5 bg-brand-stone hover:bg-brand-olive text-white text-xs font-black rounded-xl cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Map
            </button>
            <div className="text-center">
              <span className="text-[10px] text-brand-stone font-bold uppercase tracking-widest block leading-none">
                Day {selectedDay} Adventure Story
              </span>
              <span className="text-xs font-extrabold text-brand-olive">
                {selectedCategory?.name} Theme
              </span>
            </div>
            <div className="flex gap-1">
              <button
                disabled={selectedDay <= 1}
                onClick={() => loadStoryForDay(selectedDay - 1)}
                className="p-1.5 bg-brand-cream border border-brand-sand rounded-lg hover:bg-brand-sand transition-all text-brand-stone disabled:opacity-40 cursor-pointer"
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={selectedDay >= 365}
                onClick={() => loadStoryForDay(selectedDay + 1)}
                className="p-1.5 bg-brand-cream border border-brand-sand rounded-lg hover:bg-brand-sand transition-all text-brand-stone disabled:opacity-40 cursor-pointer"
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isLoading ? (
            // Grand child-friendly loading screen
            <div className="bg-white border-2 border-brand-sand rounded-[32px] p-12 text-center space-y-6 shadow-xxs flex flex-col items-center justify-center min-h-[400px]">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-brand-sand border-t-brand-olive animate-spin" />
                <span className="absolute inset-0 flex items-center justify-center text-xl">⛵</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-serif text-brand-dark">Consulting the Holy Scriptures...</h3>
                <p className="text-xs text-brand-stone font-semibold max-w-sm mx-auto leading-relaxed">
                  Gathering ancient scrolls, building cozy animated scenes, preparing scrambles and quizzes for Day {selectedDay}... Please wait, little explorer!
                </p>
              </div>
            </div>
          ) : story ? (
            // Full interactive story view
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: Story text, Illustrated scene & Audio Narration */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* 1. Illustrated scene & Animation (Interactive playground) */}
                <div className="bg-gradient-to-b from-brand-cream to-brand-sand/40 border-3 border-brand-olive/35 rounded-[32px] p-6 relative overflow-hidden shadow-xxs">
                  {/* CSS Animated particles background depending on category */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-45">
                    {/* Bouncing waves for Noah / Jonah / Red Sea */}
                    {(selectedCategory?.id === "noah" || selectedCategory?.id === "jonah" || selectedCategory?.id === "moses") && (
                      <div className="absolute bottom-0 left-0 w-full flex justify-around">
                        <div className="w-10 h-10 bg-blue-300 rounded-full animate-bounce delay-100 opacity-60" />
                        <div className="w-14 h-14 bg-blue-200 rounded-full animate-bounce delay-500 opacity-50" />
                        <div className="w-8 h-8 bg-cyan-300 rounded-full animate-bounce delay-300 opacity-60" />
                      </div>
                    )}
                    {/* Floating stars for Creation / Birth of Jesus */}
                    {(selectedCategory?.id === "creation" || selectedCategory?.id === "birth_jesus" || selectedCategory?.id === "revelation") && (
                      <div className="absolute inset-0">
                        <div className="absolute top-[10%] left-[15%] w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-75" />
                        <div className="absolute top-[30%] right-[20%] w-2 h-2 bg-yellow-300 rounded-full animate-pulse delay-500" />
                        <div className="absolute top-[60%] left-[45%] w-4 h-4 bg-yellow-400 rounded-full animate-pulse delay-1000" />
                      </div>
                    )}
                    {/* Floating sheep for Shepherd stories */}
                    {(selectedCategory?.id === "david" || selectedCategory?.id === "isaac" || selectedCategory?.id === "parables") && (
                      <div className="absolute bottom-5 left-10 text-3xl animate-bounce duration-[3000ms] delay-300">🐑</div>
                    )}
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-4 relative z-10 py-6 text-center">
                    {/* Render visual emoji-based scene */}
                    <div className="text-7xl md:text-8xl select-none animate-bounce duration-1000">
                      {selectedCategory?.emoji}
                    </div>

                    <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-brand-sand max-w-md shadow-xxs">
                      <h4 className="text-[10px] font-black uppercase text-brand-olive tracking-widest flex items-center justify-center gap-1 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-brand-gold" /> Illustrated Scene
                      </h4>
                      <p className="text-[10px] text-brand-stone font-semibold italic leading-relaxed">
                        "{story.visualDescription}"
                      </p>
                    </div>
                  </div>

                  {/* Narration controls bar */}
                  <div className="bg-white/90 border border-brand-sand p-3 rounded-2xl flex items-center justify-between gap-4 mt-4 shadow-xxs">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-brand-olive animate-pulse" />
                      <span className="text-[10px] text-brand-stone font-black">🔊 Listen to Audio Narration:</span>
                    </div>

                    <button
                      onClick={toggleNarration}
                      className={`px-4 py-2 text-xxs font-black rounded-xl cursor-pointer transition-all flex items-center gap-1.5 ${
                        isSpeaking 
                          ? "bg-red-500 hover:bg-red-600 text-white" 
                          : "bg-brand-olive hover:bg-brand-stone text-white"
                      }`}
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" /> Stop Reading
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" /> Play Audio
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 2. Full Bible Story text card */}
                <div className="bg-white border-2 border-brand-sand rounded-[32px] p-6 md:p-8 space-y-4 shadow-xxs">
                  <span className="text-xxs text-brand-stone font-bold uppercase tracking-wider block">📖 Story Narrative:</span>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif text-brand-dark leading-tight">
                    {story.storyTitle}
                  </h2>
                  <p className="text-sm md:text-base text-brand-stone font-semibold leading-relaxed whitespace-pre-line text-justify">
                    {story.storyText}
                  </p>

                  {/* Main moral lesson */}
                  <div className="bg-brand-cream/45 border-l-4 border-brand-olive p-4 rounded-r-2xl space-y-1">
                    <h4 className="text-xs font-black text-brand-dark uppercase tracking-wider flex items-center gap-1.5">
                      💡 Main Takeaway Lesson:
                    </h4>
                    <p className="text-xs text-brand-stone font-semibold leading-relaxed">
                      {story.mainLesson}
                    </p>
                  </div>
                </div>

                {/* 3. Memory Verse Word Scramble Game */}
                <div className="bg-white border-2 border-brand-sand rounded-[32px] p-6 space-y-4 shadow-xxs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xxs text-brand-stone font-bold uppercase tracking-wider block">❤️ Memory Verse Shield:</span>
                      <h4 className="text-xs font-extrabold text-brand-dark">Solve the word scramble to claim your star prize!</h4>
                    </div>
                    <span className="text-xxs bg-brand-gold/20 text-brand-stone border border-brand-gold font-black px-2.5 py-1 rounded-full">
                      ⭐ +30 Stars
                    </span>
                  </div>

                  {/* Scrambled Area */}
                  <div className="bg-brand-sand/20 p-4 rounded-2xl border border-brand-sand space-y-3">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {scrambledWords.map((word, idx) => {
                        const isSelected = selectedWordsIndices.includes(idx);
                        return (
                          <button
                            key={idx}
                            disabled={verseSolved}
                            onClick={() => handleWordClick(idx, word)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border shadow-xxs transition-all cursor-pointer ${
                              isSelected
                                ? "bg-brand-olive border-brand-olive text-white"
                                : "bg-white border-brand-sand text-brand-stone hover:bg-brand-cream"
                            }`}
                          >
                            {word}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Solution Area */}
                  <div className="bg-brand-cream/30 p-4 rounded-2xl border-2 border-dashed border-brand-sand text-center min-h-[60px] flex items-center justify-center flex-col gap-1">
                    {selectedWordsIndices.length === 0 ? (
                      <span className="text-[11px] text-brand-stone/50 font-bold italic">
                        Click on scrambled words above in order to write out the memory verse!
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {selectedWordsIndices.map((idx) => (
                          <span key={idx} className="text-xs font-black text-brand-dark">
                            {scrambledWords[idx]}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Verification result */}
                  {verseSolved ? (
                    <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl p-3.5 text-center text-xs font-black flex items-center justify-center gap-1.5">
                      <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" />
                      <span>Hooray! Memory verse solved correctly! You unlocked the Scripture Verse Shield! ({story.verseReference})</span>
                    </div>
                  ) : selectedWordsIndices.length > 0 && (
                    <div className="flex justify-center">
                      <button
                        onClick={() => setSelectedWordsIndices([])}
                        className="text-xxs font-black text-brand-stone bg-brand-cream border border-brand-sand px-3 py-1.5 rounded-xl hover:bg-brand-sand cursor-pointer transition-colors flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Clear and Retry
                      </button>
                    </div>
                  )}
                </div>

                {/* 4. Parent Discussion questions section */}
                <div className="bg-white border-2 border-brand-sand rounded-[32px] p-6 space-y-3 shadow-xxs">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-black text-brand-dark uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-brand-olive" /> 💬 Parenting Discussion Questions:
                    </h4>
                    <button
                      onClick={() => setShowQuestions(!showQuestions)}
                      className="text-xxs font-extrabold text-brand-olive hover:underline cursor-pointer"
                    >
                      {showQuestions ? "Hide Questions" : "Show Questions"}
                    </button>
                  </div>

                  {showQuestions && (
                    <div className="bg-brand-cream/35 p-4 rounded-2xl border border-brand-sand/60 space-y-3">
                      <p className="text-[10px] text-brand-stone font-semibold italic">
                        Parents: Ask your child these friendly, open questions to talk about daily virtues and God's wisdom together!
                      </p>
                      <div className="space-y-2">
                        {story.discussionQuestions.map((q, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start">
                            <span className="w-5 h-5 rounded-full bg-brand-olive text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <p className="text-xs text-brand-dark font-semibold">
                              {q}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Quiz, Prayer, Weekly Challenge & Badges */}
              <div className="space-y-6">

                {/* 1. Prayer Card */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 border border-indigo-400 rounded-[32px] p-6 text-white space-y-4 shadow-xxs">
                  <span className="text-[10px] bg-white/20 text-white font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest inline-block leading-none">
                    🙏 Daily Devotion Prayer
                  </span>
                  <div className="space-y-2">
                    <p className="text-xs md:text-sm font-semibold leading-relaxed italic text-indigo-50">
                      "{story.prayer}"
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowCelebration(true);
                      setTimeout(() => setShowCelebration(false), 3000);
                    }}
                    className="w-full py-2.5 bg-white hover:bg-indigo-50 text-indigo-700 text-xs font-black rounded-xl cursor-pointer shadow-xs transition-colors"
                  >
                    ❤️ Say Amen!
                  </button>
                </div>

                {/* 2. Interactive Quiz Quest */}
                <div className="bg-white border-2 border-brand-sand rounded-[32px] p-6 space-y-4 shadow-xxs">
                  <div className="flex justify-between items-center">
                    <span className="text-xxs text-brand-stone font-bold uppercase tracking-wider block">🎮 Quiz Quest level:</span>
                    <span className="text-xxs bg-brand-gold/20 text-brand-stone border border-brand-gold font-black px-2.5 py-1 rounded-full">
                      ⭐ +20 Stars / correct
                    </span>
                  </div>

                  {!quizCompleted ? (
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] text-brand-stone font-bold">
                        <span>Question {currentQuizIndex + 1} of {story.quiz.length}</span>
                        <span>Score: {quizScore}</span>
                      </div>
                      
                      <div className="h-1.5 bg-brand-sand/50 rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${((currentQuizIndex + 1) / story.quiz.length) * 100}%` }}
                          className="h-full bg-brand-olive rounded-full transition-all"
                        />
                      </div>

                      <h4 className="text-xs font-extrabold text-brand-dark leading-tight">
                        {story.quiz[currentQuizIndex].question}
                      </h4>

                      <div className="space-y-2">
                        {story.quiz[currentQuizIndex].choices.map((choice, idx) => {
                          const isSelected = selectedChoice === idx;
                          const isCorrect = idx === story.quiz[currentQuizIndex].correctIndex;
                          
                          let btnStyle = "border-brand-sand hover:border-brand-olive bg-white text-brand-dark";
                          if (isSelected) {
                            btnStyle = "bg-brand-cream border-brand-olive text-brand-dark";
                          }
                          if (quizSubmitted) {
                            if (isCorrect) {
                              btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-800 font-extrabold";
                            } else if (isSelected) {
                              btnStyle = "bg-rose-100 border-rose-500 text-rose-800";
                            } else {
                              btnStyle = "opacity-45 border-brand-sand bg-white text-brand-stone";
                            }
                          }

                          return (
                            <button
                              key={idx}
                              disabled={quizSubmitted}
                              onClick={() => handleQuizChoiceClick(idx)}
                              className={`w-full text-left p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${btnStyle}`}
                            >
                              {idx + 1}. {choice}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation details */}
                      {quizSubmitted && (
                        <div className="bg-brand-cream/25 p-3 rounded-xl border border-brand-sand text-[10px] text-brand-stone leading-relaxed font-semibold">
                          💡 {story.quiz[currentQuizIndex].explanation}
                        </div>
                      )}

                      {/* Controls */}
                      <div className="pt-2">
                        {!quizSubmitted ? (
                          <button
                            disabled={selectedChoice === null}
                            onClick={handleQuizSubmit}
                            className="w-full py-2.5 bg-brand-olive hover:bg-brand-stone disabled:opacity-45 text-white text-xs font-black rounded-xl cursor-pointer shadow-xs transition-colors"
                          >
                            Submit Answer
                          </button>
                        ) : (
                          <button
                            onClick={handleNextQuizQuestion}
                            className="w-full py-2.5 bg-brand-stone hover:bg-brand-olive text-white text-xs font-black rounded-xl cursor-pointer shadow-xs transition-colors flex items-center justify-center gap-1.5"
                          >
                            <span>{currentQuizIndex < story.quiz.length - 1 ? "Next Question" : "Complete Quiz"}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Quiz Success screen
                    <div className="text-center space-y-4 py-4">
                      <div className="w-16 h-16 bg-emerald-100 border-2 border-emerald-300 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto animate-bounce">
                        🎉
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-brand-dark">Quiz Completed Successfully!</h4>
                        <p className="text-xs text-brand-stone font-semibold">
                          You scored {quizScore} out of {story.quiz.length} correctly and earned {quizScore * 20} bonus stars! Day {selectedDay} has been recorded on your Map path.
                        </p>
                      </div>

                      {/* Claim Trophy Badge area */}
                      {!claimedBadge ? (
                        <div className="bg-brand-cream/45 p-4 rounded-2xl border-2 border-dashed border-brand-sand space-y-3">
                          <span className="text-[10px] font-bold text-brand-stone block uppercase tracking-wider">Unlocking holy reward badge...</span>
                          <div className="text-4xl select-none">{story.rewardBadgeEmoji}</div>
                          <h5 className="font-extrabold text-xs text-brand-dark leading-none">{story.rewardBadgeTitle} Badge</h5>
                          <button
                            onClick={handleClaimBadge}
                            className="w-full py-2 bg-brand-olive hover:bg-brand-stone text-white text-xxs font-black rounded-xl cursor-pointer shadow-xs transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Trophy className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" /> Claim Badge & +50 Stars!
                          </button>
                        </div>
                      ) : (
                        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-emerald-800 text-[10px] font-bold flex items-center justify-center gap-1.5">
                          <Check className="w-4 h-4" /> Badge {story.rewardBadgeTitle} Claimed Successfully!
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 3. Diary Page */}
                <div className="bg-white border-2 border-brand-sand rounded-[32px] p-6 space-y-3 shadow-xxs">
                  <div className="flex justify-between items-center">
                    <span className="text-xxs text-brand-stone font-bold uppercase tracking-wider block">📝 My Kingdom Diary:</span>
                    <span className="text-xxs bg-brand-gold/20 text-brand-stone border border-brand-gold font-black px-2.5 py-1 rounded-full">
                      ⭐ +20 Stars
                    </span>
                  </div>

                  {diarySaved ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center text-xs text-emerald-800 font-extrabold flex items-center justify-center flex-col gap-1.5">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                      <span>Diary saved successfully inside Parent Vault!</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <textarea
                        rows={3}
                        value={diaryText}
                        onChange={(e) => setDiaryText(e.target.value)}
                        placeholder="What did you learn from this story today? Type your happy thoughts here..."
                        className="w-full p-3 border-2 border-brand-sand rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-olive"
                      />
                      <button
                        disabled={!diaryText.trim()}
                        onClick={handleSaveDiary}
                        className="w-full py-2 bg-brand-cream border border-brand-sand hover:bg-brand-sand text-brand-stone text-xs font-black rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Save className="w-4 h-4 text-brand-olive" /> Save to My Diary
                      </button>
                    </div>
                  )}
                </div>

                {/* 4. Weekly Challenge */}
                <div className="bg-amber-50 border-2 border-amber-200 rounded-[32px] p-6 space-y-2 shadow-xxs">
                  <span className="text-[10px] bg-amber-100 border border-amber-300 text-amber-800 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block leading-none">
                    ⭐ Weekly Action Challenge
                  </span>
                  <p className="text-xs text-brand-stone font-semibold leading-relaxed">
                    {story.weeklyChallenge}
                  </p>
                </div>

              </div>

            </div>
          ) : (
            // Fail/Error template
            <div className="bg-white border-2 border-brand-sand rounded-[32px] p-12 text-center space-y-4 shadow-xxs flex flex-col items-center justify-center min-h-[400px]">
              <ShieldAlert className="w-12 h-12 text-red-500 animate-pulse" />
              <div className="space-y-2">
                <h3 className="text-lg font-bold font-serif text-red-700">Unable to load story</h3>
                <p className="text-xs text-brand-stone font-semibold max-w-sm leading-relaxed">
                  We encountered an error loading the story for Day {selectedDay}. Make sure your local internet connection is fully active!
                </p>
                <button
                  onClick={() => loadStoryForDay(selectedDay)}
                  className="px-4 py-2 bg-brand-olive text-white text-xs font-black rounded-xl hover:bg-brand-stone transition-all cursor-pointer mt-2"
                >
                  Retry Loading
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
