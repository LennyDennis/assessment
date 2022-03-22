import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuizService } from 'app/services/quiz/quiz.service';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuizesComponent } from './quizes/quizes.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';



const routes: Routes = [
  {
    path: 'quizes',
    component: QuizesComponent
  },
  {
    path: 'questions/:quizId',
    component: TakeQuizComponent,
  },
  // {
  //   path: 'subject/:subjectId/form/:formId',
  //   component: AddQuestionComponent,
  // },
  // {
  //   path: 'subject/:subjectId/form/:formId/topic/:topicId',
  //   component: TakeQuizComponent,
  // },
  {
    path: '',
    redirectTo: 'quizes',
    pathMatch: 'full'
  },

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  providers: [
    QuizService,
  ],
  declarations: [
    QuizesComponent,
    TakeQuizComponent,
    AddQuestionComponent]
})
export class QuizModule { }
