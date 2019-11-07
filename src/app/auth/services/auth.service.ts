import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  isLoggedIn(){
    return true;
  }

  login(email,password){
    return this.http.get<any>('');
  }
}
