import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${environment.API_URL}/api/v1`

  constructor(
    private http: HttpClient
  ) { }

  getCategory(categoryId:string,limit?:number, offset?:number){
    let params = new HttpParams()
    if(limit && offset != null){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`,{params})
  }

  getCategories(){
    return this.http.get<Category>(`${this.apiUrl}/categories/`)
  }

}
