import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { AuthModel } from 'src/app/models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/v1/auth`

  constructor(
    private http: HttpClient
  ) { }

  login(user: Partial <User>){
    return this.http.post<AuthModel>(`${this.apiUrl}/login`,user)
  }

  profile(token: string){
    return this.http.post<User>(`${this.apiUrl}/profile`,token)
  }
}
