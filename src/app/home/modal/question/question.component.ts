import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<QuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  async addQuestion() {
    let data: any = this.userService.getUserData();
    data = JSON.parse(data);
    let obj = {
      title: '',
      description: '',
      userDTO: data.object
    };
    try {
      await this.userService.createQuestion(obj).toPromise();

    } catch (error) {
      console.log(error);
      
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
