
import { Question, QuestionType } from './types.ts';

const NAM_NEIGHBOURHOOD_SCRIPT = "My neighbourhood is very quiet. It is in the suburbs of the city. There is a large park near my house. The streets are wide and there is not much traffic. The people here are very friendly and helpful.";

const TET_FESTIVAL_SCRIPT = "Tet is the most important festival in Viet Nam. Before Tet, people usually clean and decorate their houses. They buy peach blossoms or apricot blossoms to decorate. Children often get lucky money in red envelopes. People usually visit their relatives and friends during Tet.";

const HOUSE_NEAR_SEA_PASSAGE = "I live in a house near the sea. It is an old house. It is about 100 years old. There is a small garden in front of the house. I live there with my parents. It is very peaceful there. My neighbours are very kind and helpful. We often go to the beach in the afternoon.";

export const QUESTIONS: Question[] = [
  // Listening Section 1
  {
    id: 1,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Listening: Nam's Neighbourhood",
    question: "Nam’s neighbourhood is ____________.",
    options: ["noisy", "quiet", "crowded"],
    correctAnswer: "quiet",
    passage: NAM_NEIGHBOURHOOD_SCRIPT
  },
  {
    id: 2,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Listening: Nam's Neighbourhood",
    question: "Where is his neighbourhood?",
    options: ["In the city centre", "In the suburbs", "Near the airport"],
    correctAnswer: "In the suburbs",
    passage: NAM_NEIGHBOURHOOD_SCRIPT
  },
  {
    id: 3,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Listening: Nam's Neighbourhood",
    question: "There is a ____________ near his house.",
    options: ["large park", "cinema", "supermarket"],
    correctAnswer: "large park",
    passage: NAM_NEIGHBOURHOOD_SCRIPT
  },
  {
    id: 4,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Listening: Nam's Neighbourhood",
    question: "The streets in his area are ____________.",
    options: ["narrow", "wide", "dirty"],
    correctAnswer: "wide",
    passage: NAM_NEIGHBOURHOOD_SCRIPT
  },
  {
    id: 5,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Listening: Nam's Neighbourhood",
    question: "People in his neighbourhood are ____________.",
    options: ["friendly", "unhelpful", "busy"],
    correctAnswer: "friendly",
    passage: NAM_NEIGHBOURHOOD_SCRIPT
  },
  // Listening Section 2
  {
    id: 6,
    type: QuestionType.TRUE_FALSE,
    category: "Listening: Tet Festival",
    question: "Tet is the most important festival in Viet Nam.",
    correctAnswer: "T",
    passage: TET_FESTIVAL_SCRIPT
  },
  {
    id: 7,
    type: QuestionType.TRUE_FALSE,
    category: "Listening: Tet Festival",
    question: "People usually clean and decorate their houses before Tet.",
    correctAnswer: "T",
    passage: TET_FESTIVAL_SCRIPT
  },
  {
    id: 8,
    type: QuestionType.TRUE_FALSE,
    category: "Listening: Tet Festival",
    question: "They buy a Christmas tree for Tet.",
    correctAnswer: "F",
    passage: TET_FESTIVAL_SCRIPT
  },
  {
    id: 9,
    type: QuestionType.TRUE_FALSE,
    category: "Listening: Tet Festival",
    question: "Children often get lucky money in red envelopes.",
    correctAnswer: "T",
    passage: TET_FESTIVAL_SCRIPT
  },
  {
    id: 10,
    type: QuestionType.TRUE_FALSE,
    category: "Listening: Tet Festival",
    question: "People shouldn't visit their relatives during Tet.",
    correctAnswer: "F",
    passage: TET_FESTIVAL_SCRIPT
  },
  // Vocabulary & Grammar
  {
    id: 11,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "Ha Long Bay is famous ____________ its beautiful limestone islands.",
    options: ["for", "with", "about"],
    correctAnswer: "for"
  },
  {
    id: 12,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: '"Excuse me! Could you tell me the ____________ to the post office?"',
    options: ["map", "way", "street"],
    correctAnswer: "way"
  },
  {
    id: 13,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "You ____________ make noise in the library. It’s a school rule.",
    options: ["must", "mustn't", "should"],
    correctAnswer: "mustn't"
  },
  {
    id: 14,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "My brother is very ____________. He likes drawing and painting pictures.",
    options: ["confident", "active", "creative"],
    correctAnswer: "creative"
  },
  {
    id: 15,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "Ho Chi Minh City is ____________ than Da Nang City.",
    options: ["larger", "largest", "more large"],
    correctAnswer: "larger"
  },
  {
    id: 16,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "Before Tet, my mother usually buys some ____________ to decorate the house.",
    options: ["fireworks", "peach blossoms", "lucky money"],
    correctAnswer: "peach blossoms"
  },
  {
    id: 17,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "Sahara is the ____________ desert in the world.",
    options: ["hot", "hotter", "hottest"],
    correctAnswer: "hottest"
  },
  {
    id: 18,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: '"Where is the cat?" - "It is ____________ the table and the sofa."',
    options: ["on", "in", "between"],
    correctAnswer: "between"
  },
  {
    id: 19,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "We need a ____________ to find the way when we are lost in the forest.",
    options: ["backpack", "compass", "sleeping bag"],
    correctAnswer: "compass"
  },
  {
    id: 20,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: '"Happy New Year!" - "____________"',
    options: ["Thank you.", "The same to you.", "Good luck."],
    correctAnswer: "The same to you."
  },
  {
    id: 21,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "Children should ____________ their parents and elderly people.",
    options: ["behave", "respect", "invite"],
    correctAnswer: "respect"
  },
  {
    id: 22,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "Fansipan is the ____________ mountain in Indochina.",
    options: ["higher", "highest", "most high"],
    correctAnswer: "highest"
  },
  {
    id: 23,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "Look! The kids ____________ football in the schoolyard.",
    options: ["play", "are playing", "plays"],
    correctAnswer: "are playing"
  },
  {
    id: 24,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "The air in the countryside is ____________ than in the city.",
    options: ["fresh", "fresher", "freshest"],
    correctAnswer: "fresher"
  },
  {
    id: 25,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "There are many ____________ buildings in New York City.",
    options: ["modern", "narrow", "historic"],
    correctAnswer: "modern"
  },
  {
    id: 26,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "You must bring ____________ because it is very sunny today.",
    options: ["suncream", "scissors", "sleeping bag"],
    correctAnswer: "suncream"
  },
  {
    id: 27,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "People often gather to watch ____________ on New Year's Eve.",
    options: ["furniture", "fireworks", "relatives"],
    correctAnswer: "fireworks"
  },
  {
    id: 28,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "My neighbourhood is very ____________ because there are many cars and trucks.",
    options: ["quiet", "peaceful", "noisy"],
    correctAnswer: "noisy"
  },
  {
    id: 29,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "Tra Co Beach is the ____________ beach in Viet Nam.",
    options: ["longer", "longest", "most long"],
    correctAnswer: "longest"
  },
  {
    id: 30,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "To prepare for the trip, we need a pair of ____________ to cut things.",
    options: ["scissors", "shoes", "glasses"],
    correctAnswer: "scissors"
  },
  {
    id: 31,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: '"Is there a supermarket near here?" - "Yes. Go ____________ and take the second turning on the left."',
    options: ["straight", "wide", "historic"],
    correctAnswer: "straight"
  },
  {
    id: 32,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "Students ____________ copy their friends' work during the exam.",
    options: ["should", "must", "mustn't"],
    correctAnswer: "mustn't"
  },
  {
    id: 33,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "Da Nang is one of the most ____________ cities in Viet Nam.",
    options: ["boring", "exciting", "quiet"],
    correctAnswer: "exciting"
  },
  {
    id: 34,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "We usually visit our ____________ and friends at Tet.",
    options: ["relatives", "neighbours", "teachers"],
    correctAnswer: "relatives"
  },
  {
    id: 35,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Vocabulary & Grammar",
    question: "Walking is ____________ than driving a car.",
    options: ["slower", "slow", "slowest"],
    correctAnswer: "slower"
  },
  // Reading Section 1
  {
    id: 36,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Reading: House near the sea",
    question: "I live in a house near the sea. It is an (36) ______ house. It is about 100 years old.",
    options: ["new", "old", "modern"],
    correctAnswer: "old",
    passage: HOUSE_NEAR_SEA_PASSAGE
  },
  {
    id: 37,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Reading: House near the sea",
    question: "There is a small garden in (37) ______ of the house.",
    options: ["front", "behind", "next"],
    correctAnswer: "front",
    passage: HOUSE_NEAR_SEA_PASSAGE
  },
  {
    id: 38,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Reading: House near the sea",
    question: "I live there with my parents. It is very (38) ______ there.",
    options: ["noisy", "peaceful", "noise"],
    correctAnswer: "peaceful",
    passage: HOUSE_NEAR_SEA_PASSAGE
  },
  {
    id: 39,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Reading: House near the sea",
    question: "My neighbours are very kind (39) ______ helpful.",
    options: ["but", "so", "and"],
    correctAnswer: "and",
    passage: HOUSE_NEAR_SEA_PASSAGE
  },
  {
    id: 40,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Reading: House near the sea",
    question: "We often go to the beach (40) ______ the afternoon.",
    options: ["in", "on", "at"],
    correctAnswer: "in",
    passage: HOUSE_NEAR_SEA_PASSAGE
  },
  // Writing Task 1
  {
    id: 46,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Writing: Re-writing sentences",
    question: "No one in my group is taller than Minh.",
    options: [
        "Minh is taller than no one in my group.",
        "Minh is the tallest person in my group.",
        "Minh is as tall as other people."
    ],
    correctAnswer: "Minh is the tallest person in my group."
  },
  {
    id: 47,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Writing: Re-writing sentences",
    question: "The pharmacy is to the left of the cinema.",
    options: [
        "The cinema is to the right of the pharmacy.",
        "The cinema is behind the pharmacy.",
        "The pharmacy is opposite the cinema."
    ],
    correctAnswer: "The cinema is to the right of the pharmacy."
  },
  {
    id: 48,
    type: QuestionType.MULTIPLE_CHOICE,
    category: "Writing: Re-writing sentences",
    question: "This house is bigger than that house.",
    options: [
        "That house is bigger than this house.",
        "That house is smaller than this house.",
        "That house is the biggest."
    ],
    correctAnswer: "That house is smaller than this house."
  }
];
