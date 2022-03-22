import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';

@Injectable()
export class QuestionsService {

  private _quizBaseUrl = `${environment.baseUrl}/quizs`


  constructor(private _http: Http) { }

  getQuizes(): Observable<Quiz[]> {
    return this._http.get(this._quizBaseUrl)
      .map((res: Response) => <Quiz[]>res.json());

  }

  getQuiz(quizId): Observable<Quiz> {
    return this._http.get(`${this._quizBaseUrl}/${quizId}`)
      .map((res: Response) => <Quiz>res.json());

  }

}
