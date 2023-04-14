import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { StoreService } from 'src/app/services/store.service';
import { switchMap } from 'rxjs'
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements  OnInit {

  faClose = faClose
  disabled:boolean = false;
  productId:string = ''
  product:Product | null = null

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<string>();

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private productsService: ProductsService

    ){

  }
  showProductDetail = false
  showProduct$ = this.storeService.showProduct$

  ngOnInit(): void{
    this.storeService.showProduct$.subscribe(state => {
      this.showProductDetail = state
    })

    this.route.paramMap
      .pipe(
        switchMap((params) => {

          if (this.productId){
            return this.productsService.getProduct(this.productId)
          }
          return [null]
        })
      )
      .subscribe((data) => {
        this.product = data;
      })
  }


  cargarProducto(){

  }
  toggleProductDetail() {
    this.storeService.toogleProduct()
  }

  onAddCart(){
    //this.storeService.addProduct(this.product)
  }


  onDelete(){
    //this.storeService.toogleProduct()
    this.productsService.delete(this.productId)
    .subscribe({
      next: (respuesta:boolean) => console.log(respuesta),
      error: (error:Error) => console.log(error)
    })
  }

}
