
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProtegidoService } from '../../protegido.service';


export interface datosEliminar {
  nombretabla:string,
  id:number
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
    constructor( private dialogRef: MatDialogRef<ModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data:datosEliminar,
      private _protegidoService:ProtegidoService
      ){}

    dato:string | undefined = ''

      ngOnInit(): void {
        switch (this.data.nombretabla) {
          case 'medicamentos':
            this.medicamentoshow( this.data.id )
          break;

          case 'tipomedicamentos':
            this.tipomedicamentoshow( this.data.id )
          break;

          case 'clientes':
            this.clienteshow( this.data.id )
          break;
          case 'provedores':
            this.provedorshow()
          break;

          default:
            break;
        }
      }



    medicamentoshow(id: number): void{
      this._protegidoService.GetMedicamento( id )
        .subscribe( resp =>{
          this.dato =  resp.medicamento?.nombre_registrado
        })
    }
    tipomedicamentoshow(id: number): void{
      this._protegidoService.showTipoMedicamento( id )
      .subscribe( resp =>{
          this.dato = resp.tipo?.tipo
        })
    }

    clienteshow( id:number ){
      this._protegidoService.ShowCliente(id).subscribe(resp => {
        this.dato = resp.cliente?.nombre
      })
    }

    provedorshow( ){
      this._protegidoService.Showprovedor(this.data.id).subscribe( resp =>{
        this.dato = resp.Provedor.nombre
      })
    }



    borrar(){
      this.dialogRef.close(true)
    }

    cancelar(){
      this.dialogRef.close()
    }


}
