import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { QuizesComponent } from './quizes/quizes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizesComponent,
    NavbarComponent,
    TakeQuizComponent
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
