import { Component, OnInit } from '@angular/core';
import { Quiz } from 'app/models/quiz';
import { QuizService } from 'app/services/quiz/quiz.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  quiz: Quiz
  public answers: Array<any>;


  constructor(
    private _quizService: QuizService
  ) {
    // this.quiz = this._quizService.getQuiz()
    this.fetchQuiz(1)
  }

  fetchQuiz(quizId) {
    this._quizService.getQuizApi(quizId)
      .subscribe(
        res => {
          this.quiz = res;
          console.log(this.quiz)
        });
  }

  ngOnInit() {
    this.answers = []
  }

  addAnswer() {
    let answer = {
      "answer": "",
      "correct": false
    }
    let answers = [answer]
    Array.prototype.push.apply(this.answers, answers)
  }

  deleteAnswer(index) {
    console.log(index)
    console.log("index")

    if (index !== -1) {
      this.answers.splice(index, 1);
    }
  }

}
