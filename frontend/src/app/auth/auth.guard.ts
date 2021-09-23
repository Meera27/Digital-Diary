   
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private _router: Router){}

  canActivate():boolean{
    if(this.authService.loggedIn()){ //if logged in is true
      return true;
    }
    else{
      this._router.navigate(['/']);
      return false;
    }
  }
}