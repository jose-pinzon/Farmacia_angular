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


const routes: Routes = [{
  path:'',
  component:NavigationComponent,
  children:[
    {
      path:'home',
      component:HomeComponent
    },
    {
      path:'medicamentos',
      component:MedicamentosComponent
    },
    {
      path:'tiposmedicamentos',
      component:TiposMedicamentosComponent
    },
    {
      path:'venta',
      component:VentaComponent
    },
    {
      path:'clientes',
      component:ClientesComponent
    },
    {
      path:'provedores',
      component:ProvedoresComponent
    },
    {
      path:'form',
      component:FormComponent
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
