import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from '../post.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addnewpost',
  templateUrl: './addnewpost.component.html',
  styleUrls: ['./addnewpost.component.css']
})
export class AddnewpostComponent implements OnInit {

  postItem = new PostModel("","","","","","");
  category:any=['Sports','Technology'];
  selectedDay: any;
  images: any;
  filenames:String = "No Image Chosen";

  constructor(private postService : PostService, private _router : Router, private http: HttpClient) { }
  
  ngOnInit(): void {
  }
  
  selectImage(event:any){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.images = file;
      this.filenames = file.name;
    }
  }
  AddPost(){
    let userid = localStorage.getItem("UserID");
    
    this.postService.newPost(this.postItem,userid)
    .subscribe(
      res => {
        console.log("id " + res);
        const formData = new FormData();
        formData.append('image', this.images);

        this.http.post<any>("http://localhost:3000/posts/file/"+res,formData)
        .subscribe(
          res => {
            console.log("res " + res)
          },
          err => {
            console.log("err" + err)
      }
    )

      }
    )
    console.log("added");
    alert('Added "' + this.postItem.title + '" successfully!');
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