import { Question } from 'app/models/question';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'app/models/quiz';
import { QuizService } from 'app/services/quiz/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  quiz: Quiz
  answers: Array<any>;
  questions: Array<any> = []

  type = "text"

  constructor(
    private _quizService: QuizService,
    private _route: Router
  ) {
    this.quiz = this._quizService.getQuiz()
    // this.fetchQuiz(4)
    this.addQuestion()
  }

  fetchQuiz(quizId) {
    this._quizService.getQuizApi(quizId)
      .subscribe(
        res => {
          this.quiz = res;
        });
  }

  ngOnInit() {
    this.answers = []
  }

  addQuestion() {
    let qt = {
      question: "",
      answerType: "text",
      answers: []
    }

    this.questions.push(qt)

  }

  deleteQuestion(index) {
    if (index !== -1) {
      this.answers.splice(index, 1);
    }
  }

  addAnswer(questionIndex) {

    if (this.questions[questionIndex].answerEmpty) {
      delete this.questions[questionIndex].answerEmpty
    }

    let answer = {
      answer: "",
      correct: false,
      hasError: false
    }

    this.questions[questionIndex].answers.push(answer)
  }

  deleteAnswer(questionIndex, answerIndex) {
    this.questions[questionIndex].answers.splice(answerIndex, 1);
  }

  saveQuestion() {

    let hasQuestionError = true;

    this.questions.map((q, index) => {
      if (q.hasError) {
        delete q.hasError
      }
      delete q.answerNotSelected

      if (q.question == undefined || q.question == null || q.question.length == 0) {
        q.hasError = true
      } else {
        if (q.answers.length > 0) {
          let isCorrect = false
          q.answers.map((answer, i) => {
            if (answer.answer.length === 0) {
              answer.hasError = true
            } else {
              answer.hasError = false
            }

            if (answer.correct == true) {
              isCorrect = true
            }
          })

          q.answerNotSelected = !isCorrect
          let answerError = false;
          q.answers.map(answer => {
            if (answer.hasError === true) {
              answerError = true
            }
          })


          if (answerError || q.answerNotSelected) {
            hasQuestionError = true
          } else {
            hasQuestionError = false
          }

        } else {
          q.answerEmpty = true
        }
      }
    })

    if (!hasQuestionError) {
      this.saveQuestionDB()
    } else {
      console.log("error")
    }
  }

  saveQuestionDB() {
    this.questions.map((question, index) => {
      delete question.answerNotSelected
      question.answers.map((answer, i) => {
        answer.id = (i + 1)
        delete answer.hasError
      })

      let questionDetails = {
        question: question.question,
        quizId: this.quiz.id,
        answerType: question.answerType,
        answers: question.answers
      }

      this._quizService.saveQuestion(questionDetails, this.quiz.id).subscribe(
        (res) => {
          console.log("res" + "Success");
          this._route.navigate(['/quiz']);
        },
        (err) => {
          console.log("err" + err);

        }
      );
    })
  }

  setSelectedAnswer(questionIndex, answerIndex) {
    this.questions[questionIndex].answers.map((answer, i) => {
      (i == answerIndex) ? answer.correct = true : answer.correct = false
    })
  }


}
