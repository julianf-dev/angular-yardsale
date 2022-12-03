import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.mode';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  myShoppingCart: Product[] = []
  total = 0


  products: Product[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/img/toy.jpg'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/img/bike.jpg'
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/img/album.jpg'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: './assets/img/books.jpg'
    },
  ];

  onAddToShoppingCart( product: Product){
    if (this.myShoppingCart.includes(product)){
      console.log("Ya existe producto")
    } else {
      this.myShoppingCart.push(product);
      this.total = this.myShoppingCart.reduce((sum,item) => sum + item.price, 0)
    }
  }

}
