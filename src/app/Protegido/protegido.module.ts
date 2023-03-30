import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtegidoRoutingModule } from './protegido-routing.module';
import { MaterialModule } from '../material/material.module';
import { MedicamentosComponent } from './pages/medicamentos/medicamentos.component';
import { VentaComponent } from './pages/venta/venta.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModalComponent } from './components/modal/modal.component';
import { ModalMedicamentoComponent } from './components/modal-medicamento/modal-medicamento.component';
import { TiposMedicamentosComponent } from './pages/tipos-medicamentos/tipos-medicamentos.component';
import { ModalTipoMedicamentoComponent } from './components/modal-tipo-medicamento/modal-tipo-medicamento.component';

import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './pages/home/home.component';
import { NavigationComponent } from './layout/navigation/navigation.component';

import { FormComponent } from './components/form/form.component';
import { ModalDetalleComponent } from './components/modal-detalle/modal-detalle.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProvedoresComponent } from './pages/provedores/provedores.component';
import { ModalProvedoresComponent } from './components/modal-provedores/modal-provedores.component';
import { ModalClientesComponent } from './components/modal-clientes/modal-clientes.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { NgChartsModule } from 'ng2-charts';
import { GraficaBarrasComponent } from './components/grafica-barras/grafica-barras.component';
import { Registro_ventasComponent } from './pages/Registro_ventas/Registro_ventas.component';
import { JsPdfComponent } from './components/JsPdf/JsPdf.component';





@NgModule({
  declarations: [
    MedicamentosComponent,
    VentaComponent,
    HomeComponent,
    ModalComponent,
    ModalMedicamentoComponent,
    TiposMedicamentosComponent,
    ModalTipoMedicamentoComponent,
    NavigationComponent,
    FormComponent,
    ModalDetalleComponent,
    ClientesComponent,
    ProvedoresComponent,
    ModalProvedoresComponent,
    ModalClientesComponent,
    ImagenPipe,
    GraficaBarrasComponent,
    Registro_ventasComponent,
    JsPdfComponent,
  ],
  imports: [
    CommonModule,
    ProtegidoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    LayoutModule,
    NgChartsModule
  ]
})
export class ProtegidoModule { }
