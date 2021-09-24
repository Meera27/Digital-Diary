import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { PostModel } from '../posts/post.model';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  posts : PostModel[] = [];

  constructor(private postService : PostService,public _auth : AuthService, private _router : Router) { }

  ngOnInit(): void {
  }

  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('UserID');
    localStorage.removeItem('postId');
    localStorage.removeItem('updatePostId');
    localStorage.removeItem('blogcatclicked');
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
      console.log(data);
    })
    
  }
}