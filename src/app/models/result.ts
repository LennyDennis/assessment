import { ResultAnswer } from "./result-answer";

export interface Result {
    id: number;
    quizId: number;
    time: string;
    answers: any[]
}
