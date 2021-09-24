import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from 'src/app/posts/post.model';
// import { UserModel } from 'src/app/auth/signup/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  post = new PostModel("","","","","","");
  isClicked = false; 
  buttonName:any = 'Show';
  imageurl : string | undefined;
  // buttonNamer:any = 'Add'
  OnClick(){
    this.isClicked = !this.isClicked;
    if(this.isClicked)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  constructor(private postService: PostService, public _auth:AuthService, private _router : Router) { }

  ngOnInit(): void { 
    let postid = localStorage.getItem("postId");
    this.postService.getSinglePost(postid)
    .subscribe((data)=>{
      this.post = JSON.parse(JSON.stringify(data));
      this.imageurl = "http://localhost:3000/uploads/";
    })
  }
  Deletepost(id:any){
    this.postService.deletepost(id);
  }
  AddReview(){
    let postId = localStorage.getItem("updatePostId");
    this.postService.addReview(postId,this.post);
    console.log("Review added is ",this.post);
    alert("success");
    this._router.navigate(['/blogs']); 
  }
  blogCatClicked(){
    return !!localStorage.getItem("blogcatclicked");
  }
}
