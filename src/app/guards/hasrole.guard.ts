import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasroleGuard implements CanActivate, CanLoad {

  constructor( private _authservice:AuthService){}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const allowedRoles = route.data?.['allowedRoles'];

      if( allowedRoles.includes(this._authservice.usuario.rol) ){
        return true
      }else{
        return false
      }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const allowedRoles = route.data?.['allowedRoles'];

      if( allowedRoles.includes(this._authservice.usuario.rol) ){
        return true
      }else{
        return false
      }
  }
}
