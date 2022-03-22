import { Component, OnInit } from '@angular/core';
import { Logs } from 'app/models/logs';
import { LogService } from 'app/services/logs/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  public logs: Logs[]

  constructor(
    private _logService: LogService
  ) {
    this.fetchLogs();
  }

  ngOnInit(): void {
  }

  fetchLogs() {
    this._logService.getLogs()
      .subscribe(
        res => {
          console.log(res)
          this.logs = res;
        });
  }

}
