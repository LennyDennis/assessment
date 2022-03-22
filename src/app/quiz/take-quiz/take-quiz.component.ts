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
  public quizId: any;


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
        });
  }


  fetchAnswers(quizId) {

  }

  ngOnInit() {
  }

}
