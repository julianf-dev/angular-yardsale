import { Component, inject } from "@angular/core";
import { TokenService } from "./services/token/token.service";
import { AuthService } from "./services/auth/auth.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  authService= inject(AuthService);
  tokenService = inject(TokenService)

  ngOnInit(){
    /*this.deleteSessionCookies() */
    this.getProfile();
  }

  getProfile(){
    const token = this.tokenService.getToken();
    if(token){
      this.authService.getUser()
      .subscribe()
    }
  }
  // If the event arrives from the child successfully
  onLoaded(img:string){
    console.log('log padre', img)
    }

  toggleImg() {
    this.showImg = !this.showImg;
  }

/*
  deleteSessionCookies() {
    // Obtener todas las cookies
    const cookies = document.cookie.split(';');

    cookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();
      // Establecer la fecha de expiración en el pasado para eliminar la cookie
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  } */


}
