import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicamentosComponent } from './pages/medicamentos/medicamentos.component';
import { VentaComponent } from './pages/venta/venta.component';
import { TiposMedicamentosComponent } from './pages/tipos-medicamentos/tipos-medicamentos.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './components/form/form.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProvedoresComponent } from './pages/provedores/provedores.component';
import { Registro_ventasComponent } from './pages/Registro_ventas/Registro_ventas.component';
import { HasroleGuard } from '../guards/hasrole.guard';


const routes: Routes = [{
  path:'',
  component:NavigationComponent,
  children:[
    {
      path:'home',
      component:HomeComponent,
      canLoad:[ HasroleGuard ],
      canActivate:[ HasroleGuard ],
      data:{
        allowedRoles:['admin','vendedor']
      }
    },

    {
      path:'medicamentos',
      component:MedicamentosComponent
    },

    {
      path:'tiposmedicamentos',
      component:TiposMedicamentosComponent,
      canLoad:[ HasroleGuard ],
      canActivate:[ HasroleGuard ],
      data:{
        allowedRoles:['admin']
      }
    },

    {
      path:'venta',
      component:VentaComponent,
      canLoad:[ HasroleGuard ],
      canActivate:[ HasroleGuard ],
      data:{
        allowedRoles:['admin','vendedor']
      }
    },

    {
      path:'clientes',
      component:ClientesComponent,
      canLoad:[ HasroleGuard ],
      canActivate:[ HasroleGuard ],
      data:{
        allowedRoles:['admin']
      }
    },
    {
      path:'provedores',
      component:ProvedoresComponent,
      canLoad:[ HasroleGuard ],
      canActivate:[ HasroleGuard ],
      data:{
        allowedRoles:['admin']
      }
    },
    {
      path:'registrosVenta',
      component:Registro_ventasComponent,
      canLoad:[ HasroleGuard ],
      canActivate:[ HasroleGuard ],
      data:{
        allowedRoles:['admin']
      }
    },

    {
      path:'**',
      redirectTo:'home'
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtegidoRoutingModule { }
