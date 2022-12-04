import { Component, OnChanges, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.mode';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnChanges {

  activeMenu:boolean = false;
  myShoppingCart:Product[] = []
  lengthTotal: number = 0


  constructor( private shoppingCart:StoreService) {
    this.myShoppingCart = this.shoppingCart.getShopingCart();
    this.lengthTotal =  this.myShoppingCart.length
  }

  ngOnChanges(){
    console.log(this.myShoppingCart)
  }


  ngOnInit(): void {
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

}
