import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.mode';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu:boolean = false;
  counter = 0


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
