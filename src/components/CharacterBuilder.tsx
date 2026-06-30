import { useState } from "react";
import { Sparkles, Heart, CheckCircle2, ChevronRight, Award, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CharacterTrait {
  id: string;
  name: string;
  emoji: string;
  motto: string;
  storyTitle: string;
  storyText: string;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  challenge: string;
}

const TRAITS: CharacterTrait[] = [
  {
    id: "kindness",
    name: "Kindness",
    emoji: "🍎💖🐑",
    motto: "A sweet word or sharing hand makes the whole world sunny!",
    storyTitle: "The Whispering Brook Sharing",
    storyText: "Timmy had two shiny red apples for his lunch. On his way to the playground, he saw little Sally crying because she dropped her sandwich in the mud. Timmy ran over and handed her his biggest apple with a warm smile. Sallie stopped crying and gave Timmy a huge happy thank-you drawing!",
    question: "How can you show kindness to a sibling or friend when they are feeling sad?",
    choices: [
      "Ignore them and keep playing with your own toys",
      "Share a snack, give them a warm hug, or draw them a happy picture",
      "Tell them to stop crying because it is loud"
    ],
    correctIndex: 1,
    explanation: "Sharing what you have and listening to others with a gentle smile is a beautiful way to spread God's love!",
    challenge: "Do a secret favor for a parent or friend today, like cleaning up your toys or making a kind card, without them asking!",
  },
  {
    id: "faith",
    name: "Faith",
    emoji: "🛡️🕊️✨",
    motto: "Trusting God's promises even when we can't see the full path!",
    storyTitle: "The Secret Map of Stars",
    storyText: "When Abraham left his homeland, he did not know where he was going. He stood under the wide night sky, looking at millions of twinkling stars, believing that God would protect his family. Abraham trusted God completely, step by step, and found a beautiful land of milk and honey.",
    question: "What does walking by faith look like when you are starting something new and scary?",
    choices: [
      "Refusing to do it because you are afraid",
      "Crying and begging to go back home immediately",
      "Saying a small prayer, taking a deep breath, and trusting God to guide you"
    ],
    correctIndex: 2,
    explanation: "God promised to always be with us! Walking with faith means stepping forward bravely knowing He will protect you.",
    challenge: "Write down or draw one thing you are worried about today, fold the paper, and give it to a parent saying: 'I'm trusting God with this today!'",
  },
  {
    id: "forgiveness",
    name: "Forgiveness",
    emoji: "🤝🤗❤️",
    motto: "Letting go of anger and replacing it with a fresh start!",
    storyTitle: "The Broken Wooden Toy Boat",
    storyText: "Ben worked all afternoon building a small wooden toy sailboat. His little brother accidental stepped on it, snapping the mast in half. Ben felt very angry, but he looked at his brother's teary eyes, remembered how much Jesus forgives us, and said: 'It's okay, let's rebuild it together!'",
    question: "If a friend accidentally ruins one of your drawings, what is the best thing to do?",
    choices: [
      "Forgive them, take a deep breath, and tell them it is okay",
      "Yell at them and break one of their toys on purpose",
      "Refuse to ever talk to them again"
    ],
    correctIndex: 0,
    explanation: "Forgiving others frees our own hearts to be happy and spreads the loving grace that Jesus gives to us every single day!",
    challenge: "If anyone makes a mistake or upsets you today, surprise them by giving them a cheerful smile and saying: 'No worries, I forgive you!'",
  },
  {
    id: "courage",
    name: "Courage",
    emoji: "🦁🗡️🎯",
    motto: "Staying brave to do what is right, even when your knees are shaking!",
    storyTitle: "David & the Valley Shadow",
    storyText: "A giant soldier named Goliath challenged the whole army, and everyone was terrified. But young David walked down the hill alone with just a sling and absolute trust. He did not have heavy armor, but he had God's presence, defeating the giant with a single smooth pebble.",
    question: "Where does true courage come from when we face a giant fear?",
    choices: [
      "Trying to look tough and making angry faces",
      "Remembering that the Creator of the universe is walking right beside you",
      "Running away to hide under your blanket"
    ],
    correctIndex: 1,
    explanation: "Our courage does not come from our size, but from knowing how big and powerful God is! He is always ready to fight our battles.",
    challenge: "Identify one thing you are scared of (like the dark, or speaking in public) and say out loud: 'I am brave because God is with me!'",
  },
  {
    id: "leadership",
    name: "Leadership",
    emoji: "🏰⛵🧭",
    motto: "Guiding others with love, patience, and a helpful heart!",
    storyTitle: "The Shepherd of Lost Lambs",
    storyText: "Joshua was chosen to lead millions of people across the wide Jordan River. He stood at the front of the line, spoke words of encouragement, and helped the elderly and small children cross first. Because he put others before himself, everyone made it to the green meadows safely.",
    question: "What is the true sign of a great Kingdom leader?",
    choices: [
      "Helping and serving others with a cheerful and humble heart",
      "Bossing everyone around and making them do all your chores",
      "Taking the biggest slice of cake and hiding from work"
    ],
    correctIndex: 0,
    explanation: "Jesus taught us that to be a leader, we must be a helper to everyone! True leadership is guiding others by your loving example.",
    challenge: "Take the lead in your home today by volunteering to help set the table, or help clean up a mess you didn't even make!",
  },
  {
    id: "patience",
    name: "Patience",
    emoji: "🌱⏳🐢",
    motto: "Waiting happily with a peaceful heart while God works!",
    storyTitle: "The Little Sunflower Seed",
    storyText: "Emma planted a tiny seed in a brown clay pot. Every morning, she watered it, but nothing happened. She felt like quitting, but her mother said: 'Wait and trust, Emma.' Emma stayed patient, and a few weeks later, a giant golden sunflower burst out, smiling at the sun!",
    question: "How should we behave when we are waiting in a long line or waiting for a prayer to be answered?",
    choices: [
      "Whining, stomping our feet, and complaining that it takes too long",
      "Keeping a peaceful heart, taking deep breaths, and thanking God for His perfect timing",
      "Poking the person in front of you to move faster"
    ],
    correctIndex: 1,
    explanation: "Patience is like a root that grows deep! God's timing is always perfect, and waiting with a peaceful heart builds beautiful strength.",
    challenge: "Next time you feel impatient today (like waiting for dinner or a turn to play), count to 10 slowly and whisper: 'God, thank You for Your perfect timing!'",
  },
  {
    id: "respect",
    name: "Respect",
    emoji: "🙌👵👴",
    motto: "Honoring our parents, teachers, and treating everyone like a treasure!",
    storyTitle: "Ruth's Golden Promise",
    storyText: "Ruth walked along the dusty roads, helping her elderly mother-in-law Naomi. Even when Naomi told her to go rest, Ruth stayed, saying: 'Where you go, I will go.' She worked hard in the fields gathering grain to feed Naomi first, earning the respect of the whole village.",
    question: "Which of the following shows beautiful respect to your parents or guardians?",
    choices: [
      "Rolling your eyes and ignoring them when they ask you to do something",
      "Listening carefully when they speak, obeying with a cheerful voice, and saying 'Yes, please!'",
      "Doing the chore but complaining loudly the whole time"
    ],
    correctIndex: 1,
    explanation: "God promises that when we honor and respect our parents, our lives will be filled with beautiful blessings and long days of joy!",
    challenge: "Look your parent or guardian in the eyes today, give them a giant hug, and say: 'I respect you and thank you for taking such good care of me!'",
  },
  {
    id: "honesty",
    name: "Honesty",
    emoji: "💡🗣️✨",
    motto: "Speaking the absolute truth in love, keeping your light bright!",
    storyTitle: "The Spilled Blue Paint Jar",
    storyText: "Leo accidentally bumped the table, spilling a jar of blue paint all over his dad's favorite book. Leo was terrified of getting in trouble. He thought about hiding the book, but instead, he walked straight to his dad, told the truth, and said sorry. His dad smiled, forgave him, and helped clean it up.",
    question: "If you accidentally break a glass, what is the best thing to do?",
    choices: [
      "Sweep it under the rug and pretend you know nothing about it",
      "Blame it on the dog or your brother",
      "Tell the truth to a parent immediately, even if you feel a little scared"
    ],
    correctIndex: 2,
    explanation: "The truth always brings freedom and trust! Telling the truth keeps our hearts shining bright like beautiful lanterns.",
    challenge: "Make a promise to speak the absolute truth today, even if you make a mistake. Remember, a clean heart is a happy heart!",
  },
  {
    id: "generosity",
    name: "Generosity",
    emoji: "🎁🌾🍉",
    motto: "Giving with a wide, open heart, because God gives so much to us!",
    storyTitle: "The Little Boy's Picnic Basket",
    storyText: "A huge crowd of 5000 hungry people sat on the grass. A small boy stepped forward, holding out his tiny picnic basket of five loaves of barley bread and two small fish. He gave it all to Jesus, who blessed it, multiplying it to feed the entire crowd with 12 baskets left over!",
    question: "What happens when we are generous and share our toys or resources with others?",
    choices: [
      "We lose everything and end up unhappy",
      "God multiplies our joy and we experience the beautiful blessing of giving",
      "We should demand that they pay us back with money"
    ],
    correctIndex: 1,
    explanation: "God is incredibly generous to us! When we share our things with a cheerful heart, we help perform miracles of love in others' lives.",
    challenge: "Find a toy, book, or snack that you love, and share it cheerfully with a friend or sibling today without any complaints!",
  },
  {
    id: "selfcontrol",
    name: "Self-Control",
    emoji: "🛑🧘‍♂️🤫",
    motto: "Guiding your emotions and actions with God's peace!",
    storyTitle: "The Castle Kitchen Feast",
    storyText: "Nehemiah was serving sweet honey cakes at the King's banquet. He felt very sad about his broken city walls, and wanted to cry or slam his tray. But he took a deep breath, prayed silently, kept his composure, and spoke to the King with great wisdom and calm, winning the King's help.",
    question: "When you feel very angry or upset, what is the best way to practice self-control?",
    choices: [
      "Screaming, throwing toys, and stamping your feet loudly",
      "Taking three deep breaths, praying silently in your heart, and speaking with a calm, gentle voice",
      "Slamming the door and refusing to eat dinner"
    ],
    correctIndex: 1,
    explanation: "Self-control is a beautiful fruit of the Spirit! It means letting God's quiet peace rule over our strong emotions.",
    challenge: "Next time you feel upset or angry today, clasp your hands, take three slow deep breaths, and whisper: 'Holy Spirit, fill my heart with Your calm peace!'"
  }
];

export default function CharacterBuilder() {
  const [selectedTrait, setSelectedTrait] = useState<CharacterTrait>(TRAITS[0]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleTraitChange = (trait: CharacterTrait) => {
    setSelectedTrait(trait);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  return (
    <div className="space-y-8" id="character-builder-root">
      {/* Banner */}
      <div className="bg-brand-sand p-6 rounded-[32px] text-brand-dark shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-brand-sand/55">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="bg-brand-olive/20 text-brand-stone font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
            🌳 Today's Kingdom Character
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-brand-dark">
            The Character Builder!
          </h2>
          <p className="text-sm md:text-base text-brand-stone max-w-lg font-medium">
            Discover the beautiful values that make a strong Kingdom Kid! Read stories of honesty, take interactive reflection quizzes, and complete daily challenges!
          </p>
        </div>
        <div className="text-5xl mt-4 md:mt-0 animate-pulse duration-2000">🌳🧒🏅</div>
      </div>

      {/* Trait selector slider */}
      <div className="flex flex-wrap gap-2 justify-center">
        {TRAITS.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTraitChange(t)}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border-2 ${
              selectedTrait.id === t.id
                ? "bg-brand-olive text-white border-brand-olive shadow-xs scale-[1.02]"
                : "bg-white text-brand-stone border-brand-sand/45 hover:border-brand-sand"
            }`}
          >
            <span className="text-sm">{t.emoji[0]}</span>
            <span>{t.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Story and Motto */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border-2 border-brand-sand rounded-[32px] p-6 shadow-sm space-y-5">
            {/* Title / Motto */}
            <div className="flex items-center gap-3 border-b border-brand-sand/65 pb-3">
              <span className="text-4xl">{selectedTrait.emoji}</span>
              <div>
                <h3 className="text-xl font-bold font-serif text-brand-dark">
                  Focus: {selectedTrait.name}
                </h3>
                <p className="text-xs text-brand-stone font-semibold italic">
                  "{selectedTrait.motto}"
                </p>
              </div>
            </div>

            {/* Story */}
            <div className="space-y-2.5">
              <span className="text-xxs font-black text-brand-stone uppercase tracking-wider block">
                📖 Kingdom Character Story:
              </span>
              <h4 className="text-md font-bold font-serif text-brand-dark">
                {selectedTrait.storyTitle}
              </h4>
              <p className="text-xs md:text-sm text-brand-stone font-medium leading-relaxed bg-brand-cream/10 p-4 rounded-2xl border border-brand-sand/35">
                {selectedTrait.storyText}
              </p>
            </div>
          </div>

          {/* Daily Challenge card */}
          <div className="bg-brand-olive p-6 rounded-[32px] text-white shadow-xs relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute right-4 bottom-4 text-brand-cream/15 opacity-10 pointer-events-none">
              <Award className="w-28 h-28 rotate-12" />
            </div>

            <div className="relative z-10 space-y-2">
              <span className="bg-white/20 text-brand-cream font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                🎯 Today's Action Challenge
              </span>
              <h3 className="text-lg font-bold font-serif">
                Build your {selectedTrait.name} today!
              </h3>
              <p className="text-xs md:text-sm text-brand-cream font-semibold leading-relaxed">
                "{selectedTrait.challenge}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Reflection Quiz Activity */}
        <div className="lg:col-span-5">
          <div className="bg-white border-2 border-brand-sand rounded-[32px] p-6 shadow-sm space-y-5 min-h-[380px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b border-brand-sand/65 pb-3">
                <span className="bg-brand-sage/20 text-brand-stone text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                  💡 Let's Reflect Activity
                </span>
                <h3 className="text-md font-bold font-serif text-brand-dark mt-2 leading-snug">
                  {selectedTrait.question}
                </h3>
              </div>

              {/* Choices list */}
              <div className="space-y-2.5">
                {selectedTrait.choices.map((choice, idx) => {
                  const isAnswered = selectedAnswer !== null;
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === selectedTrait.correctIndex;

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleAnswerSelect(idx)}
                      className={`w-full p-3.5 rounded-2xl border text-xs text-left font-bold transition-all ${
                        isAnswered
                          ? isCorrect
                            ? "bg-brand-sage/15 border-brand-sage text-brand-dark"
                            : isSelected
                            ? "bg-rose-50 border-rose-300 text-rose-700"
                            : "bg-brand-sand/10 border-brand-sand/30 opacity-60"
                          : "bg-white border-brand-sand/35 hover:border-brand-sand hover:bg-brand-cream/10 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-brand-cream text-brand-stone font-extrabold text-[10px] flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-snug">{choice}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reflection explanation box */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-brand-cream/35 border border-brand-sand p-4 rounded-2xl space-y-2 mt-4"
                >
                  <div className="flex items-center gap-1.5">
                    {selectedAnswer === selectedTrait.correctIndex ? (
                      <CheckCircle2 className="w-5 h-5 text-brand-olive shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-brand-clay shrink-0" />
                    )}
                    <span className="text-xs font-black text-brand-dark">
                      {selectedAnswer === selectedTrait.correctIndex ? "Incredible Job! ✨" : "Good Try! 🌟"}
                    </span>
                  </div>
                  <p className="text-[11px] md:text-xs text-brand-stone font-semibold leading-relaxed">
                    {selectedTrait.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
