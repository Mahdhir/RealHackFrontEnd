import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { questionData } from 'src/models/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = `${environment.url}api/v1/user`;

  constructor(private http:HttpClient) { }


  createQuestion(){
    return this.http.post<questionData>(`${this.url}/createQuestion`,null );
  }
}
