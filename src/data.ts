import { Story, Quiz, BibleHero, MemoryVerse, ColoringPage } from "./types";

export const BIBLE_HEROES: BibleHero[] = [
  {
    id: "moses",
    name: "Moses",
    title: "The Great Leader",
    emoji: "🧔🏽‍♂️⚡",
    bgGradient: "from-sky-100 to-sky-200",
    borderColor: "border-sky-300",
    textColor: "text-sky-800",
    greeting: "Peace be with you, young seeker! I am Moses. I saw God's power in the burning bush and crossed the mighty Red Sea. Ask me anything!",
    description: "Led God's family, received the Ten Commandments, and parted the Red Sea!"
  },
  {
    id: "esther",
    name: "Queen Esther",
    title: "The Brave Queen",
    emoji: "👑✨",
    bgGradient: "from-pink-100 to-pink-200",
    borderColor: "border-pink-300",
    textColor: "text-pink-800",
    greeting: "Hello, brave heart! I am Esther. God placed me in the palace 'for such a time as this' to save my people. Remember, you are brave and loved!",
    description: "A courageous young girl who became queen and saved her entire people from harm."
  },
  {
    id: "noah",
    name: "Noah",
    title: "The Ark Builder",
    emoji: "👴🏼🦒",
    bgGradient: "from-emerald-100 to-emerald-200",
    borderColor: "border-emerald-300",
    textColor: "text-emerald-800",
    greeting: "Welcome aboard! I am Noah. Build with faith, for God always keeps His promises. Hear the lions roar and see the lovely rainbow!",
    description: "Built the giant wooden Ark, saved all the animals, and saw the first rainbow of promise."
  },
  {
    id: "david",
    name: "King David",
    title: "The Shepherd Boy",
    emoji: "🎯🐑",
    bgGradient: "from-amber-100 to-amber-200",
    borderColor: "border-amber-300",
    textColor: "text-amber-800",
    greeting: "Hi there! I am David. Once a shepherd boy playing songs under the stars, I defeated a giant with just a small stone. God is our strength!",
    description: "A brave shepherd who played the harp, wrote lovely Psalms, and defeated Goliath."
  }
];

