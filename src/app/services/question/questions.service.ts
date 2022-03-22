import { Question } from './../../models/question';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class QuestionsService {

  private _questionBaseUrl = `${environment.baseUrl}/quizs`


  constructor(private _http: Http) { }

  // getQuestions(quizId): Observable<Question[]> {
  //   return this._http.get(this._quizBaseUrl)
  //     .map((res: Response) => <Quiz[]>res.json());

  // }



}
