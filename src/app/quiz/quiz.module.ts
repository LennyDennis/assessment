import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
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
    path: 'edit/:quizId',
    component: AddQuizComponent,
  },
  {
    path: 'results/:quizId',
    component: ResultsComponent,
  },
  {
    path: 'answers/:resultId',
    component: AnswersComponent,
  },
  {
    path: 'questions',
    component: AddQuestionComponent,
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
