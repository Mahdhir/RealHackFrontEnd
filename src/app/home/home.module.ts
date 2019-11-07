import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatCardModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { QuestionsComponent } from './questions/question.component';
import { AnswerComponent } from './modal/answer/answer.component';
import {MatDialogModule} from '@angular/material/dialog';
import { QuestionComponent } from './modal/question/question.component';
@NgModule({
  declarations: [HomeComponent, QuestionsComponent, AnswerComponent,QuestionComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule
  ],
  entryComponents:[
    QuestionComponent,
    AnswerComponent
  ]
})
export class HomeModule { }
