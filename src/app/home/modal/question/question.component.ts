import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
  question;
  description;
  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<QuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  async addQuestion() {
    let data: any = this.userService.getUserData();
    data = JSON.parse(data);
    let obj = {
      title: this.question,
      description: this.description,
      userId: data.object.id
    };
    try {
      await this.userService.createQuestion(obj).toPromise();
      this.toastr.success('Question Successfully Added');
    } catch (error) {
      console.log(error);
      this.toastr.error('Error');
    }finally{
      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
