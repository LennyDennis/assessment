import { Answer } from './../models/answer';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuizService } from 'app/services/quiz/quiz.service';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuizesComponent } from './quizes/quizes.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { FormsModule } from '@angular/forms';
import { ResultsComponent } from './results/results.component';
import { AnswersComponent } from './answers/answers.component';



const routes: Routes = [
  {
    path: 'quizes',
    component: QuizesComponent
  },
  {
    path: 'questions/:quizId',
    component: TakeQuizComponent,
  },
  {
    path: 'add',
    component: AddQuizComponent,
  },
  {
    path: 'results/:quizId',
    component: ResultsComponent,
  },
  // {
  //   path: 'answers/:resultId/quiz/:quizId',
  //   component: AddQuizComponent,
  // },
  {
    path: 'answers',
    component: AnswersComponent,
  },
  {
    path: '',
    redirectTo: 'quizes',
    pathMatch: 'full'
  },

]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)],
  providers: [
    QuizService,
  ],
  declarations: [
    QuizesComponent,
    TakeQuizComponent,
    AddQuizComponent,
    ResultsComponent,
    AnswersComponent,
    AddQuestionComponent]
})
export class QuizModule { }
