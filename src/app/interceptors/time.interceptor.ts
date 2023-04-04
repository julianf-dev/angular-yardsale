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
import { tap } from 'rxjs/operators'


const CHECK_TIME = new HttpContextToken<boolean>(() => false)

export function checkTime(){
  return new HttpContext().set(CHECK_TIME, true)
}
//a diferencia de los otros no trael app-root
@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.context.get(CHECK_TIME)){
      const start = performance.now();
      return next
      .handle(request)
      .pipe(
        //Nos permite correr un proceso
        tap(() => {
          const time = (performance.now() - start + 'ms');
        })
      );
    }
    return next.handle(request);
  }
}
