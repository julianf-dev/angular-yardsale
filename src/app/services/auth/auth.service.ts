import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { AuthModel } from 'src/app/models/auth.model';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { TokenService } from '../token/token.service';
import { addToken } from 'src/app/interceptors/token/token.interceptor';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/v1/auth`
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenservice: TokenService,
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
    return this.http.post<AuthModel>(`${this.apiUrl}/login`,user, { context: addToken()})
    .pipe(
      tap((response) => this.tokenservice.saveToken(response.access_token)),
    )
  }

  getUser(): Observable<User> {
    /*let headers = new HttpHeaders();
    Es importante el espacio, sin el espacio puede ocurrir errores
     headers = headers.set('Authorization', `Bearer ${token}`) */
    return this.http.get<User>(`${this.apiUrl}/profile`)
    .pipe(
      //Tap se usa para haga una accion cuando reciba la respuesta
      tap( user => this.user.next(user))
    )
  }

  loginAndGetProfile(credenciales: Partial<User>){
    return this.login(credenciales)
    .pipe(
      switchMap(() => this.getUser())
    )
  }
}
