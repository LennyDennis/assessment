import { Question } from 'app/models/question';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'app/models/quiz';
import { QuizService } from 'app/services/quiz/quiz.service';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {

  public quiz: Quiz
  public questions: Question[]
  public quizId: any;
  public currentQuestion: any;
  public submitted = false;


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _quizService: QuizService,
  ) {
    this._activatedRoute.data.subscribe(data => {
      this.quizId = this._activatedRoute.snapshot.params['quizId'];
      this.fetchQuiz(this.quizId)
    })

  }

  fetchQuiz(quizId) {
    this._quizService.getQuiz(quizId)
      .subscribe(
        res => {
          this.quiz = res;
          this.fetchAnswers(this.quiz.id)
        });
  }


  fetchAnswers(quizId) {
    this._quizService.getQuestions(quizId)
      .subscribe(
        res => {
          this.questions = res
          this.currentQuestion = this.questions[0];
          this.currentQuestion["order"] = 1;
        });
  }

  lastQuestion(): boolean {
    return this.currentQuestion.order === this.questions.length;
  }

  firstQuestion(): boolean {
    return this.currentQuestion.order === 1;
  }


  toggleNextQuestion() {
    if (this.currentQuestion.order < this.questions.length) {
      let lastOrderNumber = this.currentQuestion.order
      this.currentQuestion = this.questions[lastOrderNumber];
      this.currentQuestion["order"] = lastOrderNumber + 1;
    }
  }

  togglePreviousQuestion() {
    if (this.currentQuestion.order > 0) {
      let lastOrderNumber = this.currentQuestion.order - 1
      this.currentQuestion = this.questions[lastOrderNumber - 1];
      this.currentQuestion["order"] = lastOrderNumber;
    }
  }

  ngOnInit() {
  }

}
