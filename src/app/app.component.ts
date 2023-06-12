import { Component } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;


  ngOnInit(){
/*     this.deleteSessionCookies() */
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
