import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup
  hide: boolean = true;
  msg: string;
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  signup(e){
    e.preventDefault();
    if(this.signupForm.valid){
      this.userService.signup(this.signupForm.value.username, this.signupForm.value.password).subscribe(
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
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength (128), Validators.minLength(8)])]
    });
  }
  
}
