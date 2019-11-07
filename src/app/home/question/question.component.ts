import { Component, OnInit } from '@angular/core';
import { AnswerComponent } from '../modal/answer/answer.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  name: string;
  animal: string;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AnswerComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
