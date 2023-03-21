import { Injectable } from '@angular/core';
import { CreateUserDTO, User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = `${environment.API_URL}/api/v1/users`

  constructor(
    private http: HttpClient
  ) { }

  setUsuario(access_token: string){
    localStorage.setItem('platzi_token', access_token)
  }
  create(dto: CreateUserDTO){
    return this.http.post<User>(this.apiUrl,dto)
  }

  getAll(){
    return this.http.get<User[]>(this.apiUrl)
  }

  getById(id:string){
    return this.http.get<User>(`${this.apiUrl}/${id}`)
  }

  getTokenUser(){
    return localStorage.getItem('platzi_token');
  }

}
