import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Logs } from 'app/models/logs';

@Injectable()
export class LogService {

  private _logBaseUrl = `${environment.baseUrl}/logs`

  constructor(private _http: Http) { }

  getQuizes(): Observable<Logs[]> {
    return this._http.get(this._logBaseUrl)
      .map((res: Response) => <Logs[]>res.json());
  }

  createQuiz(logDetails): Observable<any> {
    return this._http.post(this._logBaseUrl, logDetails)
      .map(result => result.json());
  }

}
