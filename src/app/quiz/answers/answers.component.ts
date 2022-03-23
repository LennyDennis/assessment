import { ResultService } from '../../services/result/result.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'app/models/result';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  public resultId: any;
  public result: Result

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _resultService: ResultService
  ) {
    this._activatedRoute.data.subscribe(data => {
      this.resultId = this._activatedRoute.snapshot.params['resultId'];
      console.log(this.resultId)
      this.fetchResult(this.resultId)

    })
  }

  fetchResult(resultId) {
    this._resultService.getResult(resultId)
      .subscribe(
        res => {
          this.result = res
          console.log(this.result)
        });
  }
  ngOnInit() {
  }

}
