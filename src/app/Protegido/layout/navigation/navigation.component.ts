import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


interface ruta{
  ruta:string;
  nombre:string;
  icono:string;
  permission:string[];
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  Allrutas:ruta[] = [
    {
      ruta:'/dashboard',
      nombre:'Home',
      icono:'Home',
      permission:['admin','vendedor'],
    },
    {
      ruta:'/dashboard/medicamentos',
      nombre:'Medicamentos',
      icono:'medical_services',
      permission:['admin'],
    },
    {
      ruta:'/dashboard/tiposmedicamentos',
      nombre:'Tipos Medicamentos',
      icono:'medication',
      permission:['admin'],
    },
    {
      ruta:'/dashboard/venta',
      nombre:'Venta Producto',
      icono:'shopping_cart',
      permission:['vendedor','admin'],
    },
    {
      ruta:'/dashboard/registrosVenta',
      nombre:'Registros de venta',
      icono:'app_registration',
      permission:['admin'],
    },
    {
      ruta:'/dashboard/clientes',
      nombre:'Clientes',
      icono:'group',
      permission:['admin'],
    },
    {
      ruta:'/dashboard/provedores',
      nombre:'Proveedores',
      icono:'local_shipping',
      permission:['admin'],
    },
  ]

  ruleRuta:ruta[] = []
  constructor(private breakpointObserver: BreakpointObserver,
              private _router:Router,
              private _authservice:AuthService) {}


  ngOnInit(): void {
    this.filtroRutas()
  }

  get usuario(){
    return this._authservice.usuario
  }

  filtroRutas(){
    const Rutas =  this.Allrutas.filter( ruta => ruta.permission.includes( this._authservice.usuario.rol! ) )
    this.ruleRuta = Rutas
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
