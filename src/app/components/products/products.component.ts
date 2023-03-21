import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { switchMap, zip } from 'rxjs';
import { CreateProductDTO, Product, updateProduct } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

import { StoreService } from 'src/app/services/store.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  cargandoProducts = false;
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
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'sucess' | 'error' | 'init' = 'init'


  // Peticion async
  constructor(
    private storeServices: StoreService,
    private productService: ProductsService
  ) {
    this.myShoppingCart = this.storeServices.getShopingCart()
  }

  ngOnInit(): void {
    // Mejor momento para manejar sync
    this.loadData()

  }


  onAddToShoppingCart( product: Product){
    this.storeServices.addProduct(product)
    this.total = this.storeServices.getTotal()
  }

  toggleProductDetail(){
    this.storeServices.toogleProduct();
  }

  onShowDetail(id : string){
    this.statusDetail = 'loading'
    this.productService.getProduct(id)
    .subscribe({
      next: (data: Product) => {
        this.toggleProductDetail();
        this.productChosen = data;
        this.statusDetail = 'sucess'
      },
      error: repoonse => {
        this.statusDetail = 'error'
        console.log(repoonse.error.message)
      }
    })
  }

  createNewProduct():void{
    const product: CreateProductDTO = {
      title: 'new item',
      description: 'es un nuevo item',
      images: ['https://api.lorem.space/image/fashion?w=640&h=480&r=3115'],
      price: 1000,
      categoryId: 1
    }
    this.productService.create(product)
      .subscribe((data: Product) => {
        this.products.push(data);
      })
  }

  updateProduct(id:string){
    this.cargandoProducts = true
    const changes:updateProduct = {
      title: 'newTitle'
    }
    this.productService.update(id, changes)
    .subscribe({
      next:(data: Product) => {
        const productIndex = this.products.findIndex(data => data.id == id);
        this.products[productIndex] = data;
      },
      error: (error: string) => {
        this.cargandoProducts = false
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    })
  }

  onDeleteProduct(id:string){
    this.cargandoProducts = true;
    this.productService.delete(id)
      .subscribe({
        next:() => {
          const productIndex = this.products.findIndex(data => data.id == id);
          this.products.splice(productIndex,1);
        },
        error: (error: string) => {
          this.cargandoProducts = false;
          console.log(error)
        }
      }
      )
  }

  loadData(){
    console.log('clicbutton')
    this.productService.getAllProducts(this.limit, this.offset)
    .subscribe({
      next:(data: Product[]) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
        if (data.length === 0) {
          this.offset = 0;
        }
      },
      error: (error:string) => {
        this.cargandoProducts = false
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }


  readAndUpdate(id: string){
    this.productService.getProduct(id)
    .pipe(
      switchMap((product) =>
        this.productService.update(product.id, {title: 'change'}),
        ),
      switchMap((product) =>
        this.productService.update(product.id, {title: 'change'}),
        )
    )
    .subscribe(response => console.log(response));
    this.productService.readAndUpdate(id, {title: 'change'})
      .subscribe(
      response => {
        const read= response[0];
        const update= response[1];
      }
    )
  }
}
