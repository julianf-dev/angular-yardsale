import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO, Product } from '../models/product.model';
import { catchError, map, retry } from 'rxjs/operators';
import { zip } from 'rxjs';

import {} from '../../environments/environment'
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/v1/products`


  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?:number, offset?:number){
    let params = new HttpParams()
    if(limit !== undefined && offset !== undefined){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl,{params})
    .pipe(
      retry(2),
      map(products => products.map(item => {
        return{
          ...item,
          taxes:  item.price * 0.06
        }
      }))
    )
    // -> gracias al obserrvador podemos reintentar la petecion
  }

  readAndUpdate(id: string, dto: Partial <CreateProductDTO>){
    return zip(
      this.getProduct(id),
      this.update(id, dto),
    )
  }

  getProductByPage(limit: number, offset: number): Observable<any> {
    return this.http.get<Product[]>(this.apiUrl, {
      params: { limit, offset }
    })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            case HttpStatusCode.ServiceUnavailable:
              return throwError(() => new Error("Service Unavailable"))
            case HttpStatusCode.NotFound:
              return throwError(() => new Error("Product Not Found"))
            case HttpStatusCode.Unauthorized:
              return throwError(() => new Error("No has iniciado seision"))
            default:
              return throwError(() => new Error("Error default"))
          }
        })
      );
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
