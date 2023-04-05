import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { faClose} from '@fortawesome/free-solid-svg-icons'
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';

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

  constructor(
    private storeService:StoreService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
    ) {
  }

  myCart$ =  this.storeService.myCart$

  // Nos suscribimos para poder escuchar los cambios
  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length
    })
    this.getUser()
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  getUser(){
    this.authService.getUser()
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
    this.tokenService.removeToken();
    this.router.navigate(['login'])
  }

}
