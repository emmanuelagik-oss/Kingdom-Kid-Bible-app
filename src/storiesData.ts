export interface StoryScene {
  title: string;
  text: string;
  illustrationPrompt: string;
  fallbackImage: string;
  question: {
    q: string;
    choices: string[];
    answerIndex: number;
    explanation: string;
  };
}

export interface EnhancedStory {
  id: string;
  title: string;
  category: "Old Testament" | "New Testament";
  emoji: string;
  description: string;
  moral: string;
  verse: string;
  scenes: StoryScene[];
  storyPrayer: string;
  storyChallenge: {
    title: string;
    description: string;
    points: number;
  };
}

export const ENHANCED_STORIES: EnhancedStory[] = [
  {
    id: "noah",
    title: "Noah and the Great Rainbow",
    category: "Old Testament",
    emoji: "🌈🦒",
    description: "Follow Noah as he builds a giant wooden boat for all the animals and witnesses God's beautiful promise.",
    moral: "Trust in God's promises—He will always guide us safely through the rain.",
    verse: "I have set my rainbow in the clouds, and it will be the sign of the covenant between me and the earth. - Genesis 9:13",
    storyPrayer: "Dear God, thank You for Your beautiful promises. When my skies look dark, help me trust that You always send a rainbow of love. Amen!",
    storyChallenge: {
      title: "Rainbow of Promise",
      description: "Paint or color a beautiful rainbow today and write one thing you are grateful for on each color!",
      points: 25
    },
    scenes: [
      {
        title: "Part 1: The Big Mission",
        text: "Long ago, a kind man named Noah listened to God's voice. God told him, 'Noah, a big rain is coming! I want you to build a giant wooden boat called an Ark.' Noah trusted God completely. He gathered wood and hammers and began building under the warm sun, even when others laughed.",
        illustrationPrompt: "A friendly happy cartoon of Noah building a large wooden ark with hammers, bright sunny sky, friendly animals watching",
        fallbackImage: "🔨⛵",
        question: {
          q: "What did Noah build to keep everyone safe?",
          choices: ["A stone fortress", "A wooden Ark", "A hollow treehouse", "A large raft"],
          answerIndex: 1,
          explanation: "Noah built a wooden Ark exactly as God told him to do!"
        }
      },
      {
        title: "Part 2: Two by Two",
        text: "Knock, knock! Tap, tap! The giant Ark was finally finished. Then, the most amazing parade began! Animals of every shape, size, and sound came marching in pairs. Two tall giraffes, two playful monkeys, two sleepy lions, and two soft doves. Noah welcomed them all into their cozy floating home.",
        illustrationPrompt: "Friendly vector cartoon of animals entering a large wooden ark two-by-two, giraffes, elephants, lions, doves flying, cute",
        fallbackImage: "🦒🦁",
        question: {
          q: "How many of each animal did Noah take on the Ark?",
          choices: ["Just one", "Two by two", "A whole family of ten", "None, they walked on water"],
          answerIndex: 1,
          explanation: "The animals marched into the Ark two by two!"
        }
      },
      {
        title: "Part 3: The Beautiful Promise",
        text: "The rain fell pit-a-pat for forty days, but Noah and the animals were perfectly safe. When the storm stopped, Noah opened a window. The sun shone bright, and a brilliant, colorful rainbow painted the sky. God promised, 'Never again will a flood cover the earth. The rainbow is my promise.'",
        illustrationPrompt: "A giant beautiful colorful rainbow in a blue sky over a wooden ark resting on a green mountain, Noah waving joyfully, happy animals",
        fallbackImage: "🌈🕊️",
        question: {
          q: "What was God's sign of promise in the sky?",
          choices: ["A golden cloud", "A silver moon", "A brilliant rainbow", "A shooting star"],
          answerIndex: 2,
          explanation: "God painted a colorful rainbow in the sky as a sign of His loving promise."
        }
      }
    ]
  },
  {
    id: "david-goliath",
    title: "David and the Giant Battle",
    category: "Old Testament",
    emoji: "🎯🪨",
    description: "A brave shepherd boy trusts in God's power and stands up against a massive giant who frightened an entire army.",
    moral: "With God on our side, no problem is too big for us to overcome.",
    verse: "The Lord is my light and my salvation—whom shall I fear? - Psalm 27:1",
    storyPrayer: "Dear Lord, when I feel small or afraid, remind me that You are my strength. No giant is bigger than Your love. Amen!",
    storyChallenge: {
      title: "Five Smooth Stones",
      description: "Find five smooth stones outside. Draw a happy face on them as a reminder of David's courage!",
      points: 20
    },
    scenes: [
      {
        title: "Part 1: The Brave Shepherd",
        text: "Young David was a small shepherd boy who loved to play the harp and write songs of praise to God. Every day, he protected his sheep from hungry lions and bears, using only a small slingshot and his faith in God. He knew God was always watching over him.",
        illustrationPrompt: "A young shepherd boy David playing a harp in a green meadow with fluffy sheep, warm sun, colorful friendly cartoon",
        fallbackImage: "🐑🎵",
        question: {
          q: "What instrument did David love to play?",
          choices: ["A golden trumpet", "A wooden flute", "A beautiful harp", "A shiny drum"],
          answerIndex: 2,
          explanation: "David loved to play the harp and sing songs of praise to God."
        }
      },
      {
        title: "Part 2: The Giant Challenge",
        text: "One day, David went to visit his brothers in the army. There, he saw a giant named Goliath, who was over nine feet tall! Goliath shouted and made everyone afraid. No soldier was brave enough to face him. But David said, 'I will not fear! God will save me today.'",
        illustrationPrompt: "A massive friendly-looking armored giant Goliath standing on a hill, looking down at a confident young shepherd boy David, cartoon",
        fallbackImage: "🛡️🧔",
        question: {
          q: "Who made the soldiers of Israel so afraid?",
          choices: ["A group of lions", "Goliath the giant", "A fierce bear", "A giant storm"],
          answerIndex: 1,
          explanation: "The massive giant Goliath shouted and made all the soldiers afraid."
        }
      },
      {
        title: "Part 3: Trust and Victory",
        text: "David took only five smooth stones from the stream, his slingshot, and his faith. As Goliath marched forward, David ran with courage, swung his sling, and released a stone. Whiz! The stone flew true, and Goliath fell down! The country was saved because David trusted God.",
        illustrationPrompt: "David victorious, cheering joyfully with a sling, friendly soldiers celebrating in the background, pastel colors",
        fallbackImage: "🎯🏆",
        question: {
          q: "How many smooth stones did David pick from the stream?",
          choices: ["One stone", "Three stones", "Five stones", "Ten stones"],
          answerIndex: 2,
          explanation: "David gathered five smooth stones from the brook before facing the giant."
        }
      }
    ]
  },
  {
    id: "joseph",
    title: "Joseph and His Coat of Many Colors",
    category: "Old Testament",
    emoji: "🧥✨",
    description: "Learn how Joseph stayed faithful to God through hard times and saw his dreams bring peace to his entire family.",
    moral: "God works all things together for good, even when difficult situations happen.",
    verse: "And we know that in all things God works for the good of those who love him. - Romans 8:28",
    storyPrayer: "Dear Heavenly Father, thank You that You have a wonderful plan for my life. Help me to be kind and forgive others, just like Joseph. Amen!",
    storyChallenge: {
      title: "Acts of Kindness Coat",
      description: "Draw a coat and color each stripe a different color whenever you do something nice for your family today!",
      points: 25
    },
    scenes: [
      {
        title: "Part 1: The Colorful Gift",
        text: "Joseph was a bright boy with a very big heart. His father, Jacob, loved him dearly and gave him a spectacular coat of many colors—red, yellow, blue, and green! Joseph also had special dreams where God showed him he would do grand things. His brothers were jealous, but Joseph kept his eyes on God.",
        illustrationPrompt: "A happy boy Joseph wearing a beautiful coat of many vibrant colors, smiling with brothers in the background, cartoon",
        fallbackImage: "🧥🎨",
        question: {
          q: "What did Joseph's father give him as a special token of love?",
          choices: ["A golden crown", "A coat of many colors", "A shepherd's staff", "A musical harp"],
          answerIndex: 1,
          explanation: "Jacob gave Joseph a beautiful, vibrant coat of many colors."
        }
      },
      {
        title: "Part 2: The Hard Journey",
        text: "Joseph's jealous brothers sent him far away to Egypt. Even though he was in a strange place and had to work hard in prison for things he didn't do, Joseph never gave up his faith. He always did his best, and God blessed him with the ability to explain Pharaoh's strange dreams about cows and wheat.",
        illustrationPrompt: "Joseph in a quiet stone prison room looking up at a glowing window with hope, cartoon style",
        fallbackImage: "🪵🌾",
        question: {
          q: "Whose strange dreams did Joseph explain in Egypt?",
          choices: ["The King's guard", "The chief baker", "The Pharaoh", "The head shepherd"],
          answerIndex: 2,
          explanation: "Joseph explained the dreams of Pharaoh, the ruler of Egypt, with God's help."
        }
      },
      {
        title: "Part 3: Forgiveness and Feast",
        text: "Because of his wisdom, Pharaoh made Joseph the second ruler of all Egypt! When a big famine came, Joseph had stored plenty of food. His brothers came asking for help. Instead of being angry, Joseph hugged them and shared his food. He said, 'What was meant for harm, God used for good!'",
        illustrationPrompt: "Joseph hugging his brothers happily in a grand golden palace with bowls of golden grain, warm cartoon illustration",
        fallbackImage: "🌾🍞",
        question: {
          q: "How did Joseph react when he saw his brothers again?",
          choices: ["He put them in jail", "He ran away", "He forgave and fed them", "He took their colorful coats"],
          answerIndex: 2,
          explanation: "Joseph chose to forgive his brothers, hug them, and share Egypt's stored food with them!"
        }
      }
    ]
  },
  {
    id: "daniel",
    title: "Daniel and the Lions' Den",
    category: "Old Testament",
    emoji: "🦁🙏",
    description: "Daniel prays to God three times a day and discovers that God's angels are stronger than any hungry lions.",
    moral: "Stand strong in prayer and faith, because God is our ultimate Protector.",
    verse: "My God sent his angel, and he shut the mouths of the lions. - Daniel 6:22",
    storyPrayer: "Dear Lord, give me the courage to pray and speak to You every single day, no matter what others say. Thank You for protecting me! Amen!",
    storyChallenge: {
      title: "Prayer Watchkeeper",
      description: "Set a special 'prayer alarm' three times today to pause, say thank You to God, and pray for a friend!",
      points: 20
    },
    scenes: [
      {
        title: "Part 1: The Window to Heaven",
        text: "Daniel was a wise helper to King Darius. He loved God very much. Every single day, Daniel opened his window, knelt down, and prayed to God three times—morning, noon, and night. Even when some jealous leaders made a law saying no one could pray to God, Daniel kept praying with a peaceful heart.",
        illustrationPrompt: "A happy Daniel kneeling in front of a window, praying with hands folded, sun beaming in, warm colors",
        fallbackImage: "🪟🙏",
        question: {
          q: "How many times a day did Daniel kneel down to pray?",
          choices: ["One time", "Two times", "Three times", "Five times"],
          answerIndex: 2,
          explanation: "Daniel knelt and prayed to God three times every single day."
        }
      },
      {
        title: "Part 2: Into the Lions' Den",
        text: "Because Daniel disobeyed the new law to pray to the King, the guards had to put him into a deep, dark den filled with big, hungry lions. King Darius was very sad and told Daniel, 'May your God, whom you serve, rescue you!' They rolled a heavy stone over the entrance.",
        illustrationPrompt: "Guards looking worried as they lead Daniel toward a stone cave, lions watching curiously inside, cartoon",
        fallbackImage: "🪨🦁",
        question: {
          q: "Where was Daniel thrown for praying to God?",
          choices: ["A fiery furnace", "A tall tower", "A den of lions", "A stormy sea"],
          answerIndex: 2,
          explanation: "Daniel was put into a den filled with hungry lions."
        }
      },
      {
        title: "Part 3: The Peaceful Morning",
        text: "The next morning, King Darius rushed to the den and called out, 'Daniel, did God save you?' Daniel replied joyfully, 'Yes, King! My God sent His angel, and he shut the lions' mouths!' The lions were as gentle as little kittens, purring softly. Daniel was pulled up without a single scratch!",
        illustrationPrompt: "Daniel petting a big, happy, smiling lion in a sunny stone den, a glowing bright angel standing nearby",
        fallbackImage: "👼🦁",
        question: {
          q: "Who shut the mouths of the hungry lions?",
          choices: ["The King's guards", "An angel sent by God", "Daniel's brothers", "The lions fell asleep on their own"],
          answerIndex: 1,
          explanation: "God sent His angel to close the lions' mouths so they wouldn't hurt Daniel."
        }
      }
    ]
  },
  {
    id: "esther",
    title: "Queen Esther's Brave Moment",
    category: "Old Testament",
    emoji: "👑✨",
    description: "Esther becomes queen and risks everything to save her people, proving God places us exactly where we need to be.",
    moral: "You are created with special purpose, for such a time as this.",
    verse: "And who knows but that you have come to your royal position for such a time as this? - Esther 4:14",
    storyPrayer: "Dear God, when I feel nervous to speak up, give me Esther's bravery. Help me to stand up for others and share Your love. Amen!",
    storyChallenge: {
      title: "Royal Crown of Courage",
      description: "Make a paper crown out of cardboard or construction paper, and write 'Brave & Loved' in bright colors on it!",
      points: 25
    },
    scenes: [
      {
        title: "Part 1: The New Queen",
        text: "Esther was a kind, beautiful orphan girl raised by her wise cousin Mordecai. When the King of Persia looked for a new queen, he chose Esther! He placed a golden crown on her head and threw a grand feast. Esther kept her background a secret, trusting God to lead her in the giant palace.",
        illustrationPrompt: "A beautiful smiling Queen Esther wearing a gold crown and lovely gown in a palace hallway, colorful cartoon",
        fallbackImage: "👑🏛️",
        question: {
          q: "Who raised Esther and gave her wise advice?",
          choices: ["The King of Persia", "Her cousin Mordecai", "A temple priest", "No one, she lived alone"],
          answerIndex: 1,
          explanation: "Esther's kind and wise cousin Mordecai raised her like his own daughter."
        }
      },
      {
        title: "Part 2: The Secret Threat",
        text: "An angry leader named Haman made a wicked plan to harm Mordecai and all of Esther's people. Mordecai sent a message to Esther: 'You must go speak to the King! Perhaps you became queen for such a time as this!' But going to the King without being called was highly dangerous.",
        illustrationPrompt: "Mordecai talking to a messenger with a worried expression, royal castle walls, pastel illustration",
        fallbackImage: "📜🛡️",
        question: {
          q: "Why was it scary for Esther to go speak to the King?",
          choices: ["The King was very mean", "It was against palace laws without being invited", "She lost her golden crown", "Haman was guarding the door"],
          answerIndex: 1,
          explanation: "Palace law said no one could approach the King unless invited, or they could be punished!"
        }
      },
      {
        title: "Part 3: Bravery and Favor",
        text: "Esther asked all her friends to pray and fast for three days. With a pounding heart, she walked into the throne room. The King smiled and held out his golden scepter! Esther invited the King and Haman to a special dinner, where she revealed her secret. The King saved her people, and Esther became a national hero!",
        illustrationPrompt: "King smiling on his throne, holding out a golden scepter to Queen Esther, bright joyful colors, kids cartoon",
        fallbackImage: "👑🪄",
        question: {
          q: "What did the King hold out to Esther to show she was welcome?",
          choices: ["A silver sword", "A bunch of flowers", "His golden scepter", "A plate of royal cookies"],
          answerIndex: 2,
          explanation: "The King held out his golden scepter to welcome Queen Esther warmly."
        }
      }
    ]
  },
  {
    id: "elijah",
    title: "Elijah and the Fire from Heaven",
    category: "Old Testament",
    emoji: "🔥☁️",
    description: "Elijah prays on Mount Carmel, and God answers with an amazing show of fiery power to prove He is the true God.",
    moral: "Our God is real, powerful, and answers our prayers when we trust Him.",
    verse: "The Lord—he is God! The Lord—he is God! - 1 Kings 18:39",
    storyPrayer: "Lord God, thank You that You are the only true God, full of fire, love, and power. Help me to stand tall and follow You always. Amen!",
    storyChallenge: {
      title: "Altar of Thankfulness",
      description: "Build an 'altar' of 12 smooth toys or blocks on your table. Pray and thank God for 12 great blessings in your life!",
      points: 20
    },
    scenes: [
      {
        title: "Part 1: The Mountain Challenge",
        text: "Elijah was a bold prophet of God. The people of Israel had forgotten God and started worshipping a silent wooden statue named Baal. Elijah called everyone to Mount Carmel and said, 'Let us see who is the true God! Build an altar, and the God who answers with fire is the real Lord.'",
        illustrationPrompt: "Prophet Elijah standing on Mount Carmel overlooking the crowd, bright blue sky, cartoon illustration",
        fallbackImage: "⛰️🌤️",
        question: {
          q: "Where did Elijah gather the people for the big test?",
          choices: ["By the Jordan River", "On Mount Carmel", "In the city of Jerusalem", "In a grassy meadow"],
          answerIndex: 1,
          explanation: "Elijah gathered everyone on Mount Carmel for the fire test."
        }
      },
      {
        title: "Part 2: The Silent Idol",
        text: "The other priests built their altar and danced all day, shouting, 'Baal, answer us!' But there was no sound, no answer, and no fire. Elijah smiled and built his altar using 12 large stones. He poured buckets and buckets of cold water all over his altar until it was completely soaked and dripping.",
        illustrationPrompt: "Altars of stone on Mount Carmel, Elijah pouring water from buckets on his altar, crowd watching curiously",
        fallbackImage: "🪵💧",
        question: {
          q: "What did Elijah pour all over his stone altar?",
          choices: ["Sweet olive oil", "Vibrant colors", "Buckets of water", "Dry straw"],
          answerIndex: 2,
          explanation: "Elijah poured tons of water over his altar to prove God's power was beyond human tricks."
        }
      },
      {
        title: "Part 3: Fire from Heaven!",
        text: "Then Elijah stepped forward and prayed simply: 'Lord, let it be known today that You are God.' Instantly, WHOOSH! Fire fell from the bright sky and burned up the wood, the stones, the dirt, and licked up all the water! The people fell on their faces, shouting, 'The Lord—He is the true God!'",
        illustrationPrompt: "A majestic pillar of bright orange fire coming down from heaven, lighting up Elijah's stone altar, people kneeling in awe",
        fallbackImage: "🔥✨",
        question: {
          q: "What fell from the sky to consume Elijah's soaked altar?",
          choices: ["A heavy rainstorm", "Fiery sparks from heaven", "A flock of white doves", "Falling golden stars"],
          answerIndex: 1,
          explanation: "Fire came down from heaven and consumed the entire altar, proving God's true power!"
        }
      }
    ]
  },
  {
    id: "moses",
    title: "Moses and the Great Red Sea Path",
    category: "Old Testament",
    emoji: "🌊🚶‍♂️",
    description: "Moses holds up his wooden staff, and God splits a giant sea to make a dry path for His family to walk across.",
    moral: "God will always make a way for us when there seems to be no way.",
    verse: "The Lord will fight for you; you need only to be still. - Exodus 14:14",
    storyPrayer: "Dear God, thank You for being my Waymaker. When I face big obstacles, help me stand still and trust You to part the waters. Amen!",
    storyChallenge: {
      title: "Be Still Challenge",
      description: "Do a 'stand still' game today. Stand perfectly still for 1 minute, breathing slowly, and telling God 'I trust You.'",
      points: 20
    },
    scenes: [
      {
        title: "Part 1: Trapped by the Sea",
        text: "Moses led God's big family, the Israelites, out of Egypt toward the Promised Land. But suddenly, they ran into a giant problem—the deep, blue Red Sea was right in front of them, and Pharaoh's army was marching behind them! The people cried out in fear, but Moses said, 'Don't be afraid. Stand still and see God's rescue.'",
        illustrationPrompt: "Moses leading a crowd of happy families toward a vast blue ocean under a pillar of cloud, bright cartoon",
        fallbackImage: "🏝️🚶",
        question: {
          q: "What giant sea was blocking the path of Moses and the people?",
          choices: ["The Dead Sea", "The Galilee Lake", "The Red Sea", "The Jordan River"],
          answerIndex: 2,
          explanation: "The vast Red Sea lay directly ahead, blocking their travel path."
        }
      },
      {
        title: "Part 2: The Mighty Wind",
        text: "God told Moses, 'Raise your wooden staff and stretch out your hand over the water.' Moses obeyed. Suddenly, a strong wind began to blow from the east all night long. The wind pushed the giant waves back, back, back, splitting the deep sea right in half like two huge watery walls!",
        illustrationPrompt: "Moses standing on a cliff holding up a wooden staff, a strong wind blowing, the sea beginning to separate",
        fallbackImage: "🪄💨",
        question: {
          q: "What did Moses hold up over the water as God commanded?",
          choices: ["A golden shield", "His wooden staff", "A royal scroll", "A glowing lamp"],
          answerIndex: 1,
          explanation: "Moses held up his simple wooden staff over the Red Sea."
        }
      },
      {
        title: "Part 3: Walking on Dry Ground",
        text: "A beautiful, wide path opened up right through the middle of the sea! The ground wasn't even muddy—it was completely dry. All of God's family, from toddlers to grandparents, walked safely across with fish swimming in the water walls beside them. They cheered and played tambourines, praising God's awesome rescue!",
        illustrationPrompt: "Families walking happily along a dry path between two giant turquoise walls of water, colorful shells on the floor, kids style",
        fallbackImage: "🌊🐚",
        question: {
          q: "What was special about the path through the parted sea?",
          choices: ["It was made of golden brick", "The ground was completely dry", "It was a floating wooden bridge", "It was covered in green grass"],
          answerIndex: 1,
          explanation: "God dried up the seabed so the people could walk safely across without slipping!"
        }
      }
    ]
  },
  {
    id: "jesus-boat",
    title: "Jesus Calms the Stormy Lake",
    category: "New Testament",
    emoji: "⛵🌊",
    description: "The disciples panic in a giant storm on a wooden boat, but Jesus speaks three small words to make the wind behave.",
    moral: "Even the winds and waves obey Jesus—He can bring peace to our hearts.",
    verse: "He got up, rebuked the wind and said to the waves, 'Quiet! Be still!' Then the wind died down and it was completely calm. - Mark 4:39",
    storyPrayer: "Lord Jesus, when my heart feels worried or stormy, speak Your peace into my mind. I know You are always in the boat with me. Amen!",
    storyChallenge: {
      title: "Peace, Be Still Drawing",
      description: "Draw a small wooden boat on a smooth, blue, peaceful lake and write the words 'Quiet! Be Still' on the sail!",
      points: 25
    },
    scenes: [
      {
        title: "Part 1: The Giant Waves",
        text: "One evening, Jesus and His helpers got into a small wooden boat to sail across a big lake. Jesus was so tired that He fell fast asleep on a soft cushion in the back. Suddenly, a fierce storm blew in! Giant waves crashed over the sides, filling the boat with cold water. The helpers were terrified!",
        illustrationPrompt: "A small wooden fishing boat tossed in wild waves under dark rainy clouds, disciples panicking, Jesus sleeping soundly",
        fallbackImage: "⛵🌧️",
        question: {
          q: "What was Jesus doing in the boat when the big storm started?",
          choices: ["Sailing the boat", "Sleeping on a cushion", "Eating fresh bread", "Fishing with a net"],
          answerIndex: 1,
          explanation: "Jesus was so tired from helping people that He was sleeping peacefully in the back."
        }
      },
      {
        title: "Part 2: Speak to the Storm",
        text: "The disciples rushed to wake Jesus, crying, 'Master, save us! We are going to sink!' Jesus opened His eyes, saw the dark wind and splashing water, and stood up calmly. He didn't look scared at all. He looked out at the roaring waves and said three quiet words: 'Quiet! Be still!'",
        illustrationPrompt: "Jesus standing bravely on a rocking wooden boat, holding out His hand to the stormy dark sea, pupils looking in awe",
        fallbackImage: "✋🌊",
        question: {
          q: "What three powerful words did Jesus say to the storm?",
          choices: ["'Go away now!'", "'Quiet! Be still!'", "'Please stop blowing'", "'Sun, shine bright!'"],
          answerIndex: 1,
          explanation: "Jesus said, 'Quiet! Be still!' to rebuke the howling wind and crashing waves."
        }
      },
      {
        title: "Part 3: Perfect Peace",
        text: "The moment Jesus spoke, the wind stopped blowing and the lake became as smooth as glass! The sun poked through the clouds. The disciples were amazed and whispered to each other, 'Who is this? Even the winds and the waves obey Him!' They realized Jesus is the Lord of peace, always ready to protect them.",
        illustrationPrompt: "A fishing boat floating on a perfectly flat, calm, sparkly blue lake, bright sunny sky with a smiling sun, happy disciples",
        fallbackImage: "⛵☀️",
        question: {
          q: "What happened to the lake immediately after Jesus spoke?",
          choices: ["It turned into gold", "It became perfectly calm", "It started to freeze", "It filled with giant friendly whales"],
          answerIndex: 1,
          explanation: "The lake instantly calmed down and became smooth as glass!"
        }
      }
    ]
  }
];
