import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from '../signup/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new UserModel("","","","","","");

  constructor(private authService: AuthService,private _router: Router) { }

  message: String = "";
  failedlogin:Boolean = false;

  ngOnInit(): void {
  } 

  loginUser(userlogin:any){  //userlogin - name of template reference variable
    console.log(userlogin.controls['email'].value);  //gets the username that is entered in the form
    this.authService.loginUser(this.user)
    .subscribe(
      res=>{
        if(res.username == "admin"){
          localStorage.setItem('admintoken', res.token);
          this._router.navigate(['/']);
        }
        else{
        localStorage.setItem('token', res.token); //token from backend(res.token) stored in localStorage key name as 'token'
        localStorage.setItem('UserID' , res.userid);
        this._router.navigate(['/']);
        }
      },
      err=>{
        console.log(err);
        this.message = err.error;
        this.failedlogin=true;
      }
    )
  }
}