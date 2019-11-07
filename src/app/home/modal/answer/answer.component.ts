import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { userData } from 'src/models/login';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  answer;
  constructor(
     public dialogRef: MatDialogRef<AnswerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService:UserService,
    private toastr:ToastrService) {} 

  ngOnInit() {
    console.log(this.data);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addAnswer(){
    let obj = {
      answer:this.answer,
      userID:this.data.userData.object.id,
      questionID:this.data.questionID
    };
    this.userService.addAnswer(obj).toPromise().then(
      res=>{
        this.toastr.success('Successfully added answer');
        this.dialogRef.close();
      }
    ).catch(
      err => {
        this.toastr.error('Unable to add answer');
      }
    );
  }

}
