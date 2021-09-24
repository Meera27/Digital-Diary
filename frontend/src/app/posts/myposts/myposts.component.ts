import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/auth/signup/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from '../post.model'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {

  posts : PostModel[] = [];
  user = new UserModel("","","","","","");
  imageurl : string | undefined;

  constructor(private postService: PostService ,public _auth:AuthService, private _router: Router) { }

  ngOnInit(): void { 
    let userId = localStorage.getItem("UserID");
    this.postService.getmyPosts(userId)
    .subscribe((data)=>{
      this.posts = JSON.parse(JSON.stringify(data));
      // console.log(this.posts[0].image);
      
      this.imageurl = "http://localhost:3000/uploads/";
      
    })
    this.postService.getUsername(userId)
    .subscribe((data)=>{
      this.user = JSON.parse(JSON.stringify(data));
      
    })
    
   
  }

  UpdatePost(post:any){
    localStorage.setItem("updatePostId" , post._id.toString());
    this._router.navigate(['/updatepost']);
  }

  Confirmdelete(post:any){
    if(confirm('Are you sure you want to delete "' + post.title + '" ?')){
      this.postService.deletePost(post._id)
      .subscribe((data)=>{
        this.posts = this.posts.filter(b => b !== post);  //deletes product from list (line 14) and shows the list of products that is != the deleted product
        })      
        alert("Deletion successfull!");
    }
    
  }

  setPostId(post:any){
    localStorage.setItem("postId" , post._id.toString());
  }

}