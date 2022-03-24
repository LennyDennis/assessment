import { Question } from 'app/models/question';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'app/models/quiz';
import { QuizService } from 'app/services/quiz/quiz.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  quiz: Quiz
  public answers: Array<any>;
  question: any
  type = "text"
  questionDetails: any = {}

  constructor(
    private _quizService: QuizService
  ) {
    // this.quiz = this._quizService.getQuiz()
    this.fetchQuiz(1)
  }

  fetchQuiz(quizId) {
    this._quizService.getQuizApi(quizId)
      .subscribe(
        res => {
          this.quiz = res;
          console.log(this.quiz)
        });
  }

  ngOnInit() {
    this.answers = []
  }

  addAnswer() {
    let answer = {
      answer: "",
      correct: false
    }
    this.answers.push(answer)
  }

  deleteAnswer(index) {
    if (index !== -1) {
      this.answers.splice(index, 1);
    }
  }

  saveQuestion() {
    this.answers.map((answer, i) => {
      answer.id = (i + 1)
    })

    this.questionDetails = {
      question: this.question,
      type: this.type,
      answers: this.answers
    }

    this._quizService.saveQuestion(this.questionDetails, this.quiz.id).subscribe(
      (res) => {
        console.log("res" + "Success");
      },
      (err) => {
        console.log("err" + err);

      }
    );
  }


  setSelectedAnswer(index: number) {
    this.answers.map((answer, i) => {
      console.log(index, i);
      (i == index) ? answer.correct = true : answer.correct = false
    })
  }



}
