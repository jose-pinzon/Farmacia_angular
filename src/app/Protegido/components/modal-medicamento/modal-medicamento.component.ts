import { Component,Inject,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProtegidoService } from '../../protegido.service';

import { MAT_DATE_FORMATS } from "@angular/material/core";
import * as moment  from "moment";
import { TipoMedicamento } from '../../interfaces/TipoMedicamentoI';
import { AuthService } from '../../../auth/auth.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


export const MY_DATE_FORMATS = {
  parse:{
    dateInput:'DD/MM/YYYY'
  },
  display:{
    dateInput:'DD/MM/YYYY',
    monthYearLabel:'MMMM YYYY',
    dateA11yLabel:'LL',
    monthYearA11yLabel:'MMMMM YYYY'
  }
}


interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}




@Component({
  selector: 'app-modal-medicamento',
  templateUrl: './modal-medicamento.component.html',
  styleUrls: ['./modal-medicamento.component.css'],
  providers:[
    { provide:MAT_DATE_FORMATS,useValue:MY_DATE_FORMATS }
  ]
})
export class ModalMedicamentoComponent  implements OnInit{

  Formulario: FormGroup = this._fb.group({
    tipo_id:['', [Validators.required ]],
    cantidad:['', [Validators.required]],
    nombre_cientifico:['', [Validators.required, Validators.minLength(4)]],
    precio:['', [Validators.required]],
    nombre_registrado:['', [Validators.required, Validators.minLength(4) ]],
    codigo:['', [Validators.required]],
    fecha_caducidad:['12/04/2023', [Validators.required]],

  })

  loading:boolean = false
  NombreAccion:string = 'Nuevo'
  btnAccion:string = 'Guardar'
  ImagenGuardada:string | undefined | null;

  //TODO:variables para la imagen
  file!:File ;
  imageSelected!: ArrayBuffer | string ;

  listaTipoMedicamentos:TipoMedicamento[] = []
  listado_errors = null
  // TODO Crear array de usuario y tipo


  // ?El dialog es el modal
  constructor(
    private _dialog: MatDialogRef<ModalMedicamentoComponent>,
    private _fb:FormBuilder,
    private _protegidoService:ProtegidoService,
    private _authservice:AuthService,
    private _snackBar:MatSnackBar,
    @Inject( MAT_DIALOG_DATA ) public medicamentoid:number
    ){}


    ngOnInit(): void {
      this.getTipos()
      if (this.medicamentoid) {
        this.loading = true
        this.NombreAccion = 'Editar'
        this.btnAccion = 'Actualizar'
        this.getMedicamento(this.medicamentoid)
      }
    }

    get usuario(){
      return this._authservice.usuario
    }

    //!Funciones cargar imagen
    onPhotoSelected(event:any){
      if (event.target.files && event.target.files[0]) {
        this.file = <File>event.target.files[0]

        //image preview
        const reader = new FileReader();
        reader.onload = e => this.imageSelected = reader.result || '';
        reader.readAsDataURL(this.file)
      }
    }

  validarCampo( campo:string ){
      return this.Formulario.controls[campo].errors
            && this.Formulario.controls[campo].touched
  }


    getMedicamento(id:number){
      this._protegidoService.GetMedicamento(id)
        .subscribe({
          next:(resp) => {

            const me = resp.medicamento
            // Colocar lo valores actuales
              this.Formulario.reset({
                tipo_id:me?.tipo_id,
                cantidad:me?.cantidad,
                nombre_cientifico:me?.nombre_cientifico,
                nombre_registrado:me?.nombre_registrado,
                precio:me?.precio,
                codigo:me?.codigo,
                fecha_caducidad:me?.fecha_caducidad
              })


            this.ImagenGuardada = resp.medicamento?.imagen
            this.loading = false
          },
          error:(err) => {
            this.mostrarsnakbar('Fallo obtener medicamento')
          },
        })
    }


    getTipos(){
      this._protegidoService.ObtenerTiposMedicamentos()
        .subscribe(res => this.listaTipoMedicamentos = res.tipoMedicamento );
    }

    guardar(){

      if ( this.Formulario.invalid ) {
          this.Formulario.markAllAsTouched();
          return;
      }


      this.Formulario.value.usuario_id = this.usuario.uid
          if (this.NombreAccion == 'Nuevo') {

            this._protegidoService.CreateImagen( this.file ).pipe(
                switchMap( resp => {
                  this.Formulario.value.imagen = resp.filename
                  return this._protegidoService.SaveMedicamento( this.Formulario.value )
                })

              ).subscribe({
                  next:(data)=>{
                      this._dialog.close(data.msg)
                  },
                  error:(e)=>{
                      this.mostrarsnakbar('Fallo al guardar')
                  }
                })

          }else{

            this._protegidoService.CreateImagen( this.file ).pipe(
                switchMap( resp  => {
                  this.Formulario.value.imagen = resp.filename
                  return  this._protegidoService.UpdateMedicamento(this.medicamentoid,  this.Formulario.value )
                })
            ).subscribe({
                  next:( resp )=>{
                    this._dialog.close(resp.msg)
                  },
                  error:( e )=>{
                      console.log(e);
                      this.mostrarsnakbar('No se puedo actualizar el usuario')
                  }
                })
          }
    }

    cancelar(){
      this._dialog.close()
    }

    mostrarsnakbar(mensaje: string) {
      this._snackBar.open(mensaje, 'ok!', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition:'top'
      });
    }
}
