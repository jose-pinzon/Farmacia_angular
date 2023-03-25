import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProtegidoService } from '../../protegido.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-tipo-medicamento',
  templateUrl: './modal-tipo-medicamento.component.html',
  styleUrls: ['./modal-tipo-medicamento.component.css']
})
export class ModalTipoMedicamentoComponent implements OnInit {


  Formulario: FormGroup = this._fb.group({
    tipo: ['', [Validators.required, Validators.minLength(4)]],
    descripcion: ['']
  })

  NombreAccion: string = 'Nuevo'
  btnAccion: string = 'Guardar'
  loading:boolean = false

  constructor(
    private _dialog: MatDialogRef<ModalTipoMedicamentoComponent>,
    private _fb: FormBuilder,
    private _protegidoService: ProtegidoService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public tipoid: number
  ) { }

  ngOnInit(): void {
    if (this.tipoid) {
      this.loading = true;
      this.NombreAccion = 'Editar';
      this.btnAccion = 'Actualizar';
      this.getTipos();
    }
  }


  getTipos() {
    this._protegidoService.showTipoMedicamento(this.tipoid)
      .subscribe({
        next: (resp) => {
          const me = resp.tipo
          // Colocar lo valores actuales
          this.Formulario.reset({
            tipo: me?.tipo,
            descripcion: me?.descripcion
          })
          this.loading = false
        },
        error: (err) => {
          this.mostrarsnakbar('Fallo obtener medicamento')
        },
      })
  }



  guardar() {

    if ( this.Formulario.invalid ) {
      this.Formulario.markAllAsTouched();
      return;
    }

    // this.Formulario.value.usuario_id = this.usuario.uid
    if (this.NombreAccion == 'Nuevo') {

      this._protegidoService.createTipoMedicamento(this.Formulario.value)
        .subscribe({
          next: (data) => {
            this._dialog.close(data.msg)
          },
          error: (e) => {
            this.mostrarsnakbar('Fallo al guardar')
          }
        })

    } else {
      this._protegidoService.updateTipoMedicamento(this.tipoid, this.Formulario.value)
        .subscribe({
          next: (resp) => {
            this._dialog.close(resp.msg)
          },
          error: (e) => {
            console.log(e);
            this.mostrarsnakbar('No se puedo actualizar el usuario')
          }
        })
    }
  }


  mostrarsnakbar(mensaje: string) {
    this._snackBar.open(mensaje, 'ok!', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  cancelar() {
    this._dialog.close()
  }



}
