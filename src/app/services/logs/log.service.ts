import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Logs } from 'app/models/logs';
import { DatePipe } from '@angular/common';

@Injectable()
export class LogService {

  private _logBaseUrl = `${environment.baseUrl}/logs`

  constructor(
    private _http: Http,
    private _datePipe: DatePipe,
  ) { }

  getLogs(): Observable<Logs[]> {
    return this._http.get(this._logBaseUrl)
      .map((res: Response) => <Logs[]>res.json());
  }

  createLogAPI(logDetails): Observable<any> {
    return this._http.post(this._logBaseUrl, logDetails)
      .map(result => result.json());
  }


  createLog(name: String, action: String) {
    let date = new Date()
    let logDetails = {
      "name": name,
      "action": action,
      "time": this._datePipe.transform(date, 'dd/MM/yyyy')
    }
    this.createLogAPI(logDetails).subscribe(
      (res) => {
        console.log("res" + res);
      },
      (err) => {
        console.log("err" + err);

      }
    );
  }

}
