import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { } 

  addUser(user:any){
    return this.http.post<any>("http://localhost:3000/adduser", {"user" : user})
  }

  loginUser(user: any){
    return this.http.post<any>("http://localhost:3000/login" , user)
  }

  getToken(){    //function to get token value from client side
    return localStorage.getItem('token');
  }
  loggedIn(){
    return !!localStorage.getItem('token'); //boolean value(true/false) , whether user logged in or not
  }
  adminloggedIn(){
    return !!localStorage.getItem('admintoken'); //boolean value(true/false) , whether user logged in or not
  }
}