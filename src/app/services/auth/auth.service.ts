import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { AuthModel } from 'src/app/models/auth.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/v1/auth`

  constructor(
    private http: HttpClient
  ) { }

  getHttpHeaders() {
    const token = localStorage.getItem('platzi_token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  login(user: Partial <User>){
    return this.http.post<AuthModel>(`${this.apiUrl}/login`,user)
  }

  getProfileUser(token: string): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.get<User>(`${this.apiUrl}/profile`,{headers});
  }

  cerrarSesion(){
    localStorage.removeItem('platzi_token')
  }
}
