import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TokenService } from '../services/token/token.service';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /* const token = this.tokenService.getToken();

    if(!token){
      this.router.navigate(['login'])
      return false
    } */
    return this.authService.user$
    .pipe(
      map(user => {
        console.log(user);
        if(!user) {
          this.router.navigate(['website/home']);
          return false;
        }
        return true;
      })
    )
  }

}
