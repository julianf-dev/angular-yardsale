import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  formRegistroUsuario: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
    ) {
    this.buildForm()
  }

  buildForm(){
    this.formRegistroUsuario = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      password_confirm: ['', [Validators.required,Validators.minLength(6)]],
    },{
      validators: [
        //to DO servicios validacion
      ]
    });
  }

  signUp(){
    if(this.formRegistroUsuario.valid){
      let newUser = {
        name: this.formRegistroUsuario.get('name').value,
        email: this.formRegistroUsuario.get('email').value,
        password: this.formRegistroUsuario.get('password').value,
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
        role: 'customer'
      }
      this.userService.create(newUser).subscribe(
        {
          next: (respuesta => {
            Swal.fire({
              title: 'Registro exitoso',
              icon: 'success',
              cancelButtonText: 'ok'
            })
            this.router.navigate(['login'])
          }),
          error: (error =>{
            Swal.fire({
              title: 'No pudo ingresar',
              text: error,
              icon: 'error',
              cancelButtonText: 'ok'
            })
          })
        }
      )
    }
  }

  onExit(){
    const confirm = Swal.fire({
      title: 'Do you wan to leave this site?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
      return false
    });
    return confirm
  }
}
