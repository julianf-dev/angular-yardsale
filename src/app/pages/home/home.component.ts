import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  limit = 10;
  offset = 0;
  products: Product[] = [];
  loadingProducts:boolean = false;

  constructor(
    private productService: ProductsService,
  ){

  }
  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
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
}
