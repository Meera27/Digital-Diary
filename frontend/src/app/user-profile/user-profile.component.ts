// import { Component, OnInit } from '@angular/core';
// import { UserModel } from '../auth/signup/user.model';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.css']
// })
// export class UserProfileComponent implements OnInit {
 
//   user = new UserModel("","","","","","");
//   constructor(public _auth:AuthService) { }

//   ngOnInit(): void {
//     let userid = localStorage.getItem("UserID");
//     this._auth.getuser(userid)
//     .subscribe((data)=>{
//       this.user = JSON.parse(JSON.stringify(data));
//     })
//   }
// }
