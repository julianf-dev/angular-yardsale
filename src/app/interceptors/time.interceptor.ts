import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

//a diferencia de los otros no trael app-root
@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const start = performance.now();
    return next
    .handle(request)
    .pipe(
      //Nos permite correr un proceso
      tap(() => {
        const time = (performance.now() - start + 'ms');
        console.log(request.url, time)
      })
    );
  }
}
