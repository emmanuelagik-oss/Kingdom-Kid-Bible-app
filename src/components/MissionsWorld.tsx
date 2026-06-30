import { useState } from "react";
import { Globe, Heart, Compass, Star, Utensils, MessageSquare, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MissionNation {
  id: string;
  name: string;
  flag: string;
  flagDesc: string;
  foodEmoji: string;
  foodName: string;
  foodDesc: string;
  prayerPoint: string;
  missionStory: string;
  kidHero: string;
}

const NATIONS: MissionNation[] = [
  {
    id: "kenya",
    name: "Kenya",
    flag: "🇰🇪",
    flagDesc: "Black, red, green, and white stripes with a traditional warrior shield in the center representing courage and defense of peace.",
    foodEmoji: "🥣🥦",
    foodName: "Ugali & Sukuma Wiki",
    foodDesc: "Fluffy, hot cornmeal cake (Ugali) paired with delicious fresh collard green vegetables (Sukuma Wiki) cooked with sweet onions!",
    prayerPoint: "Pray for children in Nairobi and rural towns to receive beautiful schools, nutritious food, clean running water, and to grow strong in God's great love!",
    missionStory: "Little Kasyoki loves to sing in his church choir under the great acacia tree in Machakos. His school just got a fresh library of storybooks, and he reads them aloud to his little sister every evening, thanking God for new wisdom and hope!",
    kidHero: "Kasyoki (Age 9) 🐑"
  },
  {
    id: "uganda",
    name: "Uganda",
    flag: "🇺🇬",
    flagDesc: "Horizontal stripes of black, yellow, and red with a majestic crowned crane bird standing gracefully in the center circle.",
    foodEmoji: "🍌🥜",
    foodName: "Matooke & Peanut Sauce",
    foodDesc: "Steamed green bananas (Matooke) mashed to perfection and served with a rich, creamy purple peanut sauce!",
    prayerPoint: "Pray for blessings over the schools, families, and churches around Kampala, and that all vulnerable children grow up in safe, warm, and loving communities.",
    missionStory: "Nalule woke up early to help fetch water for her grandmother. Near her village in Jinja, a new clean-water well was built! Now Nalule sings praises as she walks, knowing her family has healthy, sparkling water to drink.",
    kidHero: "Nalule (Age 10) 💧"
  },
  {
    id: "rwanda",
    name: "Rwanda",
    flag: "🇷🇼",
    flagDesc: "Beautiful stripes of blue, yellow, and green with a glowing golden sun representing hope, enlightenment, and peaceful unity.",
    foodEmoji: "🥔🥜",
    foodName: "Isombe & Sweet Potatoes",
    foodDesc: "Mashed green cassava leaves (Isombe) cooked with rich peanut butter, served alongside hot roasted sweet potatoes!",
    prayerPoint: "Pray for deep joy, peace, and bright educational opportunities for every child in the land of a thousand hills. May they grow with gentle, forgiving hearts!",
    missionStory: "Ganza and his friends are building a tiny toy school bus out of recycled wire and juice boxes in Kigali. At Sunday School, he learned about David's courage and wants to grow up to be a kind doctor who helps heal children.",
    kidHero: "Ganza (Age 8) 🎨"
  },
  {
    id: "nigeria",
    name: "Nigeria",
    flag: "🇳🇬",
    flagDesc: "Green, white, and green vertical stripes representing agricultural wealth, lush vegetation, and the beautiful gift of peace.",
    foodEmoji: "🍛🍌",
    foodName: "Jollof Rice & Plantains",
    foodDesc: "Spicy, tomato-flavored Jollof rice cooked with sweet peppers and served with sweet, golden fried plantain slices (Dodo)!",
    prayerPoint: "Pray for safe schools, joyful churches, and peaceful cities across West Africa, and that children grow strong in truth, wisdom, and daily encouragement.",
    missionStory: "Chidi loves playing soccer with his friends in Lagos. Last Sunday, he memorized Psalm 23 and won a shiny star button at Sunday School. He wears it proudly on his shirt, reminding his teammates that God is their good Shepherd!",
    kidHero: "Chidi (Age 11) ⚽"
  },
  {
    id: "brazil",
    name: "Brazil",
    flag: "🇧🇷",
    flagDesc: "A lush green field with a yellow diamond and a blue globe showing starry night skies with the motto 'Ordem e Progresso' (Order and Progress).",
    foodEmoji: "🍲🍊",
    foodName: "Feijoada & Rice",
    foodDesc: "A savory bean stew cooked with fresh vegetables and aromatic garlic, served with fluffy white rice and sweet sliced oranges!",
    prayerPoint: "Pray for children living near the Amazon rainforest and urban communities, that God's light shines bright in their hearts, giving them shelter and hope.",
    missionStory: "Isabella lives near the majestic rainforest. She loves drawing colorful butterflies and toucans. Every evening, her family gathers to pray, thanking God for the gorgeous plants and animals that fill their beautiful homeland.",
    kidHero: "Isabella (Age 9) 🦋"
  },
  {
    id: "india",
    name: "India",
    flag: "🇮🇳",
    flagDesc: "Saffron, white, and green horizontal stripes with a blue Ashoka Chakra wheel in the center representing progress and righteousness.",
    foodEmoji: "🍛🍞",
    foodName: "Paneer Masala & Naan",
    foodDesc: "Soft cubes of paneer cheese in a sweet, creamy butter tomato sauce, served with freshly baked warm garlic Naan bread!",
    prayerPoint: "Pray for children in busy cities and remote villages to hear the message of Jesus' love, and have safe classrooms and homes to learn and thrive.",
    missionStory: "Aarav loves flying colorful paper kites on his rooftop in Mumbai. His grandmother tells him stories of God's faithful helpers. Aarav wants to be a helper too, so he shares his colorful kite string with neighborhood children.",
    kidHero: "Aarav (Age 10) 🪁"
  },
  {
    id: "japan",
    name: "Japan",
    flag: "🇯🇵",
    flagDesc: "A pure white rectangular field with a red circle in the center representing the beautiful rising sun.",
    foodEmoji: "🍣🍡",
    foodName: "Sushi & Sweet Mochi",
    foodDesc: "Delicious hand-rolled vegetable sushi, paired with colorful, chewy sweet mochi (sticky rice cakes) for dessert!",
    prayerPoint: "Pray for children in Japanese towns to find joyful Christian fellowship, make sweet friends, and discover the wonderful hope of the Bible.",
    missionStory: "Yuki loves creating intricate paper cranes using origami. She learned that a dove is a symbol of God's peace. She folds 10 paper doves and hangs them in her room, praying that God's quiet peace covers every child across Asia.",
    kidHero: "Yuki (Age 11) 🕊️"
  }
];

export default function MissionsWorld() {
  const [activeNation, setActiveNation] = useState<MissionNation>(NATIONS[0]);

  return (
    <div className="space-y-8" id="missions-world-root">
      {/* Header Banner */}
      <div className="bg-brand-sand p-6 rounded-[32px] text-brand-dark shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-brand-sand/55">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="bg-brand-olive/20 text-brand-stone font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
            🌍 Global Missions & Compassion
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-brand-dark">
            Missions Around the World!
          </h2>
          <p className="text-sm md:text-base text-brand-stone max-w-lg font-medium">
            Travel the globe! Discover different countries, learn about their flags, taste their traditional foods, read inspiring kids stories, and join in prayer for nations!
          </p>
        </div>
        <div className="text-5xl mt-4 md:mt-0 animate-spin duration-[15000ms]">🌍⛵🛫</div>
      </div>

      {/* Nation selection tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {NATIONS.map((n) => (
          <button
            key={n.id}
            onClick={() => setActiveNation(n)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border-2 ${
              activeNation.id === n.id
                ? "bg-brand-olive text-white border-brand-olive shadow-xs scale-[1.02]"
                : "bg-white text-brand-stone border-brand-sand/45 hover:border-brand-sand"
            }`}
          >
            <span className="text-lg">{n.flag}</span>
            <span>{n.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Flag and local food details */}
        <div className="lg:col-span-4 space-y-6">
          {/* Flag panel */}
          <div className="bg-white border-2 border-brand-sand rounded-[32px] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-brand-sand/65 pb-3">
              <span className="text-5xl shrink-0">{activeNation.flag}</span>
              <div>
                <span className="text-xxs font-black text-brand-olive uppercase tracking-wide">National Flag</span>
                <h3 className="text-lg font-bold font-serif text-brand-dark">{activeNation.name}'s Colors</h3>
              </div>
            </div>
            <p className="text-xs text-brand-stone font-semibold leading-relaxed">
              {activeNation.flagDesc}
            </p>
          </div>

          {/* Traditional Food panel */}
          <div className="bg-white border-2 border-brand-sand rounded-[32px] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-brand-sand/65 pb-3">
              <span className="text-4xl p-2 bg-brand-cream/35 border border-brand-sand rounded-2xl shrink-0">
                {activeNation.foodEmoji}
              </span>
              <div>
                <span className="text-xxs font-black text-brand-olive uppercase tracking-wide flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" /> Traditional Cuisine
                </span>
                <h3 className="text-md font-bold font-serif text-brand-dark">{activeNation.foodName}</h3>
              </div>
            </div>
            <p className="text-xs text-brand-stone font-semibold leading-relaxed">
              {activeNation.foodDesc}
            </p>
          </div>
        </div>

        {/* Right Column: Mission story and global prayer point */}
        <div className="lg:col-span-8 space-y-6">
          {/* Mission Story Card */}
          <div className="bg-white border-2 border-brand-sand rounded-[32px] p-6 shadow-sm space-y-4 relative overflow-hidden">
            {/* Corner accent */}
            <div className="absolute right-4 top-4 text-brand-sand/30 pointer-events-none">
              <Compass className="w-24 h-24 rotate-12" />
            </div>

            <div className="flex items-center gap-2 border-b border-brand-sand/65 pb-3">
              <span className="text-2xl">📖</span>
              <div>
                <span className="text-xxs font-black text-brand-stone uppercase tracking-wider block">
                  Inspiring Mission Story
                </span>
                <h3 className="text-lg font-bold font-serif text-brand-dark">
                  Meet {activeNation.kidHero}
                </h3>
              </div>
            </div>

            <p className="text-xs md:text-sm text-brand-stone font-medium leading-relaxed bg-brand-cream/10 p-4 rounded-2xl border border-brand-sand/35 relative z-10">
              {activeNation.missionStory}
            </p>
          </div>

          {/* Prayer for nations card */}
          <div className="bg-brand-sage/15 border-2 border-brand-sage/40 p-6 rounded-[32px] space-y-3 relative overflow-hidden">
            {/* Background design */}
            <div className="absolute right-4 top-4 text-brand-olive opacity-20">
              <Heart className="w-24 h-24 fill-current" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl">🙏</span>
              <h4 className="text-sm font-black text-brand-olive uppercase tracking-wider">
                Let's Pray for {activeNation.name}!
              </h4>
            </div>

            <p className="text-xs md:text-sm text-brand-stone font-bold italic leading-relaxed relative z-10">
              "{activeNation.prayerPoint}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
