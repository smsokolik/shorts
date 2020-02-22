import { Component, OnInit } from '@angular/core';
import { SignupService } from '../services/signup.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup
  hide: boolean = true;
  constructor(private userService: SignupService, private formBuilder: FormBuilder) { }

  signin(e){
    e.preventDefault();
    if(this.signupForm.valid){
      this.signupService.signup(this.signupForm.value.username, this.signupForm.value.password);
    }
  }
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength (128), Validators.minLength(8)])]
    });
  }
  
}