export const PRESET_STORIES: Story[] = [
  {
    id: "noahs-ark",
    title: "Noah and the Great Rainbow",
    category: "Old Testament",
    emoji: "🌈🦒",
    description: "Follow Noah as he builds a giant wooden boat for all the animals and witnesses God's beautiful promise.",
    moral: "Trust in God's promises—He will always guide us safely through the rain.",
    verse: "I have set my rainbow in the clouds, and it will be the sign of the covenant between me and the earth. - Genesis 9:13",
    scenes: [
      {
        title: "Part 1: The Big Mission",
        text: "Long ago, a kind man named Noah listened to God's voice. God told him, 'Noah, a big rain is coming! I want you to build a giant wooden boat called an Ark.' Noah trusted God completely. He gathered wood and hammers and began building under the warm sun, even when others didn't believe him.",
        illustrationPrompt: "A friendly happy cartoon of an old man Noah building a large wooden ark with hammers, bright sunny sky, friendly animals watching",
        fallbackImage: "🌊🔨"
      },
      {
        title: "Part 2: Two by Two",
        text: "Knock, knock! Tap, tap! The giant Ark was finally finished. Then, the most amazing parade began! Animals of every shape, size, and sound came marching in pairs. Two tall giraffes, two playful monkeys, two sleepy lions, and two soft doves. Noah welcomed them all into their cozy floating home.",
        illustrationPrompt: "Friendly vector cartoon of animals entering a large wooden ark two-by-two, giraffes, elephants, lions, doves flying, colorful cute style",
        fallbackImage: "🐘🦁"
      },
      {
        title: "Part 3: The Beautiful Promise",
        text: "The rain fell pit-a-pat for forty days, but Noah and the animals were perfectly safe and warm inside. When the storm finally stopped, Noah opened a window. The sun shone bright, and a brilliant, colorful rainbow painted the entire sky. God promised, 'Never again will a flood cover the earth. The rainbow is my promise of love.'",
        illustrationPrompt: "A giant beautiful colorful rainbow in a blue sky over a wooden ark resting on a green mountain, Noah waving joyfully, happy animals",
        fallbackImage: "🌈✨"
      }
    ]
  },
  {
    id: "david-goliath",
    title: "David and the Giant Battle",
    category: "Old Testament",
    emoji: "🎯🪨",
    description: "A young shepherd boy trusts in God's power and stands up against a massive giant who frightened an entire army.",
    moral: "With God on our side, no problem is too big for us to overcome.",
    verse: "The Lord is my light and my salvation—whom shall I fear? - Psalm 27:1",
    scenes: [
      {
        title: "Part 1: The Brave Shepherd",
        text: "Young David was a small shepherd boy who loved to play the harp and write songs of praise to God. Every day, he protected his sheep from hungry lions and bears, using only a small slingshot and his faith in God. He knew God was always watching over him, even in the lonely meadows.",
        illustrationPrompt: "A young shepherd boy David playing a harp in a green meadow with fluffy sheep, warm sun, colorful friendly cartoon",
        fallbackImage: "🐑🎶"
      },
      {
        title: "Part 2: The Giant Challenge",
        text: "One day, David went to visit his brothers in the army. There, he saw a giant named Goliath, who was over nine feet tall! Goliath shouted and made everyone afraid. No soldier was brave enough to face him. But David said, 'I will not fear! God who saved me from the bear will save me today.'",
        illustrationPrompt: "A massive friendly-looking armored giant Goliath standing on a hill, looking down at a confident young shepherd boy David, cartoon style",
        fallbackImage: "🛡️🧔"
      },
      {
        title: "Part 3: Trust and Victory",
        text: "David did not wear heavy armor. He took only five smooth stones from the stream, his slingshot, and his faith. As Goliath marched forward, David ran with courage, swung his sling, and released a stone. Whiz! The stone flew true, and Goliath fell down! The entire country was saved because one brave boy trusted God.",
        illustrationPrompt: "David victorious, cheering joyfully with a sling, friendly soldiers celebrating in the background, pastel colors, kid illustration",
        fallbackImage: "👑🎯"
      }
    ]
  },
  {
    id: "jonah-fish",
    title: "Jonah and the Big Friendly Fish",
    category: "Old Testament",
    emoji: "🐋⛵",
    description: "Jonah tries to run away from God's instruction, but discovers that God's love and forgiveness are deeper than the ocean.",
    moral: "God always gives us second chances when we say we are sorry.",
    verse: "In my distress I called to the Lord, and he answered me. - Jonah 2:2",
    scenes: [
      {
        title: "Part 1: The Great Escape",
        text: "God asked Jonah to go to a city called Nineveh and share a message of love. But Jonah was afraid and didn't want to go! He hopped onto a big wooden ship sailing in the opposite direction. He thought he could hide from God, but a huge, windy storm began to roll and rock the boat.",
        illustrationPrompt: "A wooden sailing ship in a big, rolling ocean storm, dark clouds, waves, Jonah looking worried on deck, cartoon illustration",
        fallbackImage: "⛵🌧️"
      },
      {
        title: "Part 2: The Cozy Rescue",
        text: "To save the ship, Jonah told the sailors, 'Throw me into the sea, and the storm will calm.' When he went splash! into the cold water, the storm stopped instantly. But Jonah was not lost! God sent a giant, friendly fish that swallowed him whole. Inside the dark, warm belly, Jonah prayed and said, 'I am sorry, God!'",
        illustrationPrompt: "A cute, giant friendly whale/fish in the deep blue sea swallowing Jonah, lots of underwater bubbles, friendly sea creatures, kids cartoon",
        fallbackImage: "🐋🫧"
      },
      {
        title: "Part 3: Second Chances",
        text: "For three days and nights, Jonah stayed safe inside the whale. Then, with a big GULP and a splash, the whale gently spat Jonah out onto dry, sandy grass. Jonah ran straight to Nineveh, told everyone about God's wonderful love, and the whole city rejoiced. Jonah learned that God's mercy is bigger than the sea!",
        illustrationPrompt: "A giant whale waving its tail, Jonah standing happily on a sunny sandy beach, bright sunshine, palm trees, colorful cute art",
        fallbackImage: "🏖️✨"
      }
    ]
  },
  {
    id: "jesus-birth",
    title: "The Starry Night of Jesus' Birth",
    category: "New Testament",
    emoji: "🌟👶",
    description: "Celebrate the birth of Baby Jesus in a small, humble stable beneath a massive, glowing star.",
    moral: "The greatest gifts are not bought in stores, but are wrapped in love and simplicity.",
    verse: "Today in the town of David a Savior has been born to you; he is the Messiah, the Lord. - Luke 2:11",
    scenes: [
      {
        title: "Part 1: No Room at the Inn",
        text: "Mary and Joseph took a long journey on a small donkey to a town called Bethlehem. The streets were crowded, and Mary was very tired because a baby was on the way! They knocked on many doors, but there was no room for them anywhere. Finally, a kind innkeeper offered them a cozy barn filled with hay.",
        illustrationPrompt: "Mary riding a cute gray donkey, Joseph walking alongside, approaching a warm stone house under a beautiful starry twilight, cartoon",
        fallbackImage: "🫏🏠"
      },
      {
        title: "Part 2: The Brightest Star",
        text: "That quiet, magical night, Baby Jesus was born! Mary wrapped him warmly and laid him in a manager filled with clean, sweet hay. High above the stable, God lit up a spectacular, shining star that beamed like a celestial flashlight, guiding shepherds and animals to see the special baby.",
        illustrationPrompt: "Baby Jesus sleeping in a wooden manger, Mary and Joseph looking lovingly, a massive shining star above casting golden light, animal onlookers",
        fallbackImage: "👶✨"
      },
      {
        title: "Part 3: The Shepherds and Angels",
        text: "Out in the fields, shepherds were watching their sheep when suddenly, the night sky filled with glowing angels singing, 'Glory to God in the highest, and peace on earth!' The shepherds ran to the stable and found the baby. They praised God for sending Jesus, the light of the whole world.",
        illustrationPrompt: "Happy cartoon shepherds with sheep looking up at glowing friendly angels in a starlit blue sky, music notes, happy pastel graphics",
        fallbackImage: "👼🎶"
      }
    ]
  }
];

