import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { switchMap } from 'rxjs';
import { CreateProductDTO, Product, updateProduct } from 'src/app/models/product.model';
import { FilesService } from 'src/app/services/files/files.service';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute} from '@angular/router'

import { StoreService } from 'src/app/services/store.service';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/services/category/category.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  @Input() products: Product[] = [];
  @Input() set productId(id: string | null){
    if(id != null){
      this.onShowDetail(id)
    }
  }
  // @Input() productId: string | null = null;
  @Output()loadMore = new EventEmitter();

  myShoppingCart: Product[] = []

  /*  Ids to navgiate */
  categoryId: string = ''
  limit = 10;
  offset = 0;
  loadingProducts: boolean = false;
  imgRta: string = ''
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

  /*  Banderas */
  showProductDetail: boolean = false;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';



  constructor(
    private storeServices: StoreService,
    private productService: ProductsService,
    private filesService: FilesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.myShoppingCart = this.storeServices.getShopingCart()
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
    })
  }


  createNewProduct(): void {
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

  updateProduct(id: string) {
    this.loadingProducts = true
    const changes: updateProduct = {
      title: 'newTitle'
    }
    this.productService.update(id, changes)
      .subscribe({
        next: (data: Product) => {
          const productIndex = this.products.findIndex(data => data.id == id);
          this.products[productIndex] = data;
        },
        error: (error: string) => {
          this.loadingProducts = false
          Swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      })
  }

  onDeleteProduct(id: string) {
    this.loadingProducts = true;
    this.productService.delete(id)
      .subscribe({
        next: () => {
          const productIndex = this.products.findIndex(data => data.id == id);
          this.products.splice(productIndex, 1);
        },
        error: (error: string) => {
          this.loadingProducts = false;
          console.log(error)
        }
      }
      )
  }

  readAndUpdate(id: string) {
    this.productService.getProduct(id)
      .pipe(
        switchMap((product) =>
          this.productService.update(product.id, { title: 'change' }),
        ),
        switchMap((product) =>
          this.productService.update(product.id, { title: 'change' }),
        )
      )
      .subscribe(response => console.log(response));
    this.productService.readAndUpdate(id, { title: 'change' })
      .subscribe(
        response => {
          const read = response[0];
          const update = response[1];
        }
      )
  }

  dowloadPDF() {
    this.filesService.getFile('myImage.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
      .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0)
    if (file) {
      this.filesService.uploadFiles(file)
        .subscribe(rta => {
          this.imgRta = rta.location
        })
    }
  }

  toggleProductDetail() {
    this.showProductDetail = false;
  }

  onShowDetail(id: string) {
    if(!this.showProductDetail){
      this.showProductDetail = true
    }
    this.statusDetail = 'loading';
    this.productService.getProduct(id).subscribe(
      (data) => {
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      (errorMsg) => {
        window.alert(errorMsg);
        this.statusDetail = 'error';
      }
    );
  }

  onLoadMore() {
    this.loadMore.emit();
  }

}
