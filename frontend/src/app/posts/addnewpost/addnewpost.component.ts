import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from '../post.model';

@Component({
  selector: 'app-addnewpost',
  templateUrl: './addnewpost.component.html',
  styleUrls: ['./addnewpost.component.css']
})
export class AddnewpostComponent implements OnInit {

  postItem = new PostModel("","","","","","");
  category:any=['Sports','Technology'];
  selectedDay: any;
  constructor(private postService : PostService, private _router : Router) { }
  
  ngOnInit(): void {
  }
  
  AddPost(){
    let userid = localStorage.getItem("UserID");
    this.postService.newPost(this.postItem,userid);
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