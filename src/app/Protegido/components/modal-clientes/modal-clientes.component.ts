import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProtegidoService } from '../../protegido.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-clientes',
  templateUrl: './modal-clientes.component.html',
  styleUrls: ['./modal-clientes.component.css']
})
export class ModalClientesComponent implements OnInit {

  Formulario: FormGroup = this._fb.group({
    nombre: ['', [Validators.required]],
    apellido_p: ['', [Validators.required]],
    apellido_m: ['', [Validators.required]],
    direccion: [''],
    genero: ['', [Validators.required]]
  })

  NombreAccion: string = 'Nuevo'
  btnAccion: string = 'Guardar'
  loading: boolean = false


  constructor(
    private _dialog: MatDialogRef<ModalClientesComponent>,
    private _fb: FormBuilder,
    private _protegidoService: ProtegidoService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) { }

  ngOnInit(): void {
    if (this.id) {
      this.loading = true
      this.NombreAccion = 'Editar';
      this.btnAccion = 'Actualizar';
      this.getCliente()
    }
  }

  getCliente() {
    this._protegidoService.ShowCliente(this.id)
      .subscribe({
        next: (resp) => {
          const c = resp.cliente
          this.Formulario.patchValue({
            nombre: c?.nombre,
            apellido_p: c?.apellido_p,
            apellido_m: c?.apellido_m,
            direccion: c?.direccion,
            genero: c?.genero
          });

          this.loading = false
        },

        error: (resp) => {
          this.mostrarsnakbar('Fallo obtener Cliente')
        }

      })
  }

  guardar() {

    if (this.Formulario.invalid) {
      this.Formulario.markAllAsTouched();
      return;
    }


    if (this.NombreAccion == 'Nuevo') {

      this._protegidoService.createCliente(this.Formulario.value)
        .subscribe({
          next: (value) => {
            this._dialog.close(value.msg)
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error);
            this.mostrarsnakbar('Fallo al guardar')
          },
        })

    } else {

      this._protegidoService.updateCliente(this.id, this.Formulario.value)
        .subscribe({
          next: (value) => {
            this._dialog.close(value.msg)
          },
          error: (err) => {
            this.mostrarsnakbar('No se puedo actualizar el cliente')
          },
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
