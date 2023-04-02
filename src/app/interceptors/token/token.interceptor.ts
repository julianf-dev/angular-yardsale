import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token/token.service';

const ADD_TOKEN =new HttpContextToken<boolean>(() =>true);

export function addToken() {
  return new HttpContext().set(ADD_TOKEN,false);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenServices: TokenService
  ) {}

  // Logica para que intercepte si la peticion viene con un token
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //Antes de que salga la peticion
    //Interceptarlo y luego adjuntarlo a los headers
    if(request.context.get(ADD_TOKEN)){
      request = this.addToken(request);
      return next.handle(request);
    }else{
      return next.handle(request)
    }
  }

  private addToken(request:  HttpRequest<unknown>){
    const token = this.tokenServices.getToken()
    if(token){
      const authReq =request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
      console.log(authReq)
      return authReq;
    }

    return request;
  }
}
