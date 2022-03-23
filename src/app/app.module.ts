import { QuizService } from './services/quiz/quiz.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogComponent } from './log/log.component';
import { RouterModule, Routes } from '@angular/router';
import { QuizModule } from './quiz/quiz.module';
import { LogService } from './services/logs/log.service';
import { QuestionsService } from './services/question/questions.service';
import { DatePipe } from '@angular/common';
import { UtilService } from './services/util/util.service';
import { AnswersComponent } from './quiz/answers/answers.component';

const appRoutes: Routes = [
  {
    path: 'quiz',
    loadChildren: () => QuizModule
  },
  {
    path: 'logs',
    component: LogComponent
  },
  {
    path: '',
    redirectTo: 'quiz',
    pathMatch: 'full'
  }
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    QuizService,
    LogService,
    QuestionsService,
    UtilService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
