import { Quiz } from './../../models/quiz';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'app/services/quiz/quiz.service';
import { ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { LogService } from 'app/services/logs/log.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  quizId: any;
  quiz: any = {}
  isEdit: boolean = false

  constructor(
    private _quizService: QuizService,
    private _logService: LogService,
    private _datePipe: DatePipe,
    private _activatedRoute: ActivatedRoute
  ) {

    this._activatedRoute.data.subscribe(data => {
      let retrievedQuizId = this._activatedRoute.snapshot.params['quizId'];
      if (retrievedQuizId != undefined) {
        let retrivedQuiz = this._quizService.getQuiz()
        if (retrivedQuiz != undefined) {
          this.quiz = retrivedQuiz
          this.isEdit = true
        }
      }
    })

  }

  onSubmit(value: any) {
    if (this.isEdit) {
      this.editQuiz()
    } else {

      let quizDetails = {
        name: value.name,
        title: value.title,
        description: value.description,
        buttonName: value.butttonName,
        takenCount: 0,
        imageUrl: "test"
      }

      this.createQuiz(quizDetails)
    }
  }

  //Method for creatin the quiz
  createQuiz(quizDetails) {
    this._quizService.createQuiz(quizDetails).subscribe(
      (res) => {
        // this._logService.createLog(quizDetails.name, "Create")
        this.quizId = res.id
        this._quizService.setQuiz(res)

      },
      (err) => {
        console.log("err" + err);

      }
    );
  }

  //Method for editing the quiz
  editQuiz() {
    this._quizService.editQuiz(this.quiz, this.quiz.id).subscribe(
      (res) => {
        // this.createLog(quizDetails.name,"Edit")
        this.quizId = res.id
        this._quizService.setQuiz(res)
      },
      (err) => {
        console.log("err" + err);

      }
    );
  }

  ngOnInit() {
  }


}
