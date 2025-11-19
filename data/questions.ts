import { Question, QuestionCategory } from '../types';

const questionBank: Question[] = [
  // --- Socratic (Self-Reflection) ---
  { id: 's1', category: QuestionCategory.SOCRATIC, text: "When you feel misunderstood, what’s the first thought that pops into your head?" },
  { id: 's2', category: QuestionCategory.SOCRATIC, text: "If your younger self walked into the room right now, what would they need from you most?" },
  { id: 's3', category: QuestionCategory.SOCRATIC, text: "What is a rule you follow in life that feels heavy or exhausting? Where did it come from?" },
  { id: 's4', category: QuestionCategory.SOCRATIC, text: "Do you find it easier to help others or to ask for help? Why do you think that is?" },
  { id: 's5', category: QuestionCategory.SOCRATIC, text: "What emotion are you most afraid of showing to others?" },
  { id: 's6', category: QuestionCategory.SOCRATIC, text: "When you make a mistake, does your internal voice sound like a supportive friend or a strict teacher?" },
  { id: 's7', category: QuestionCategory.SOCRATIC, text: "What’s a compliment you struggle to believe about yourself?" },
  { id: 's8', category: QuestionCategory.SOCRATIC, text: "If you could say 'no' to one thing without guilt today, what would it be?" },
  { id: 's9', category: QuestionCategory.SOCRATIC, text: "What part of your personality did you hide growing up to stay safe or liked?" },
  { id: 's10', category: QuestionCategory.SOCRATIC, text: "When do you feel most like 'you'?" },
  { id: 's11', category: QuestionCategory.SOCRATIC, text: "Are you holding onto a grudge or hurt that feels heavy? What would it feel like to put it down for a minute?" },
  { id: 's12', category: QuestionCategory.SOCRATIC, text: "Do you feel responsible for other people's happiness? Who taught you that?" },
  { id: 's13', category: QuestionCategory.SOCRATIC, text: "What does 'safety' feel like in your body?" },
  { id: 's14', category: QuestionCategory.SOCRATIC, text: "If success wasn't measured by achievement, how would you measure it?" },

  // --- Grounding (Anchor in Present) ---
  { id: 'g1', category: QuestionCategory.GROUNDING, text: "Look around. What are 3 things you see right now that have a calming color?" },
  { id: 'g2', category: QuestionCategory.GROUNDING, text: "Take a deep breath. Where in your body do you feel the most tension right now?" },
  { id: 'g3', category: QuestionCategory.GROUNDING, text: "What is one small thing you did today that was just for you?" },
  { id: 'g4', category: QuestionCategory.GROUNDING, text: "Imagine you are holding a warm cup of your favorite drink. Describe the smell and warmth." },
  { id: 'g5', category: QuestionCategory.GROUNDING, text: "If you could be anywhere in nature right now, where would you be?" },
  { id: 'g6', category: QuestionCategory.GROUNDING, text: "Name one texture near you that feels nice to touch." },
  { id: 'g7', category: QuestionCategory.GROUNDING, text: "What is a sound you hear right now, however faint?" },
  { id: 'g8', category: QuestionCategory.GROUNDING, text: "Place a hand on your heart. What is the rhythm like?" },
  { id: 'g9', category: QuestionCategory.GROUNDING, text: "What is one thing you are grateful for in your immediate surroundings?" },
  { id: 'g10', category: QuestionCategory.GROUNDING, text: "Describe the feeling of your feet on the ground." },

  // --- AMU (Awareness, Mindfulness, Understanding) ---
  { id: 'a1', category: QuestionCategory.AMU, text: "Imagine you’re totally overwhelmed by work or life stress. Do you push through and tough it out, or take a break?", scenario: "You have a deadline looming but your body aches." },
  { id: 'a2', category: QuestionCategory.AMU, text: "How do you usually react when someone cancels plans on you?", options: ["Relief", "Rejection", "Annoyance", "Indifference", "Other"] },
  { id: 'a3', category: QuestionCategory.AMU, text: "When you receive praise, how does it land?", options: ["I deflect it", "I don't believe it", "It makes me uncomfortable", "I accept it happily", "Other"] },
  { id: 'a4', category: QuestionCategory.AMU, text: "Imagine little you dropped an ice cream cone. How do you comfort them?" },
  { id: 'a5', category: QuestionCategory.AMU, text: "When you feel lonely, what is your go-to coping mechanism?", options: ["Scrolling social media", "Sleeping", "Reaching out to a friend", "Overworking", "Other"] },
  { id: 'a6', category: QuestionCategory.AMU, text: "What is a memory that brings you a sense of pure joy?" },
  { id: 'a7', category: QuestionCategory.AMU, text: "How do you handle conflict?", options: ["Avoid at all costs", "People please", "Get defensive", "Communicate openly", "Other"] },
  { id: 'a8', category: QuestionCategory.AMU, text: "What does your inner child need to hear right now?", options: ["I love you", "You are safe", "It's not your fault", "You are enough", "Other"] },
  { id: 'a9', category: QuestionCategory.AMU, text: "Identify a trigger that makes you feel small. What happens just before it?" },
  { id: 'a10', category: QuestionCategory.AMU, text: "Imagine a safe container for your worries. What does it look like?" },
];

// Shuffle array utility
const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => 0.5 - Math.random());
};

export const getSessionQuestions = (): Question[] => {
  const socratic = shuffle(questionBank.filter(q => q.category === QuestionCategory.SOCRATIC)).slice(0, 5);
  const grounding = shuffle(questionBank.filter(q => q.category === QuestionCategory.GROUNDING)).slice(0, 4);
  const amu = shuffle(questionBank.filter(q => q.category === QuestionCategory.AMU)).slice(0, 3);
  
  return shuffle([...socratic, ...grounding, ...amu]);
};