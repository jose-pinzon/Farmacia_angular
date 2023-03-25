import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private _router:Router,
              private _authservice:AuthService) {}



  get usuario(){
    return this._authservice.usuario
  }


  logout(){
    let confirmado = confirm('¿Esta seguro de cerrar sesion?')

    if( confirmado ){
      this._router.navigateByUrl('/auth')
      this._authservice.logout()
    }

    return
  }
}
