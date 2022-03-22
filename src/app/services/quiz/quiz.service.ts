import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Quiz } from 'app/models/quiz';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class QuizService {

  constructor(private _http: Http) { }

  getQuizes(): Observable<Quiz[]> {
    return this._http.get(`${environment.baseUrl}/quizs`)
      .map((res: Response) => <Quiz[]>res.json());

  }

}
