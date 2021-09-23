import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { BlogsComponent } from './blogs/blogs.component';
import { HeaderComponent } from './header/header.component';
import { MypostsComponent } from './posts/myposts/myposts.component';
import { PostService } from './services/post.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AddnewpostComponent } from './posts/addnewpost/addnewpost.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './auth/token-interceptor.service';

import { UpdatepostComponent } from './posts/updatepost/updatepost.component';

import { BlogComponent } from './blog/blog.component';
import { BlogsComponent } from './blogs/blogs.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MypostsComponent,
    LoginComponent,
    SignupComponent,
    AddnewpostComponent,
    HomeComponent,
    UpdatepostComponent,
    BlogComponent,
    BlogsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PostService , AuthService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
     }],
  bootstrap: [AppComponent]
})
export class AppModule { }
