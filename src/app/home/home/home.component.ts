import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { questionData, userData } from 'src/models/login';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionComponent } from '../modal/question/question.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name: string;
  animal: string;
  questions:questionData[];
  constructor(
    public userService:UserService,
    private router:Router,
    private toastr:ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    let data = localStorage.getItem('currentUser');
    if(!data){
      this.router.navigate(['login'],{replaceUrl:true});
    }
    let userData:userData = JSON.parse(data);
    this.name = userData.object.name;
    this.userService.getQuestions().toPromise()
    .then(  
      res => {
        this.questions = res;
        this.questions = this.questions.reverse();
        console.log(res);
        
      }
    )
    .catch(
      err => {
        console.log(err);
        
      }
    );
  }

  askQuestion(){
    let data = this.userService.getUserData();
    if(!data){
      return;
    }
    let userData:userData = JSON.parse(data);
    let obj = {
      title:'',
      description:'',
      userDTO:userData.object
    };
    this.userService.createQuestion(obj).toPromise()
    .then(
      res => {
        console.log(res);   
      }
    )
    .catch(
      err => {
        console.log(err);  
      }
    );
  }

  openQuestion(question){
    localStorage.setItem('question',JSON.stringify(question));
    this.router.navigate(['home/question/1']);
  }

  openProfile(){
    this.router.navigate(['home/profile']);
  }

  openAskedQuestions(){
    this.router.navigate(['home/questions']);
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['login'],{replaceUrl: true});
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(QuestionComponent, {
      width: '50vw',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  
}
