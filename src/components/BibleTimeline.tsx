import { useState } from "react";
import { Sparkles, Calendar, BookOpen, ChevronDown, ChevronUp, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TimelineEvent {
  id: string;
  era: string;
  title: string;
  emoji: string;
  period: string;
  scripture: string;
  summary: string;
  deeperStory: string;
  kidChallenge: string;
}

const EVENTS: TimelineEvent[] = [
  {
    id: "creation",
    era: "The Beginning",
    title: "Creation of the World",
    emoji: "🌎☀️🌿",
    period: "Genesis 1-2",
    scripture: "Genesis 1:1 — 'In the beginning, God created the heavens and the earth.'",
    summary: "God spoke and made the light, the rolling blue seas, the green plants, animals, and humanity! Everything was filled with His peace and goodness.",
    deeperStory: "Imagine a world completely dark. Then, God said: 'Let there be light!' Instantly, sparkling sunshine filled the universe. Day by day, God placed stars in the sky like glittering diamonds, created the mighty blue whales, the colorful flying birds, and the sweet sweet garden of Eden.",
    kidChallenge: "Go outside today and count 5 beautiful things God created (like a green leaf, a singing bird, or warm sunshine) and say thank you!",
  },
  {
    id: "noah",
    era: "The Covenant",
    title: "Noah & the Grand Ark",
    emoji: "⛵🦒🕊️",
    period: "Genesis 6-9",
    scripture: "Genesis 9:13 — 'I have set my rainbow in the clouds, and it will be the sign of the covenant.'",
    summary: "Noah built a gigantic wooden ark to save his family and pairs of every creature from a great rainstorm. Afterward, God painted a beautiful rainbow in the sky.",
    deeperStory: "God saw that the earth was losing its goodness, but Noah had a heart of gold. God told him to build a boat larger than a football field! Noah obeyed. Animals came waddling, jumping, and flying in! It rained for forty days, but they were perfectly cozy and dry inside.",
    kidChallenge: "Draw a colorful rainbow on a piece of paper today to remind yourself that God always keeps His promises!",
  },
  {
    id: "abraham",
    era: "The Promise",
    title: "Abraham & Sarah's Stars",
    emoji: "✨⛺🐪",
    period: "Genesis 12-22",
    scripture: "Genesis 15:5 — 'Look up at the sky and count the stars... So shall your offspring be.'",
    summary: "God made a covenant with Abraham to guide him to a new land and make his descendants as plentiful as the stars in the night sky.",
    deeperStory: "Abraham and Sarah were very old and did not have any children. But God took Abraham outside at night and told him his family would grow to be more than anyone could count! Abraham trusted God, and a year later, little Isaac was born, filling their home with laughter.",
    kidChallenge: "Next time you look at the twinkling night stars, remember that God has an incredibly special plan for you and your family!",
  },
  {
    id: "joseph",
    era: "The Dreamer",
    title: "Joseph's Colorful Coat",
    emoji: "🧥🌾👑",
    period: "Genesis 37-50",
    scripture: "Genesis 50:20 — 'You intended to harm me, but God intended it for good.'",
    summary: "Joseph received a beautiful colored coat from his father, dreamed grand dreams, and rose to become a powerful ruler who saved nations from famine.",
    deeperStory: "Joseph's brothers were jealous of his beautiful coat and sold him to Egypt. Joseph went through many hard times, but he never lost his faith. God raised him to be Egypt's prime minister, enabling Joseph to store food and forgive his brothers with a big hug when they needed food.",
    kidChallenge: "Is there someone you need to forgive? Share a smile or a toy with them today, just like Joseph shared food with his brothers!",
  },
  {
    id: "moses",
    era: "The Freedom",
    title: "Moses & the Divided Sea",
    emoji: "👣🌊⚡",
    period: "Exodus 1-20",
    scripture: "Exodus 14:14 — 'The Lord will fight for you; you need only to be still.'",
    summary: "God spoke through a burning bush, sent plagues to free His people, and divided the Red Sea so they could walk across on dry sand.",
    deeperStory: "Moses was a humble shepherd when God called him. When Pharoah's army chased the people, they were trapped against the giant Red Sea. But God told Moses to lift up his staff. A strong wind blew, and the waters piled up like glass walls! Everyone marched across safely.",
    kidChallenge: "Stand perfectly still for 10 seconds and ask God to fill your heart with His quiet, brave peace.",
  },
  {
    id: "david",
    era: "The Kingdom",
    title: "David: Shepherd to King",
    emoji: "🎯👑🐑",
    period: "1 & 2 Samuel",
    scripture: "1 Samuel 16:7 — 'The Lord does not look at the things people look at... the Lord looks at the heart.'",
    summary: "A young boy who watched sheep defeated the giant Goliath with just a sling, became Israel's greatest king, and wrote beautiful praise songs.",
    deeperStory: "While his older brothers were training for war, young David was writing love songs to God on his harp. Because David knew God was with him, he was not afraid of the giant Goliath. Later, as king, he made sure the whole nation sang joyful praises to God daily.",
    kidChallenge: "Make up a simple, happy song of praise to God today using your own words or clapping your hands!",
  },
  {
    id: "jesus",
    era: "The Savior",
    title: "Jesus: The Light of the World",
    emoji: "🌅⛵✝️",
    period: "The Gospels",
    scripture: "John 3:16 — 'For God so loved the world that he gave his one and only Son.'",
    summary: "Jesus was born in a Bethlehem manger, healed sick eyes, taught everyone about God's kingdom, died for our sins, and rose again on Easter Sunday!",
    deeperStory: "Jesus left His heavenly throne to be born as a tiny baby. He grew up healing people who couldn't walk or see, multiplying 5 loaves of bread into a massive feast for 5000 people, and welcoming small children to hug Him. By rising from the dead, He unlocked everlasting life for all who believe!",
    kidChallenge: "Give someone you love a giant hug today and tell them: 'Jesus loves you, and so do I!'",
  },
  {
    id: "church",
    era: "The Mission",
    title: "The Church & Good News",
    emoji: "🕊️🔥🗺️",
    period: "Acts & Epistles",
    scripture: "Acts 1:8 — 'You will receive power when the Holy Spirit comes on you; and you will be my witnesses.'",
    summary: "The Holy Spirit arrived like rushing wind and tongues of joy, empowering the disciples to share God's rescue message with the whole earth.",
    deeperStory: "The early disciples were huddled in a small room when a sound like a mighty wind filled the house! Filled with happiness and power, they began sharing the Good News in different languages. Brave leaders like Paul traveled across stormy seas to plant churches of love and faith.",
    kidChallenge: "Share one cool story you learned about the Bible with a friend, parent, or brother/sister today!",
  }
];

export default function BibleTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>("creation");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-8" id="bible-timeline-root">
      {/* Banner */}
      <div className="bg-brand-sand p-6 rounded-[32px] text-brand-dark shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-brand-sand/55">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="bg-brand-olive/20 text-brand-stone font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
            ⏳ Interactive Timeline Scroll
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-brand-dark">
            The Grand Bible Adventure Storyline!
          </h2>
          <p className="text-sm md:text-base text-brand-stone max-w-lg font-medium">
            Scroll down the holy parchment! Walk through the grand history of God's love from the very first day of Creation all the way to the early Church.
          </p>
        </div>
        <div className="text-5xl mt-4 md:mt-0 animate-pulse duration-2000">⏳📜✨</div>
      </div>

      {/* Timeline Layout */}
      <div className="max-w-3xl mx-auto relative px-4 py-4">
        {/* Center alignment vertical stem line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-brand-sand/65 transform md:-translate-x-1/2 -z-10" />

        <div className="space-y-10">
          {EVENTS.map((evt, idx) => {
            const isExpanded = expandedId === evt.id;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={evt.id}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
                id={`timeline-event-${evt.id}`}
              >
                {/* Visual marker circle in center */}
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                  <button
                    onClick={() => toggleExpand(evt.id)}
                    className={`w-10 h-10 rounded-full border-4 cursor-pointer shadow-sm transition-all duration-300 flex items-center justify-center text-lg ${
                      isExpanded
                        ? "bg-brand-olive border-brand-sand text-white scale-110"
                        : "bg-white border-brand-sand text-brand-stone hover:border-brand-olive"
                    }`}
                  >
                    <span>{idx + 1}</span>
                  </button>
                </div>

                {/* Event Card Content Box */}
                <div className={`w-full pl-14 md:pl-0 md:w-[45%] ${isEven ? "md:pl-6" : "md:pr-6"}`}>
                  <div
                    onClick={() => toggleExpand(evt.id)}
                    className={`bg-white border-2 rounded-3xl p-5 shadow-xs cursor-pointer transition-all duration-200 hover:shadow-sm hover:border-brand-olive/50 ${
                      isExpanded ? "border-brand-olive ring-2 ring-brand-sage/20" : "border-brand-sand/40"
                    }`}
                  >
                    {/* Era & Title */}
                    <div className="flex items-center justify-between">
                      <span className="bg-brand-sage/15 text-brand-stone font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {evt.era}
                      </span>
                      <span className="text-xxs font-extrabold text-brand-stone/60 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {evt.period}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-2xl shrink-0">{evt.emoji}</span>
                      <h3 className="font-bold font-serif text-brand-dark text-base md:text-lg leading-tight">
                        {evt.title}
                      </h3>
                    </div>

                    <p className="text-xs text-brand-stone font-medium leading-relaxed mt-2">
                      {evt.summary}
                    </p>

                    {/* Expand indicator button */}
                    <div className="flex items-center justify-between border-t border-brand-sand/55 mt-4 pt-2.5">
                      <span className="text-[10px] font-bold text-brand-olive flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> Read story & take challenge
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-brand-stone" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-brand-stone" />
                      )}
                    </div>

                    {/* Expanding deep story block */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden mt-3 pt-3 border-t border-dashed border-brand-sand/55 space-y-4"
                          onClick={(e) => e.stopPropagation()} // prevent double toggling
                        >
                          {/* Inner Story box */}
                          <div className="space-y-1">
                            <span className="text-xxs font-black text-brand-stone uppercase tracking-widest block">
                              📖 Beautiful Story:
                            </span>
                            <p className="text-xs text-brand-stone leading-relaxed font-medium bg-brand-cream/10 p-3 rounded-xl border border-brand-sand/35">
                              {evt.deeperStory}
                            </p>
                          </div>

                          {/* Scripture Box */}
                          <div className="bg-brand-sage/10 p-3 rounded-xl border border-brand-sage/20">
                            <span className="text-xxs font-black text-brand-olive uppercase tracking-widest block">
                              📜 Holy Word:
                            </span>
                            <p className="text-xs text-brand-stone font-bold italic mt-0.5">
                              {evt.scripture}
                            </p>
                          </div>

                          {/* Kid friendly challenge */}
                          <div className="bg-brand-gold/15 p-3 rounded-xl border border-brand-gold">
                            <span className="text-xxs font-black text-brand-stone uppercase tracking-widest block flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" /> Kid Mission Challenge:
                            </span>
                            <p className="text-xs text-brand-stone font-semibold mt-0.5">
                              {evt.kidChallenge}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
