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
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION} from '@angular/material/checkbox';
@NgModule({
  declarations: [HomeComponent, QuestionsComponent, AnswerComponent,QuestionComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
  ],
  entryComponents:[
    QuestionComponent,
    AnswerComponent
  ]
})
export class HomeModule { }
