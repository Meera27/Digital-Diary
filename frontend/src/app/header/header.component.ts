import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _auth : AuthService, private _router : Router) { }

  ngOnInit(): void {
  }

  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('UserID');
    localStorage.removeItem('postId');
    localStorage.removeItem('updatePostId');
    this._router.navigate(['/'])
  }

  adminlogout(){
    localStorage.removeItem('admintoken');
    this._router.navigate(['/'])
  }

}