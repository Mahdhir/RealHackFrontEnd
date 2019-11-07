import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { questionData, userData } from 'src/models/login';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(
    private userService:UserService,
    private router:Router,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
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

  openQuestion(){
    this.router.navigate(['home/question/:id']);
  }

  openProfile(){
    this.router.navigate(['home/profile']);
  }

  openAskedQuestions(){
    this.router.navigate(['home/questions']);
  }

  logout(){
    this.userService.logout();
  }
  
}
