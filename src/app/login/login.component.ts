import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  hide: boolean = true;
  msg: string;
  constructor(private userService: UserService, private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  login(e){
    e.preventDefault();
    if(this.loginForm.valid){
      this.userService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        res=>{
          if(res["success"]){
          localStorage.setItem("user", res["username"]);
          this.router.navigate([`/user/${res["username"]}`])
          }
          this.msg = res["msg"];
        });
    }
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength (128), Validators.minLength(8)])]
    });
  }
  
}
