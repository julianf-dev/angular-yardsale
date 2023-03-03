import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { CreateProductDTO, Product } from 'src/app/models/product.mode';
import { ProductsService } from 'src/app/services/products.service';

import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  cargandoProducts = false;
  showProduct = false;
  faClose = faClose
  myShoppingCart: Product[] = []
  total = 0
  today = new Date();
  date = new Date(2021,2,21)
  products: Product[] = [];
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
      image: ''
    },
    description: ''
  }


  // Peticion async
  constructor(
    private storeServices: StoreService,
    private productService: ProductsService
  ) {
    this.myShoppingCart = this.storeServices.getShopingCart()
  }

  ngOnInit(): void {
    // Mejor momento para manejar sync
    this.cargandoProducts = true
    this.productService.getAllProducts()
    .subscribe({
      next:(products) => {
        this.products = products;
      },
      error: (error) => {
        this.cargandoProducts = false
        console.error(error);
      },
    });
  }


  onAddToShoppingCart( product: Product){
    this.storeServices.addProduct(product)
    this.total = this.storeServices.getTotal()
  }

  toggleProductDetail(){
    this.showProduct = !this.showProduct
    //this.storeServices.toogleProduct();
  }

  onShowDetail(id : string){
    console.log(id)
    this.productService.getProduct(id)
    .subscribe(data => {
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }

  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'new item',
      description: 'es un nuevo item',
      images: [''],
      price: 1000,
      categoryId: 1
    }
    this.productService.create(product)
      .subscribe(data => {
        this.products.unshift(data);
      })
  }

  updateProduct(product: Partial<CreateProductDTO>){
    console.log(product)
   /*  const changes: UpdateProductDTO = {
      title: 'new Title',
    }
    const id = this.productChosen.id;
    this.productService.update(id, changes)
    .subscribe(data => {
      console.log(data)
    }) */

  }


}
