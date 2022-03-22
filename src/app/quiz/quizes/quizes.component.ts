import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Quiz } from 'app/models/quiz';
import { QuizService } from 'app/services/quiz/quiz.service';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.css']
})
export class QuizesComponent implements OnInit {

  public quizes: Quiz[]  //to create interface for dependents


  constructor(
    private _quizService: QuizService
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
          console.log(this.quizes)
        });
  }

}
