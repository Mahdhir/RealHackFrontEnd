import { Component, OnInit } from '@angular/core';
import { AnswerComponent } from '../modal/answer/answer.component';
import { MatDialog } from '@angular/material/dialog';
import { questionData, userData } from 'src/models/login';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionsComponent implements OnInit {
  name: string;
  animal: string;
  question:questionData;
  userDataParsed;
  constructor(
    public dialog: MatDialog,
    private router:Router,
    private _location: Location,
    public userService:UserService
  ) { }

  ngOnInit() {
    let data = localStorage.getItem('currentUser');
    let userData:userData = JSON.parse(data);
    this.userDataParsed = userData;
    this.name = userData.object.name;
    const questionString = localStorage.getItem('question');
    if(!questionString){
      this._location.back();
    }
     this.question = JSON.parse(questionString);

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AnswerComponent, {
      width: '50vw',
      height: '50vh',
      data: {userData:this.userDataParsed,questionID:this.question.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  goBack(){
    this._location.back();
  }
}
