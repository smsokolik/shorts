import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  login(username, password){
    this.isLoggedIn = true;
    localStorage.setItem("user", username);
    this.router.navigate([`/user/${username}`])
  }
  logout(){
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
