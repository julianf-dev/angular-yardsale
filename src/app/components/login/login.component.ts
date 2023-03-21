import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: any;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm()
  }

  buildForm(){
    this.formLogin = this.formBuilder.group({
      name_user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signUp(){
    console.log('Login')
  }
}
