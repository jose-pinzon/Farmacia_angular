import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  Formulario: FormGroup = this.fb.group({
    nombre:['test',[Validators.required, Validators.minLength(4)]],
    apellido_p:['Pinzon',[Validators.required, Validators.minLength(2)]],
    apellido_m:['Can',[Validators.required, Validators.minLength(2)]],
    edad:[20 ,[Validators.required ]],
    email:['test1@gmail.com', [Validators.required, Validators.email]],
    password:['12345678', [Validators.required, Validators.minLength(8) ]],
  });


  constructor( private fb:FormBuilder,
              private router:Router,
              private authservice:AuthService
              ){}


              register(){
                this.authservice.register( this.Formulario.value )
                .subscribe( resp => {
                    // console.log(resp); esta respuesta puede ser "true o el mensaje"
                    if (resp === true ) {
                      this.router.navigateByUrl('/dashboard')
                    }
                    else{
                      Swal.fire('Error', resp , 'error')
                    }
                })
              }

}
