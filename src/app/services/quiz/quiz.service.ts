import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Quiz } from 'app/models/quiz';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Question } from 'app/models/question';
import { Result } from 'app/models/result';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { LogService } from '../logs/log.service';
import { Router } from '@angular/router';


@Injectable()
export class QuizService {

  quiz: Quiz

  isVisibleSource: BehaviorSubject<boolean> = new BehaviorSubject(false);


  private _quizBaseUrl = `${environment.baseUrl}/quizs`

  constructor(private _http: Http, private route: Router
  ) {
  }

  //get all quizes api call
  getQuizes(): Observable<Quiz[]> {
    return this._http.get(this._quizBaseUrl)
      .map((res: Response) => <Quiz[]>res.json());

  }

  //delete a quiz api call
  deleteQuiz(quizId: number): Observable<any> {
    return this._http.delete(`${this._quizBaseUrl}/${quizId}`)
      .map((res: Response) => <Quiz[]>res.json());

  }

  //get a quiz api call
  getQuizApi(quizId): Observable<Quiz> {
    return this._http.get(`${this._quizBaseUrl}/${quizId}`)
      .map((res: Response) => <Quiz>res.json());
  }

  //get all quiz questions api call
  getQuestions(quizId): Observable<Question[]> {
    return this._http.get(`${this._quizBaseUrl}/${quizId}/questions`)
      .map((res: Response) => <Question[]>res.json());
  }

  //create a quiz api call
  createQuiz(quizDetails): Observable<any> {
    return this._http.post(this._quizBaseUrl, quizDetails)
      .map(result => result.json());
  }

  //edit a quiz api call
  editQuiz(quizDetails, quizId): Observable<any> {
    console.log(quizId)

    return this._http.patch(`${this._quizBaseUrl}/${quizId}`, quizDetails)
      .map(result => result.json());
  }

  //get results of a specific quiz api call
  getResults(quizId): Observable<Result[]> {
    return this._http.get(`${this._quizBaseUrl}/${quizId}/results`)
      .map((res: Response) => <Result[]>res.json());
  }

  //save question to the db
  saveQuestion(questionDetails, quizId): Observable<any> {
    return this._http.post(`${this._quizBaseUrl}/${quizId}/questions`, questionDetails)
      .map(result => result.json());
  }

  //method used to set a quiz share the quiz objetc betweem components
  setQuiz(quiz: Quiz) {
    this.quiz = quiz
  }

  //methods used to get a quiz
  getQuiz() {
    return this.quiz
  }


}
