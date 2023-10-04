import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { faClose} from '@fortawesome/free-solid-svg-icons'
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';

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
  categories: Category[] = []
  categoriasFiltradas: Category[] =  [];



  constructor(
    private storeService:StoreService,
    private authService: AuthService,
    private tokenService: TokenService,
    private categoriesService: CategoryService,
    private router: Router
    ) {
      this.getCategories()
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
    this.authService.user$
    .subscribe({
      next: (user) => {
        console.log(user);
        this.profile = user
      },
      error: (error) =>{
        Swal.fire({
          title: 'Error obteniendo usuario',
          text: 'Verifique que haya iniciado sesion',
          icon: 'error',
          cancelButtonText: 'ok'
        })
        this.router.navigate(['login'])

      }
    })
  }

  getCategories(){
    this.categoriesService.getCategories()
    .subscribe({
      next: (respuesta:any) => {
        this.categories = respuesta
        this.categoriasFiltradas = this.categories.slice(0, 5)
      },
      error: (error:Error) => {console.log(error)}
    })
  }

  logOut(){
    this.tokenService.removeToken();
    this.profile = null
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }

}
