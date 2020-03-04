import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  currentUsers = [
    { "username": "Lucas", "password": "lwsokolik" },
    { "username": "Joseph", "password": "jmsokolik" },
  ];

  login(username, password){
    
    let loginattempt = this.currentUsers.filter(obj => obj.username === username && obj.password === password);
      if (loginattempt.length === 1) {
        this.isLoggedIn = true;
        localStorage.setItem("user", username);
        this.router.navigate([`/user`]);
        }return true
      }

  logout(){
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  signup(username, password, city){
    let newuser = {
      username : username,
      password : password,
      city: city
    };
    localStorage.setItem('newuser', JSON.stringify(newuser));
  }
  
}
