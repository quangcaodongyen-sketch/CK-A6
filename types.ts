
export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
}

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string;
  category: string;
  explanation?: string;
  passage?: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  isFinished: boolean;
  userAnswers: Record<number, string>;
}
