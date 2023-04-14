import { Component } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { switchMap } from 'rxjs';
import { CreateProductDTO, Product, updateProduct } from 'src/app/models/product.model';
import { FilesService } from 'src/app/services/files/files.service';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Params, Router } from '@angular/router'

import { StoreService } from 'src/app/services/store.service';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/services/category/category.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  faClose = faClose
  myShoppingCart: Product[] = []
  total = 0
  today = new Date();
  date = new Date(2021, 2, 21)
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
  categoryId: string = ''

  limit = 10;
  offset = 0;
  products: Product[] = [];
  loadingProducts: boolean = false;

  statusDetail: 'loading' | 'sucess' | 'error' | 'init' = 'init'
  imgRta: string = ''

  constructor(
    private storeServices: StoreService,
    private productService: ProductsService,
    private filesService: FilesService,
    private categoriesService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.myShoppingCart = this.storeServices.getShopingCart()

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.categoryId = params['id'];
      if (this.categoryId) {
        this.loadCategoryProducts(this.categoryId)
      }
    });
    this.loadProducts()
  }

  loadCategoryProducts(categoryId: string) {
    this.categoryId = categoryId;
    this.products = [];
    this.offset = 0;
    this.loadProducts();
  }

  loadProducts() {
    const request$ = this.categoryId ?
      this.categoriesService.getCategory(this.categoryId, this.limit, this.offset) :
      this.productService.getAllProducts(this.limit, this.offset)
    request$
      .subscribe({
        next: (data: Product[]) => {
          this.products = this.products.concat(data);
          this.offset += this.limit;
          if (data.length === 0) {
            this.offset = 0;
          }
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
      });
  }

  loadMoreProducts() {
    this.offset += this.limit;
    this.loadProducts();
  }

  onAddToShoppingCart(product: Product) {
    this.storeServices.addProduct(product)
    this.total = this.storeServices.getTotal()
  }

  toggleProductDetail() {
    this.storeServices.toogleProduct();
  }

  onShowDetail(id: string) {
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
        }
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
}
