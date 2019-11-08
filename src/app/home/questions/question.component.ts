import { Component, OnInit } from '@angular/core';
import { AnswerComponent } from '../modal/answer/answer.component';
import { MatDialog } from '@angular/material/dialog';
import { questionData, userData } from 'src/models/login';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionsComponent implements OnInit {
  name: string;
  animal: string;
  question: questionData;
  userDataParsed;
  upVoteStatus: boolean;
  downVoteStatus: boolean;
  status;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _location: Location,
    public userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    let data = localStorage.getItem('currentUser');
    let userData: userData = JSON.parse(data);
    this.userDataParsed = userData;
    this.name = userData.object.name;
    const questionString = localStorage.getItem('question');
    if (!questionString) {
      this._location.back();
    }
    this.question = JSON.parse(questionString);
    this.userService.getQuestionVoteStatus(this.question.id, this.userDataParsed.object.id).toPromise()
      .then(
        res => {
          this.status = res.status;
          if (this.status == "UP") {
            this.upVoteStatus = true;
            this.downVoteStatus = false;
          } else if (this.status == "DOWN") {
            this.upVoteStatus = false;
            this.downVoteStatus = true;
          }
        }
      )
      .catch(
        err => {
          console.log(err);

        }
      )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AnswerComponent, {
      width: '50vw',
      height: '50vh',
      data: { userData: this.userDataParsed, questionID: this.question.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  goBack() {
    this._location.back();
  }

  async upVoteManager() {
    if (!this.downVoteStatus) {
      this.upVoteStatus = !this.upVoteStatus;
      try {
        if (this.upVoteStatus) {
          let result = await this.userService.addUpVote(this.question.id, this.userDataParsed.object.id).toPromise();
          if (result) {
            this.toastr.success('Upvote Added');
            this.question.up_votes++;
          } else {
            this.errorUpVote();
          }
        } else {
          let result = await this.userService.minusUpVote(this.question.id, this.userDataParsed.object.id).toPromise();
          if (result) {
            this.toastr.success('Upvote Removed');
            this.question.up_votes--;
          } else {
            this.errorUpVote()
          }
        }
      } catch (error) {
        console.log(error);
        this.errorUpVote();
      }

    }
  }

  errorUpVote() {
    this.toastr.error('Error Upvote');
    this.upVoteStatus = !this.upVoteStatus;
  }

  async downVoteManager() {
    if (!this.upVoteStatus) {
      this.downVoteStatus = !this.downVoteStatus;
      try {
        if (this.downVoteStatus) {
          let result = await this.userService.addDownVote(this.question.id, this.userDataParsed.object.id).toPromise();
          if (result) {
            this.toastr.success('Downvote Added');
            this.question.down_votes++;
          } else {
            this.errorDownVote();
          }
        } else {
          let result = await this.userService.minusDownVote(this.question.id, this.userDataParsed.object.id).toPromise();
          if (result) {
            this.toastr.success('Downvote Removed');
            this.question.down_votes--;
          } else {
            this.errorDownVote();
          }
        }
      } catch (error) {
        console.log(error);
        this.errorDownVote();
      }

    }
  }

  errorDownVote() {
    this.toastr.error('Error Downvote');
    this.downVoteStatus = !this.downVoteStatus;
  }
}
