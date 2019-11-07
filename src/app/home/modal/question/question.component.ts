import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor(
    private userService:UserService
  ) { }

  ngOnInit() {
  }

  async addQuestion(){
    let obj = {

    };
    await this.userService.createQuestion(obj).toPromise();
  }

}
