import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

constructor( private authservice:AuthService,
            private router:Router ){}


get usuario(){
  return this.authservice.usuario
}


logout(){
  let confirmado = confirm('¿Esta seguro de cerrar sesion?')

  if( confirmado ){
    this.router.navigateByUrl('/auth')
    this.authservice.logout()
  }

  return
}



}
