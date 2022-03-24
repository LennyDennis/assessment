import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'app/models/result';
import { QuizService } from 'app/services/quiz/quiz.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  public results: Result[]
  public quizId: any;

  constructor(
    private _quizService: QuizService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
  ) {
    this._activatedRoute.data.subscribe(data => {
      this.quizId = this._activatedRoute.snapshot.params['quizId'];
      this.fetchResults(this.quizId)
    })

  }

  ngOnInit() {
  }

  fetchResults(quizId) {
    this._quizService.getResults(quizId)
      .subscribe(
        res => {
          this.results = res
        });
  }

  backClicked() {
    this._location.back();
  }

}
