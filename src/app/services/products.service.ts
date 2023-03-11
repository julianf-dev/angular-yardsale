import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO, Product } from '../models/product.mode';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/products'


  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?:number, offset?:number){
    let params = new HttpParams()
    if(limit !== undefined && offset !== undefined){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl,{
      params
    });
  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id:string, dto: Partial <CreateProductDTO>){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