export const PRESET_QUIZZES: Record<string, Quiz> = {
  beginner: {
    title: "Noah & Friends Quest",
    questions: [
      {
        question: "What did Noah build to save the animals?",
        choices: ["A tall castle", "A giant wooden Ark", "A bridge of ropes", "A stone lighthouse"],
        correctIndex: 1,
        explanation: "Noah built a giant wooden Ark following God's exact instructions to keep everyone safe!"
      },
      {
        question: "How many of each animal did Noah take on the Ark?",
        choices: ["Two of each kind", "Ten of each kind", "Only the fluffy ones", "None, they swam!"],
        correctIndex: 0,
        explanation: "Noah took two of each animal, a male and a female, so they could stay together!"
      },
      {
        question: "What beautiful sign of promise appeared in the sky after the rain?",
        choices: ["A golden cloud", "A shooting star", "A colorful rainbow", "A glowing moon"],
        correctIndex: 2,
        explanation: "A beautiful colorful rainbow appeared! God promised He would always protect the earth."
      }
    ]
  },
  explorer: {
    title: "Brave Heroes Quest",
    questions: [
      {
        question: "What did young David use to defeat the giant Goliath?",
        choices: ["A heavy metal sword", "A magical wooden staff", "A slingshot and a stone", "A giant net"],
        correctIndex: 2,
        explanation: "David trusted God and used a simple slingshot with a single smooth stone!"
      },
      {
        question: "Where was Jonah safe for three days and three nights?",
        choices: ["Inside a giant fish", "In a cozy forest cave", "In a palace bedroom", "On top of a high tree"],
        correctIndex: 0,
        explanation: "God sent a giant, friendly fish to rescue Jonah and give him a second chance."
      },
      {
        question: "Who became a brave queen and saved her people from danger?",
        choices: ["Queen Miriam", "Queen Sarah", "Queen Esther", "Queen Martha"],
        correctIndex: 2,
        explanation: "Queen Esther used her courage and crown to stand up and protect her people!"
      }
    ]
  },
  hero: {
    title: "New Testament Wonders",
    questions: [
      {
        question: "In what town was Baby Jesus born?",
        choices: ["Jerusalem", "Bethlehem", "Nazareth", "Rome"],
        correctIndex: 1,
        explanation: "Baby Jesus was born in the quiet, starry town of Bethlehem, in a warm, humble stable!"
      },
      {
        question: "What did the wise men follow to find Baby Jesus?",
        choices: ["A shining bright star", "A secret treasure map", "The sounds of a harp", "A trail of gold coins"],
        correctIndex: 0,
        explanation: "The wise men followed a beautiful, giant star in the east that stopped directly over the stable!"
      },
      {
        question: "How did Jesus calm the big storm on the sea?",
        choices: ["By swimming fast", "By saying 'Peace, be still!'", "By using a giant fan", "By throwing bread"],
        correctIndex: 1,
        explanation: "Jesus said to the roaring waves, 'Peace, be still!' and the lake became perfectly calm!"
      }
    ]
  }
};

