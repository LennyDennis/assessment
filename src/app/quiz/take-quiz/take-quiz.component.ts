import { ResultService } from './../../services/result/result.service';
import { Question } from 'app/models/question';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'app/models/quiz';
import { QuizService } from 'app/services/quiz/quiz.service';
import { DatePipe, Location } from '@angular/common';
import { Jsonp } from '@angular/http';

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
  public hide = false;
  public answeredQuestions: any[] = []


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _quizService: QuizService,
    private _resultService: ResultService,
    private _location: Location,
    private _datePipe: DatePipe
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
          this.questions.map(q => {
            q.answers.map(a => {
              a.isSelected = false
            })
          })
          this.currentQuestion = this.questions[0];
          this.currentQuestion["order"] = 1;
        });
  }

  backClicked() {
    this._location.back();
  }

  lastQuestion(): boolean {
    return this.currentQuestion.order === this.questions.length;
  }

  firstQuestion(): boolean {
    return this.currentQuestion.order === 1;
  }

  setSelectedAnswer(answerId: number) {
    this.unSelectedCheckBoxes();
    this.currentQuestion.answers.find(c => c.id === answerId).isSelected = true;
  }

  unSelectedCheckBoxes() {
    this.currentQuestion.answers.map(c => c.isSelected = false);
  }

  toggleNextQuestion() {
    this.checkAnswer()

    if (this.currentQuestion.order < this.questions.length) {
      let lastOrderNumber = this.currentQuestion.order
      this.currentQuestion = this.questions[lastOrderNumber];
      this.currentQuestion["order"] = lastOrderNumber + 1;
    }
  }

  checkAnswer() {
    this.currentQuestion.answers.map(c => {
      if (c.isSelected == true) {
        c.answered = true;
      }
    });

    let answeredQuestion = {
      question: this.currentQuestion.question,
      resultAnswers: this.currentQuestion.answers
    }

    this.answeredQuestions.push(answeredQuestion)
  }

  submitQuiz() {
    this.hide = true
    this.checkAnswer()

    let date = new Date()

    let quiz = this.quiz
    let resultDetails = {
      quizId: quiz.id,
      name: quiz.name,
      time: this._datePipe.transform(date, 'dd/MM/yyyy'),
      questions: this.answeredQuestions
    }

    this.createResult(resultDetails)
  }

  createResult(resultDetails) {
    this._resultService.createResult(resultDetails).subscribe(
      (res) => {

        console.log("res" + "created result");

      },
      (err) => {
        console.log("err" + err);

      }
    );
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
