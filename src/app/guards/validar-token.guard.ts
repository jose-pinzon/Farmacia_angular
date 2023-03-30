import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor( private authservice:AuthService,
                private router:Router ){}

  canActivate(): Observable<boolean> | boolean  {

    return this.authservice.validarToken()
    .pipe(
      tap( valid => {
          if ( !valid ) {
              this.router.navigateByUrl('/auth')
          }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean  {
    return this.authservice.validarToken()
    .pipe(

      tap( valid => {
          if ( !valid ) {
              this.router.navigateByUrl('/auth')
          }
      })

    );

  }
}