export const MEMORY_VERSES: MemoryVerse[] = [
  {
    verse: "God is love.",
    reference: "1 John 4:8",
    points: 10
  },
  {
    verse: "The Lord is my shepherd; I shall not want.",
    reference: "Psalm 23:1",
    points: 15
  },
  {
    verse: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13",
    points: 20
  },
  {
    verse: "Trust in the Lord with all your heart.",
    reference: "Proverbs 3:5",
    points: 20
  },
  {
    verse: "Your word is a lamp to my feet and a light to my path.",
    reference: "Psalm 119:105",
    points: 25
  }
];

export const COLORING_PAGES: ColoringPage[] = [
  {
    id: "noahs-ark-color",
    title: "Noah's Ark Adventure",
    emoji: "⛵🌧️",
    shapes: [
      { type: "rect", x: 0, y: 0, width: 400, height: 300, defaultFill: "#E0F2FE" }, // Sky background
      { type: "circle", cx: 80, cy: 70, r: 40, defaultFill: "#FEF08A" }, // Sun
      // Rainbow arcs
      { type: "path", d: "M 20 200 A 180 180 0 0 1 380 200", defaultFill: "none" }, // Guide line
      // Sea/waves
      { type: "path", d: "M 0 220 Q 100 200 200 220 T 400 220 L 400 300 L 0 300 Z", defaultFill: "#38BDF8" },
      // Ark Hull
      { type: "polygon", points: "80,180 320,180 290,230 110,230", defaultFill: "#78350F" },
      // Ark Cabin
      { type: "rect", x: 130, y: 130, width: 140, height: 50, defaultFill: "#D97706" },
      // Ark Roof
      { type: "polygon", points: "110,130 290,130 260,110 140,110", defaultFill: "#92400E" },
      // Windows
      { type: "circle", cx: 160, cy: 155, r: 12, defaultFill: "#FFFFFF" },
      { type: "circle", cx: 240, cy: 155, r: 12, defaultFill: "#FFFFFF" },
      // Dove carrying olive leaf
      { type: "path", d: "M 270 80 Q 285 70 300 80 Q 290 90 280 90 Z", defaultFill: "#F8FAFC" }
    ]
  },
  {
    id: "david-slingshot-color",
    title: "David's Shepherd Victory",
    emoji: "🎯🛡️",
    shapes: [
      { type: "rect", x: 0, y: 0, width: 400, height: 300, defaultFill: "#FDF4E3" }, // Soft background
      // Goliath's massive shield outline
      { type: "polygon", points: "200,40 280,70 280,170 200,220 120,170 120,70", defaultFill: "#94A3B8" },
      // Star inside shield
      { type: "polygon", points: "200,80 215,115 250,115 220,135 232,170 200,150 168,170 180,135 150,115 185,115", defaultFill: "#F59E0B" },
      // Shepherd's slingshot
      { type: "path", d: "M 80 180 L 100 230 L 100 280 M 100 230 L 120 180", defaultFill: "#B45309" }, // Slingshot wood fork
      { type: "path", d: "M 80 180 Q 100 200 120 180", defaultFill: "#EF4444" }, // Sling strap
      // Five smooth stones
      { type: "circle", cx: 160, cy: 260, r: 15, defaultFill: "#D1D5DB" },
      { type: "circle", cx: 195, cy: 255, r: 12, defaultFill: "#9CA3AF" },
      { type: "circle", cx: 225, cy: 265, r: 14, defaultFill: "#E5E7EB" },
      { type: "circle", cx: 255, cy: 258, r: 11, defaultFill: "#D1D5DB" },
      { type: "circle", cx: 285, cy: 262, r: 13, defaultFill: "#F3F4F6" }
    ]
  },
  {
    id: "star-manger-color",
    title: "The Star of Bethlehem",
    emoji: "🌟👶",
    shapes: [
      { type: "rect", x: 0, y: 0, width: 400, height: 300, defaultFill: "#1E1B4B" }, // Night sky background
      // Big Star of Bethlehem (8-pointed star)
      { type: "polygon", points: "200,20 210,60 250,60 215,80 235,120 200,95 165,120 185,80 150,60 190,60", defaultFill: "#FDE047" },
      // Light beams from the star
      { type: "polygon", points: "198,90 202,90 220,290 180,290", defaultFill: "#FEF08A" },
      // Humble Manger bed (stable outline)
      { type: "polygon", points: "80,260 320,260 290,190 110,190", defaultFill: "none" }, // border only
      { type: "rect", x: 130, y: 210, width: 140, height: 60, defaultFill: "#78350F" }, // Manger box
      { type: "polygon", points: "110,210 290,210 200,160", defaultFill: "#B45309" }, // Roof structure
      // Baby swaddling clothes
      { type: "circle", cx: 200, cy: 220, r: 18, defaultFill: "#FFFBEB" },
      // Hay in the manger
      { type: "path", d: "M 135 210 L 150 195 M 165 210 L 160 190 M 190 210 L 195 195 M 225 210 L 215 190 M 255 210 L 265 195", defaultFill: "#EAB308" }
    ]
  },
  {
    id: "jonah-fish-color",
    title: "Jonah & Cozy Blue Whale",
    emoji: "🐋🫧",
    shapes: [
      { type: "rect", x: 0, y: 0, width: 400, height: 120, defaultFill: "#E0F2FE" }, // Light blue sky
      { type: "circle", cx: 330, cy: 45, r: 25, defaultFill: "#FEF08A" }, // Happy sun
      { type: "rect", x: 0, y: 120, width: 400, height: 180, defaultFill: "#0284C7" }, // Ocean depths
      // Rolling ocean waves on top
      { type: "path", d: "M 0 120 Q 50 100 100 120 T 200 120 T 300 120 T 400 120 L 400 300 L 0 300 Z", defaultFill: "#0369A1" },
      // Jonah's little wooden boat rocking on top
      { type: "polygon", points: "50,110 130,110 110,140 70,140", defaultFill: "#78350F" },
      { type: "polygon", points: "90,60 90,110 125,110", defaultFill: "#F8FAFC" }, // Sail
      // The Big Friendly Blue Whale
      { type: "path", d: "M 130 200 C 130 150, 290 140, 310 180 C 330 160, 350 150, 360 170 C 370 190, 340 210, 310 210 C 270 240, 160 250, 130 200 Z", defaultFill: "#0EA5E9" },
      // Whale tail fin
      { type: "polygon", points: "360,170 380,145 375,185 355,175", defaultFill: "#38BDF8" },
      // Whale underbelly stripes
      { type: "path", d: "M 160 215 Q 200 235 240 222", defaultFill: "#BAE6FD" },
      // Whale friendly eye
      { type: "circle", cx: 165, cy: 180, r: 5, defaultFill: "#1E293B" },
      // Spouting water fountain
      { type: "path", d: "M 220 155 Q 220 125 200 120 M 220 155 Q 230 125 250 120", defaultFill: "#E0F2FE" },
      // Pretty bubbles
      { type: "circle", cx: 90, cy: 190, r: 8, defaultFill: "#BAE6FD" },
      { type: "circle", cx: 75, cy: 215, r: 12, defaultFill: "#E0F2FE" },
      { type: "circle", cx: 105, cy: 245, r: 5, defaultFill: "#BAE6FD" }
    ]
  },
  {
    id: "daniel-lions-color",
    title: "Daniel & Loving Lions",
    emoji: "🦁❤️",
    shapes: [
      { type: "rect", x: 0, y: 0, width: 400, height: 300, defaultFill: "#FAF7F5" }, // Cave wall background
      // Majestic rock archway for the den
      { type: "path", d: "M 40 300 L 40 120 A 160 160 0 0 1 360 120 L 360 300 Z", defaultFill: "#78716C" },
      // Bright glowing light representing God's protecting angel presence
      { type: "circle", cx: 200, cy: 110, r: 45, defaultFill: "#FEF08A" },
      // Daniel praying happily in the light
      { type: "circle", cx: 200, cy: 135, r: 14, defaultFill: "#FFD8A8" }, // Daniel's head
      { type: "polygon", points: "175,220 225,220 200,149", defaultFill: "#818CF8" }, // Daniel's robe
      { type: "polygon", points: "194,175 206,175 200,160", defaultFill: "#FFD8A8" }, // Praying hands
      // Big friendly lion on the left
      { type: "path", d: "M 50 215 A 30 30 0 1 1 110 215 A 30 30 0 1 1 110 275 A 30 30 0 1 1 50 275 A 30 30 0 1 1 50 215", defaultFill: "#EA580C" }, // Fluffy mane
      { type: "circle", cx: 80, cy: 245, r: 25, defaultFill: "#F59E0B" }, // Lion head
      { type: "circle", cx: 65, cy: 220, r: 8, defaultFill: "#D97706" }, // Left ear
      { type: "circle", cx: 95, cy: 220, r: 8, defaultFill: "#D97706" }, // Right ear
      { type: "polygon", points: "76,245 84,245 80,251", defaultFill: "#78350F" }, // Cute nose
      // Big friendly lion on the right
      { type: "path", d: "M 290 215 A 30 30 0 1 1 350 215 A 30 30 0 1 1 350 275 A 30 30 0 1 1 290 275 A 30 30 0 1 1 290 215", defaultFill: "#EA580C" }, // Mane
      { type: "circle", cx: 320, cy: 245, r: 25, defaultFill: "#F59E0B" }, // Lion head
      { type: "circle", cx: 305, cy: 220, r: 8, defaultFill: "#D97706" }, // Ear
      { type: "circle", cx: 335, cy: 220, r: 8, defaultFill: "#D97706" }, // Ear
      { type: "polygon", points: "316,245 324,245 320,251", defaultFill: "#78350F" }, // Nose
      // Tiny floating hearts of love and safety
      { type: "path", d: "M 150 140 Q 140 120 150 110 T 160 140 Z", defaultFill: "#F43F5E" },
      { type: "path", d: "M 250 140 Q 240 120 250 110 T 260 140 Z", defaultFill: "#F43F5E" }
    ]
  },
  {
    id: "creation-garden-color",
    title: "Eden's Happy Garden",
    emoji: "🍎🌸",
    shapes: [
      { type: "rect", x: 0, y: 0, width: 400, height: 300, defaultFill: "#F0FDF4" }, // Sky/breeze background
      { type: "circle", cx: 340, cy: 50, r: 28, defaultFill: "#FEF08A" }, // Golden warm sun
      // Soft rolling green meadow hills
      { type: "path", d: "M -20 220 Q 120 160 260 200 T 420 210 L 420 300 L -20 300 Z", defaultFill: "#4ADE80" }, // Back grass
      { type: "path", d: "M -20 250 Q 150 215 320 240 T 420 240 L 420 300 L -20 300 Z", defaultFill: "#22C55E" }, // Front grass
      // Large Apple Tree of life
      { type: "rect", x: 80, y: 130, width: 30, height: 120, defaultFill: "#78350F" }, // Tree trunk
      { type: "path", d: "M 45 130 C 20 100, 50 50, 95 60 C 110 30, 160 40, 160 80 C 190 90, 170 140, 135 140 C 115 155, 65 155, 45 130 Z", defaultFill: "#15803D" }, // Fluffy foliage
      // Red sweet apples in the tree
      { type: "circle", cx: 70, cy: 90, r: 8, defaultFill: "#EF4444" },
      { type: "circle", cx: 120, cy: 80, r: 8, defaultFill: "#EF4444" },
      { type: "circle", cx: 140, cy: 110, r: 8, defaultFill: "#EF4444" },
      { type: "circle", cx: 95, cy: 120, r: 8, defaultFill: "#EF4444" },
      // Beautiful flowers on the meadows
      { type: "path", d: "M 230 260 L 230 230", defaultFill: "#16A34A" }, // Flower 1 stem
      { type: "circle", cx: 230, cy: 220, r: 10, defaultFill: "#F43F5E" }, // Flower 1 petals
      { type: "circle", cx: 230, cy: 220, r: 4, defaultFill: "#FBBF24" }, // Flower 1 core
      { type: "path", d: "M 310 270 L 310 240", defaultFill: "#16A34A" }, // Flower 2 stem
      { type: "circle", cx: 310, cy: 230, r: 10, defaultFill: "#A855F7" }, // Flower 2 petals
      { type: "circle", cx: 310, cy: 230, r: 4, defaultFill: "#FEF08A" }, // Flower 2 core
      // Cute flying butterfly doodle
      { type: "rect", x: 270, y: 85, width: 6, height: 28, defaultFill: "#3B82F6" }, // Butterfly body
      { type: "path", d: "M 270 90 C 250 70, 250 100, 270 100 Z", defaultFill: "#EC4899" }, // Left wing top
      { type: "path", d: "M 270 100 C 255 110, 255 120, 270 110 Z", defaultFill: "#F472B6" }, // Left wing bottom
      { type: "path", d: "M 276 90 C 296 70, 296 100, 276 100 Z", defaultFill: "#EC4899" }, // Right wing top
      { type: "path", d: "M 276 100 C 291 110, 291 120, 276 110 Z", defaultFill: "#F472B6" } // Right wing bottom
    ]
  }
];
