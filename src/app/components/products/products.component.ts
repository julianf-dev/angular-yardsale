import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.mode';
import { ProductsService } from 'src/app/services/products.service';

import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {



  myShoppingCart: Product[] = []
  total = 0
  today = new Date();
  date = new Date(2021,2,21)
  showProductDetail = false;
  products: Product[] = [];


  // Peticion async
  constructor(
    private storeServices: StoreService,
    private productService: ProductsService
  ) {
    this.myShoppingCart = this.storeServices.getShopingCart()
  }

  ngOnInit(): void {
    // Mejor momento para manejar sync
    this.productService.getAllProducts()
    .subscribe({
      next:(products) => {
        this.products = products;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }


  onAddToShoppingCart( product: Product){
    this.storeServices.addProduct(product)
    this.total = this.storeServices.getTotal()
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id : string){
    this.productService.getProduct(id)
    .subscribe(data => {
      console.log('product', data)
    })
  }
}
