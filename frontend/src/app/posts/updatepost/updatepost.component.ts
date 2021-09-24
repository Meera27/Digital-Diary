import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from '../post.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-updatepost',
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.css']
})
export class UpdatepostComponent implements OnInit {

  postItem = new PostModel("","","","","","");
  category:any=['Sports','Technology'];
  selectedDay: any;
  images: any;
  filenames:any;

  constructor(private postService: PostService, private _router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    let postId = localStorage.getItem("updatePostId");
    this.postService.getPost(postId)
    .subscribe((data)=>{
      this.postItem = JSON.parse(JSON.stringify(data)); //stringify = convert from object to JSON ; parse = convert from JSON to object
      this.filenames = this.postItem.image
    })
  }

  selectImage(event:any){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.images = file;
      this.filenames = file.name;
      console.log(this.images);
    }
  }
  UpdatePost(){
    let userid = localStorage.getItem("UserID");
    this.postService.updatePost(this.postItem , userid)
    .subscribe(
      res => {
        const formData = new FormData();
        formData.append('image', this.images);

        this.http.post<any>("http://localhost:3000/posts/file/"+res.imgid,formData)
        .subscribe(
          res => {
            console.log("res " + res)
          },
          err => {
            console.log("err" + err)
          })
        })
    alert('Updated "' + this.postItem.title + '" successfully!');
    this._router.navigate(['/myposts']);
  }
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedDay = event.target.value;
  }
  changeWebsite(e:any) {
    console.log(e.target.value);

  }
}