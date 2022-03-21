import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { QuizesComponent } from './quizes/quizes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ResultsComponent } from './results/results.component';
import { LogComponent } from './log/log.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizesComponent,
    NavbarComponent,
    TakeQuizComponent,
    AddQuizComponent,
    AddQuestionComponent,
    ResultsComponent,
    LogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
