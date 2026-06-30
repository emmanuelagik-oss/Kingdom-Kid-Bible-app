import { useState } from "react";
import { Shield, Sparkles, BookOpen, Key, Award, Heart, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Hero {
  id: string;
  name: string;
  emoji: string;
  pointsRequired: number;
  bio: string;
  story: string;
  strength: string;
  verse: string;
  lesson: string;
  prayer: string;
}

const HEROES: Hero[] = [
  {
    id: "david",
    name: "David the Brave",
    emoji: "🐑🎯👑",
    pointsRequired: 0,
    bio: "A brave shepherd boy who trusted God, defeated the giant Goliath with a single stone, played beautiful praise songs, and grew up to become King!",
    story: "One day, a huge giant named Goliath laughed at God's people. No soldier was brave enough to fight him. But David stepped up, saying: 'The Lord who saved me from the lion and bear will save me today!' He swung his sling, let go of a single smooth stone, and boom! The giant fell down flat.",
    strength: "Courage & Unshakable Faith 🛡️",
    verse: "Psalm 56:3 — 'When I am afraid, I put my trust in you.'",
    lesson: "God is bigger than any giant problem or fear in your life!",
    prayer: "Dear God, when I feel small or scared, please give me courage. Help me remember that You are always by my side holding my hand. Amen."
  },
  {
    id: "esther",
    name: "Esther the Queen",
    emoji: "👑📜🕯️",
    pointsRequired: 0,
    bio: "A beautiful orphan girl who was chosen to be Queen, stayed extremely brave, and spoke up to save her entire family from a wicked plot.",
    story: "A wicked ruler made a law to hurt Esther's people. Esther was scared because going to speak to the King without being invited could get her in big trouble. But she knew God placed her as Queen 'for such a time as this.' She prayed, spoke with courage, and saved her people!",
    strength: "Bravery & Loving Protection 💖",
    verse: "Joshua 1:9 — 'Be strong and courageous. Do not be afraid; the Lord is with you.'",
    lesson: "God can use you to help and protect others right where you are!",
    prayer: "Dear God, help me to stand up for what is right, even when it is scary. Make me brave to speak kindly and defend others. Amen."
  },
  {
    id: "daniel",
    name: "Daniel the Loyal",
    emoji: "🦁🦁❤️",
    pointsRequired: 0,
    bio: "A wise young prophet who loved God so much that he prayed three times a day, even when it was outlawed. God shut the mouths of hungry lions to save him!",
    story: "Envious leaders got a law passed that anyone who prayed to anyone except the King would be thrown to the lions. But Daniel kept his windows open and prayed to God. He was thrown into a dark cave of fierce lions, but God sent a shining angel who shut the lions' mouths and kept Daniel cozy!",
    strength: "Prayer Power & Integrity 🙏",
    verse: "Daniel 6:22 — 'My God sent his angel, and he shut the lions' mouths.'",
    lesson: "When you put God first in everything, He will always cover you with safety!",
    prayer: "Dear Lord, teach me to talk to You in prayer every single day. Keep my faith strong, and protect me in my times of trouble. Amen."
  },
  {
    id: "noah",
    name: "Noah the Ark Builder",
    emoji: "⛵🦒🕊️",
    pointsRequired: 0,
    bio: "A righteous man of faith who built a giant wooden ark to save his family and animals from a great flood, following God's commands perfectly.",
    story: "God told Noah to build a huge boat on dry land, even though it hadn't rained in years! People laughed, but Noah kept hammering. Soon, animals came in pairs—two by two. When the flood came, the ark floated safely. Afterward, God painted a beautiful rainbow in the sky as a promise.",
    strength: "Obedience & Patience 🌈",
    verse: "Genesis 6:22 — 'Noah did everything just as God commanded him.'",
    lesson: "Even when others don't understand, obeying God always brings peace and safety.",
    prayer: "Dear God, help me to listen to Your voice and obey Your rules, even when it seems hard. I trust Your beautiful promise of love. Amen."
  },
  {
    id: "paul",
    name: "Paul the Traveler",
    emoji: "⛵🏔️✉️",
    pointsRequired: 30,
    bio: "A brave traveler who climbed mountains and sailed stormy seas to plant churches and write letters of joy that form much of our New Testament!",
    story: "Paul used to be an enemy of Jesus' friends, but one day a bright light from heaven shone on him, and Jesus spoke to him! Paul's heart was completely changed. He became a missionary, survived shipwrecks, and wrote letters of encouragement from prison, reminding everyone to rejoice always!",
    strength: "Joy in all Circumstances ☀️",
    verse: "Philippians 4:13 — 'I can do all things through Christ who strengthens me.'",
    lesson: "God can transform any heart and turn bad days into amazing missions of love!",
    prayer: "Dear Jesus, fill me with Your joy so that I can encourage others, even on tough days. Thank You for changing my heart. Amen."
  },
  {
    id: "mary",
    name: "Mary the Humble",
    emoji: "🤱🌸🐑",
    pointsRequired: 60,
    bio: "A humble young woman from Nazareth who was chosen by God to be the loving mother of Jesus, the Savior of the world.",
    story: "An angel appeared to Mary and said: 'Do not be afraid, God is pleased with you! You will have a baby boy and name Him Jesus.' Mary sang a beautiful song of joy to God. She rode a donkey to Bethlehem, laid baby Jesus in a manger, and watched Him grow with love.",
    strength: "Gentleness & Purity ✨",
    verse: "Luke 1:38 — 'I am the Lord's servant. May your word to me be fulfilled.'",
    lesson: "A quiet, gentle, and willing heart is incredibly beautiful to God.",
    prayer: "Dear Father, make my heart gentle, kind, and always ready to serve You. May I bring joy and peace to those around me. Amen."
  },
  {
    id: "joseph",
    name: "Joseph the Dreamer",
    emoji: "🌾🧥🍞",
    pointsRequired: 90,
    bio: "A dreamer who was sold as a slave but chose forgiveness, eventually saving Egypt and his entire family from hunger.",
    story: "Joseph had a colorful coat and dreamed big dreams. His brothers were unkind and sent him away, but Joseph kept working hard with a cheerful heart. When he became ruler, he forgave his brothers and fed them, showing that God turns what was meant for bad into good.",
    strength: "Forgiveness & Vision 🌈",
    verse: "Proverbs 3:5 — 'Trust in the Lord with all your heart and lean not on your own understanding.'",
    lesson: "No matter how unkindly others treat you, choose to forgive and let God do great things!",
    prayer: "Dear Lord, give me a big heart of forgiveness. When others hurt me, help me to respond with kindness and trust in Your plan. Amen."
  },
  {
    id: "peter",
    name: "Peter the Fisher",
    emoji: "⛵🐟🔑",
    pointsRequired: 120,
    bio: "A fisherman who became a bold fisher of men, walked on water with Jesus, and led the early Church with courage.",
    story: "Peter was cleaning his nets when Jesus said, 'Follow me!' Peter dropped everything. One night, Peter saw Jesus walking on the waves. He stepped out of the boat and walked on water too! Even though he got scared and sank, Jesus caught him and made him a mighty leader.",
    strength: "Bold Leadership & Boldness 🔥",
    verse: "1 Peter 5:7 — 'Cast all your anxiety on him because he cares for you.'",
    lesson: "If you stumble or make a mistake, Jesus is always ready to lift you up and restore you!",
    prayer: "Dear Jesus, make me a bold friend and leader. When I make mistakes, thank You for forgiving me and helping me try again. Amen."
  }
];

export default function HeroesCollection({ userScore }: { userScore: number }) {
  const [selectedHero, setSelectedHero] = useState<Hero>(HEROES[0]);

  return (
    <div className="space-y-8" id="heroes-collection-root">
      {/* Banner */}
      <div className="bg-brand-sand p-6 rounded-[32px] text-brand-dark shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-brand-sand/55">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="bg-brand-olive/20 text-brand-stone font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
            🎖️ Bible Heroes Hall of Fame
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-brand-dark">
            Unlock Ancient Bible Heroes!
          </h2>
          <p className="text-sm md:text-base text-brand-stone max-w-lg font-medium">
            Earn Stars to unlock more characters! Explore their bios, strengths, moral lessons, and prayers. Find out what made them so legendary!
          </p>
        </div>
        <div className="text-5xl mt-4 md:mt-0 animate-bounce duration-3000">👑🛡️🎖️</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 4 Columns: Hero Grid */}
        <div className="lg:col-span-4 bg-white border-2 border-brand-sand rounded-[32px] p-5 space-y-4 shadow-sm h-fit">
          <h3 className="font-bold font-serif text-brand-stone flex items-center gap-1.5 text-sm">
            <Award className="text-brand-olive w-4 h-4" /> Hero Roster
          </h3>

          <div className="grid grid-cols-1 gap-2.5">
            {HEROES.map((hero) => {
              const isLocked = userScore < hero.pointsRequired;
              const isSelected = selectedHero.id === hero.id;

              return (
                <button
                  key={hero.id}
                  disabled={isLocked}
                  onClick={() => setSelectedHero(hero)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all relative overflow-hidden ${
                    isLocked
                      ? "bg-brand-sand/10 border-brand-sand/30 opacity-60 cursor-not-allowed"
                      : isSelected
                      ? "bg-brand-sage/15 border-brand-sage/40 scale-[1.02] shadow-xs"
                      : "bg-white border-brand-sand/35 hover:border-brand-sand cursor-pointer"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl p-2 rounded-xl flex items-center justify-center shrink-0 ${
                      isLocked ? "bg-brand-sand/30" : "bg-brand-cream/35"
                    }`}>
                      {isLocked ? "🔒" : hero.emoji[0]}
                    </span>
                    <div className="space-y-0.5">
                      <p className="text-xs font-black text-brand-dark">{hero.name}</p>
                      {isLocked ? (
                        <p className="text-[9px] text-brand-clay font-bold flex items-center gap-0.5">
                          <Key className="w-2.5 h-2.5" /> Locks until {hero.pointsRequired} ⭐
                        </p>
                      ) : (
                        <p className="text-[9px] text-brand-stone font-semibold truncate max-w-[130px]">
                          Strength: {hero.strength}
                        </p>
                      )}
                    </div>
                  </div>

                  {!isLocked && (
                    <span className="text-xs text-brand-olive bg-brand-olive/15 px-2 py-0.5 rounded-md font-bold">
                      Open
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 8 Columns: Hero Detail View */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedHero.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-white border-2 border-brand-sand rounded-[32px] p-6 shadow-sm space-y-6"
            >
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-brand-sand/65 pb-5">
                <div className="text-5xl p-4 bg-brand-cream/30 border-2 border-brand-sand rounded-3xl shrink-0">
                  {selectedHero.emoji}
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <span className="bg-brand-sage/20 text-brand-stone text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    💪 God's Superpower Hero
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold font-serif text-brand-dark">
                    {selectedHero.name}
                  </h3>
                  <p className="text-xs text-brand-stone font-semibold">
                    Core Strength: <span className="text-brand-olive font-extrabold">{selectedHero.strength}</span>
                  </p>
                </div>
              </div>

              {/* Bio & Story panels */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-extrabold text-brand-stone uppercase tracking-wide flex items-center gap-1">
                    📖 Biography Overview:
                  </h4>
                  <p className="text-xs md:text-sm text-brand-stone font-medium leading-relaxed bg-brand-cream/10 p-3.5 rounded-2xl border border-brand-sand/40">
                    {selectedHero.bio}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-extrabold text-brand-stone uppercase tracking-wide flex items-center gap-1">
                    🔥 The Legendary Adventure:
                  </h4>
                  <p className="text-xs md:text-sm text-brand-stone font-medium leading-relaxed bg-white p-4 rounded-2xl border-2 border-brand-sand/65">
                    {selectedHero.story}
                  </p>
                </div>
              </div>

              {/* Memory Verse & Life Lesson Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Memory Verse */}
                <div className="bg-brand-sage/15 border border-brand-sage/40 p-4 rounded-2xl space-y-2">
                  <h4 className="text-xs font-extrabold text-brand-olive uppercase tracking-wider flex items-center gap-1">
                    🛡️ Hero's Memory Shield Word:
                  </h4>
                  <p className="text-xs text-brand-stone font-black italic">
                    "{selectedHero.verse}"
                  </p>
                </div>

                {/* Life Lesson */}
                <div className="bg-brand-cream/35 border border-brand-sand p-4 rounded-2xl space-y-2">
                  <h4 className="text-xs font-extrabold text-brand-dark uppercase tracking-wider flex items-center gap-1">
                    💡 Golden Life Lesson:
                  </h4>
                  <p className="text-xs text-brand-stone font-semibold leading-relaxed">
                    {selectedHero.lesson}
                  </p>
                </div>
              </div>

              {/* Kid's Daily Prayer */}
              <div className="bg-rose-50/50 border border-rose-200 p-4 rounded-2xl space-y-2 relative overflow-hidden">
                <div className="absolute right-4 top-4 text-rose-200 opacity-20">
                  <Heart className="w-20 h-20" />
                </div>
                <h4 className="text-xs font-extrabold text-rose-700 uppercase tracking-wider flex items-center gap-1 relative z-10">
                  🙏 Your Daily Kid's Prayer:
                </h4>
                <p className="text-xs md:text-sm text-brand-stone font-bold italic leading-relaxed relative z-10">
                  "{selectedHero.prayer}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
