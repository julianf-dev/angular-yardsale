import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';
import { User } from 'c:/Users/julian-pc/Documents/dev/angular-yardstore/src/app/models/user.model';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: any;
  profile: User | null = null
  createdUser: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private autService: AuthService,
    private router: Router,
    ) {
    this.buildForm()
  }

  private buildForm(){
    this.formLogin = this.formBuilder.group({
      name_user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(){
    if(this.formLogin.valid){
      let credentials ={
        email: this.formLogin.get('name_user').value,
        password: this.formLogin.get('password').value,
      }
      this.autService.login(credentials)
      .subscribe(
        {
          next: (() => {
            this.router.navigate(['products'])
          }),
          error: (error =>{
            Swal.fire({
              title: 'No pudo ingresar',
              text: 'Verifique sus credenciales',
              icon: 'error',
              cancelButtonText: 'ok'
            })
          })
        }
      )
    }
  }

  registrarse(){
    this.router.navigate(['registrarse'])
  }

  loginAndUpdate(){
    if(this.formLogin.valid){
      let credentials ={
        email: this.formLogin.get('name_user').value,
        password: this.formLogin.get('password').value,
      }
      this.autService.loginAndGetProfile(credentials)
      .subscribe(user => this.profile = user)
    }
  }

}

