import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { faClose} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0
  faClose = faClose


  constructor( private storeService:StoreService) {
  }

  myCart$ =  this.storeService.myCart$


  // Nos suscribimos para poder escuchar los cambios
  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length
    })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

}
