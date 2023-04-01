import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor(
    private cookieService: CookieService
  ) { }

  saveToken(token: string){
    this.cookieService.deleteAll('/');
    this.cookieService.set("token", token)
  }

  getToken(){
    return this.cookieService.get("token")
  }

  removeToken() {
    this.cookieService.deleteAll('/')
    this.cookieService.delete("token", '/');
  }


  //Con local storage

  setUsuario(access_token: string){
    localStorage.setItem('platzi_token', access_token)
  }

  cerrarSesion(){
    localStorage.removeItem('platzi_token')
  }
}
