import { Answer } from './answer';
export interface Question {
    id: number;
    question: string;
    answerType: string;
    quizId: number
    answers: Answer[]
}
