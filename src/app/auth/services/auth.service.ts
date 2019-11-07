import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { userData } from 'src/models/login';
import { map } from 'rxjs/operators';


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
    return this.http.post<userData>(`${this.url}/auth`,obj).pipe(map(data => {
      // login successful if there's a jwt token in the response
      if (data && data.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data) );
        console.log('User token set');
      } else {
        console.log('Token not found');
        console.log(data);
      }

      return data;
    }));
  }

  imageUpload(uploadData){
    return this.http.post(`${this.url}/images/upload`,uploadData);
  }
  
}
