import { Component, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProtegidoService } from '../../protegido.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-provedores',
  templateUrl: './modal-provedores.component.html',
  styleUrls: ['./modal-provedores.component.css'],
})
export class ModalProvedoresComponent {
  Formulario: FormGroup = this._fb.group({
    nombre: ['', [Validators.required]],
    apellido_p: ['', [Validators.required]],
    apellido_m: ['', [Validators.required]],
    identificacion: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', [Validators.required, Validators.email]],
  });

  NombreAccion: string = 'Nuevo';
  btnAccion: string = 'Guardar';
  loading: boolean = false;

  constructor(
    private _dialog: MatDialogRef<ModalProvedoresComponent>,
    private _fb: FormBuilder,
    private _protegidoService: ProtegidoService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.loading = true;
      this.NombreAccion = 'Editar';
      this.btnAccion = 'Actualizar';
      this.getProvedor();
    }
  }

  getProvedor() {
    this._protegidoService.Showprovedor(this.id).subscribe({
      next: (resp) => {
        const c = resp.Provedor;
        this.Formulario.patchValue({
          nombre: c?.nombre,
          apellido_p: c?.apellido_p,
          apellido_m: c?.apellido_m,
          identificacion: c?.identificacion,
          direccion: c.direccion,
          telefono: c.telefono,
          email: c.email,
        });
        this.loading = false;
      },

      error: (error: HttpErrorResponse) => {
        this.mostrarsnakbar('Fallo obtener Provedor');
      },
    });
  }

  guardar() {
    if (this.Formulario.invalid) {
      this.Formulario.markAllAsTouched();
      return;
    }

    if (this.NombreAccion == 'Nuevo') {
      this._protegidoService.createprovedor(this.Formulario.value).subscribe({
        next: (value) => {
          this._dialog.close(value.msg);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
          this.mostrarsnakbar('Fallo al guardar');
        },
      });
    } else {
      this._protegidoService
        .updateprovedor(this.id, this.Formulario.value)
        .subscribe({
          next: (value) => {
            this._dialog.close(value.msg);
          },
          error: (err) => {
            this.mostrarsnakbar('No se puedo actualizar el cliente');
          },
        });
    }
  }

  mostrarsnakbar(mensaje: string) {
    this._snackBar.open(mensaje, 'ok!', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  cancelar() {
    this._dialog.close();
  }
}
