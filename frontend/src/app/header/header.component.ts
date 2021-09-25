import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { PostModel } from '../posts/post.model';
import { UserModel } from '../auth/signup/user.model';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  posts : PostModel[] = [];
  user = new UserModel("","","","","","");

  constructor(private postService : PostService,public _auth : AuthService, private _router : Router) { }

  ngOnInit(): void {
    let userId = localStorage.getItem("UserID");
    this.postService.getUsername(userId)
    .subscribe((data)=>{
      this.user = JSON.parse(JSON.stringify(data));
      
    })
  }

  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('UserID');
    localStorage.removeItem('postId');
    localStorage.removeItem('updatePostId');
    localStorage.removeItem('blogcatclicked');
    localStorage.removeItem('forusername');
    this._router.navigate(['/'])
  }

  adminlogout(){
    localStorage.removeItem('admintoken');
    this._router.navigate(['/'])
  }
  // blogcatclicked(){
  //   localStorage.setItem("blogcatclicked","true");
  // }
  delblogcatclicked(){
    localStorage.removeItem("blogcatclicked")
  }
  categorySelect(catgselect : any){
    localStorage.setItem("blogcatclicked","true");
    console.log(catgselect);
    this.postService.getBlogsByCatg(catgselect)
    .subscribe((data)=>{
      this.posts = JSON.parse(JSON.stringify(data));
    })
    
  }
}