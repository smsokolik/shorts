import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class UserService {
    isLoggedIn: boolean = false;
    constructor(private router: Router, private http: HttpClient) { }

    get currentUser() {
        return localStorage.getItem("users");
    }

    login(uname, pswd) {
        return this.http.post("/api/users/login", {username: uname, password: pswd}).pipe(tap(res => this.isLoggedIn = res["success"])
        )
    }

    signup(uname, pswd) {
      return this.http.post("/api/users/signup", {username: uname, password: pswd})
  }

    logout(){
      this.isLoggedIn = false;
      localStorage.clear();
      this.router.navigate(['/login'])
    }
}