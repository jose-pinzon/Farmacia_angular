import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { modalDetalleDataI, MedicamentoSaveI, Medicina } from '../../interfaces/medicamentosI';
import { ProtegidoService } from '../../protegido.service';

@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.component.html',
  styleUrls: ['./modal-detalle.component.css']
})
export class ModalDetalleComponent implements OnInit {

  titulo:string = ''
  datosElemento:Medicina | any;

  constructor(
    private _dialog: MatDialogRef<ModalDetalleComponent>,
    private _protegidoService:ProtegidoService,
    @Inject( MAT_DIALOG_DATA ) public detalle:modalDetalleDataI
  ){}

  ngOnInit(): void {
    switch (this.detalle.tabla) {
      case 'medicamentos':
          this.titulo = "Detalles del medicamento"
          this.getMedicamento()
        break;

      default:
        break;
    }
  }


  get nombreCompleto():string{
    return `${this.datosElemento.Usuario.nombre} ${ this.datosElemento.Usuario?.apellido_p} ${ this.datosElemento.Usuario?.apellido_m}`
  }


    getMedicamento(){
      this._protegidoService.GetMedicamento(this.detalle.id)
        .subscribe( resp => this.datosElemento = resp.medicamento)
    }




  cancelar(){
    this._dialog.close()
  }


}
