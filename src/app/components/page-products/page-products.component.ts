import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { StoreService } from 'src/app/services/store.service';
import { switchMap } from 'rxjs'
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-products',
  templateUrl: './page-products.component.html',
  styleUrls: ['./page-products.component.scss']
})
export class PageProductsComponent {
  faClose = faArrowLeft
  disabled:boolean = false;
  productId:string = ''
  product:Product | null = null
  addCartImg:string = '/assets/icons/bt_add_to_cart.svg'
  messageAdd:string = 'Add to Cart'


  @Output() addedProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<string>();

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
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
          const id = params.get('id')
          if (id != null){
            this.productId = id
            return this.productsService.getProduct(this.productId)
          }
          return [null]
        })
      )
      .subscribe((data) => {
        console.log(data)
        this.product = data;
      })
  }

  getBack() {
    //this.storeService.toogleProduct()
    this.router.navigate(['home/category', this.product?.category.id])
  }

  onAddCart(){
    if(this.product !== null){
      this.storeService.addProduct(this.product)
      this.addCartImg = '/assets/icons/bt_added_to_cart.svg';
      this.messageAdd = 'Product added'
    }
  }


  onDelete(){
    //this.storeService.toogleProduct()
    this.productsService.delete(this.productId ?? '')
    .subscribe({
      next: (respuesta:boolean) => {
        Swal.fire({
          icon: 'success',
          title: 'Product deleted'
        })
        this.router.navigate(['home/category', this.product?.category.id])
      },
      error: (error:Error) => console.log(error)
    });
  }
}
