import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { faClose} from '@fortawesome/free-solid-svg-icons'
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0
  faClose = faClose
  profile: User | null = null
  token: any

  constructor(
    private storeService:StoreService,
    private authService: AuthService,
    private router: Router
    ) {
  }

  myCart$ =  this.storeService.myCart$

  // Nos suscribimos para poder escuchar los cambios
  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length
    })
    this.getProfileAndUser()
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  getProfileAndUser(){
    this.token = localStorage.getItem('platzi_token');
    this.authService.getProfileUser(this.token)
    .subscribe({
      next: (respuesta) => {
        this.profile = respuesta
      },
      error: (error) =>{
        Swal.fire({
          title: 'Error obteniendo usuario',
          text: 'Verifique que haya iniciado sesion',
          icon: 'error',
          cancelButtonText: 'ok'
        })
      }
    })
  }

  logOut(){
    this.authService.cerrarSesion();
    this.router.navigate(['login'])

  }

}
