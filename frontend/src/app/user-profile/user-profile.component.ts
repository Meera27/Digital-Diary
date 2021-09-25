import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../auth/signup/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
 
  userItem = new UserModel("","","","","","");
  confpaswd="";
  samepaswd: Boolean = false;
  paswdval:String="";

  constructor(private authservice:AuthService,private _router:Router) { }

  ngOnInit(): void {
    let userid = localStorage.getItem("UserID");
    this.authservice.getuser(userid)
    .subscribe((data)=>{
      this.userItem = JSON.parse(JSON.stringify(data));
      this.userItem.paswd="";
    })
  }
  changeuserprofile(){
    let userid = localStorage.getItem("UserID");
    this.authservice.updateUser(this.userItem, userid);
    alert('Updated successfully!');
  }
  check(){
    if(this.confpaswd == this.userItem.paswd){
      this.samepaswd = true;
      this.paswdval = "";
    }
    else{
      this.samepaswd = false;
      this.paswdval = "Passwords must be same";
    }
  }
}
