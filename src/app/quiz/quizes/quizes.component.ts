import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Quiz } from 'app/models/quiz';
import { QuizService } from 'app/services/quiz/quiz.service';
import { Router } from '@angular/router';
import { LogService } from 'app/services/logs/log.service';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.css']
})
export class QuizesComponent implements OnInit {

  public quizes: Quiz[]
  @ViewChild('myModal') myModal;

  constructor(
    private _quizService: QuizService,
    private _logService: LogService,
    private route: Router
  ) {
    this.fetchQuizes();
  }

  ngOnInit(): void {
  }

  fetchQuizes() {
    this._quizService.getQuizes()
      .subscribe(
        res => {
          this.quizes = res;
        });
  }

  deleteQuiz(quizId) {
    this._quizService.deleteQuiz(quizId)
      .pipe(first())
      .subscribe(res => {
        let quiz = this.quizes.find(q => q.id === quizId);
        this.quizes = this.quizes.filter(q => q.id != quizId)
        this._logService.createLog(quiz.name, "Delete")

      })
  }

  editQuiz(quiz) {
    this._quizService.setQuiz(quiz)
    this.route.navigate(['/quiz/edit/' + quiz.id]);

  }

}
