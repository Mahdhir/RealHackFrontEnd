import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { questionData } from 'src/models/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  envUrl = environment.url;
  url = `${environment.url}api/v1/user`;

  constructor(private http:HttpClient) { }


  createQuestion(obj){
    return this.http.post<questionData>(`${this.url}/createQuestion`,obj);
  }

  getUserData(){
    return localStorage.getItem('currentUser');
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  addAnswer(obj){
    return this.http.post<questionData>(`${this.url}/provideAnswer`,obj);
  }

  getQuestions(){
    return this.http.get<questionData[]>(`${this.url}/getAllQuestionsWithAnswers`);
  }

  addUpVote(questionID,userID){
    let params = new HttpParams();
    params.append("questionID", questionID);
    params.append('userID',userID);
    return this.http.get<any>(`${this.url}/addUpVote?questionID=${questionID}&userID=${userID}`);
  }

  minusUpVote(questionID,userID){
    let params = new HttpParams();
    params.append("questionID", questionID);
    params.append('userID',userID);
    return this.http.get<any>(`${this.url}/minusUpVote?questionID=${questionID}&userID=${userID}`);
  }

  addDownVote(questionID,userID){
    let params = new HttpParams();
    params.append("questionID", questionID);
    params.append('userID',userID);
    return this.http.get<any>(`${this.url}/addDownVote?questionID=${questionID}&userID=${userID}`);
  }

  minusDownVote(questionID,userID){
    let params = new HttpParams();
    params.append("questionID", questionID);
    params.append('userID',userID);
    return this.http.get<any>(`${this.url}/minusDownVote?questionID=${questionID}&userID=${userID}`);
  }

  getQuestionVoteStatus(questionID,userID){
    let params = new HttpParams();
    params.append("questionID", questionID);
    params.append('userID',userID);
    return this.http.get<any>(`${this.url}/getUserQuestionStatus?questionID=${questionID}&userID=${userID}`);
  }

}
