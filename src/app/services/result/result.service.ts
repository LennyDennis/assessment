import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Result } from 'app/models/result';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ResultService {

  private _resultBaseUrl = `${environment.baseUrl}/results`

  constructor(private _http: Http) { }

  // getResults(): Observable<Result[]> {
  //   return this._http.get(this._resultBaseUrl)
  //     .map((res: Response) => <Result[]>res.json());
  // }

  getResult(resultId): Observable<Result> {
    return this._http.get(`${this._resultBaseUrl}/${resultId}`)
      .map((res: Response) => <Result>res.json());
  }


  createResult(resultDetails): Observable<any> {
    return this._http.post(this._resultBaseUrl, resultDetails)
      .map(result => result.json());
  }

}
