import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup
  hide: boolean = true;
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  signup(e){
    e.preventDefault();
    if(this.signupForm.valid){
      this.userService.signup(this.signupForm.value.username, this.signupForm.value.password);
    }
  }
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength (128), Validators.minLength(8)])]
    });
  }
  
}
