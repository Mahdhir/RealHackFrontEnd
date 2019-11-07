import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { userData } from 'src/models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `${environment.url}api/v1/authentication`;
  constructor(private http:HttpClient) { }

  isLoggedIn(){
    return true;
  }

  signUp(name,email,password){
    let obj = {
      name:name,
      email:email,
      password:password
    };
    return this.http.post<userData>(`${this.url}/registerUser`,obj);
  }

  login(email,password){
    let obj = {
      username:email,
      password:password
    };
    return this.http.post<userData>(`${this.url}/auth`,obj);
  }


  
}
