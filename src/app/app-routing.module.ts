import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then( m => AuthModule)
  },
  {
    path:'dashboard',
    loadChildren: () => import('./Protegido/protegido.module').then( m  => m.ProtegidoModule),
    canActivate: [ ValidarTokenGuard ],
    canLoad:[ ValidarTokenGuard]
  },
  {
    path:'**',
    redirectTo: 'auth'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
