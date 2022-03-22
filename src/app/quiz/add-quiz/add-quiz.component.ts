import { Quiz } from './../../models/quiz';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'app/services/quiz/quiz.service';
import { ThrowStmt } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  constructor(
    private _quizService: QuizService
  ) { }

  onSubmit(value: any) {
    console.log(value)

    let quizDetails = {
      name: value.name,
      title: value.title,
      description: value.description,
      buttonName: value.action,
      takenCount: 0,
      imageUrl: "test"
    }
    this.createQuiz(quizDetails)
  }

  createQuiz(quizDetails) {
    this._quizService.createQuiz(quizDetails).subscribe(
      (res) => {
        console.log("res" + res);
      },
      (err) => {
        console.log("err" + err);

      }
    );
  }

  ngOnInit() {
  }

}
