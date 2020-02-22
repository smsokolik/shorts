import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup
  hide: boolean = true;
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  signin(e){
    e.preventDefault();
    if(this.loginForm.valid){
      this.userService.signin(this.signinForm.value.username, this.loginForm.value.password);
    }
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength (128), Validators.minLength(8)])]
    });
  }
  
}
