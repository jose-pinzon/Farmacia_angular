import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    Formulario: FormGroup = this.fb.group({
      email:['test1@gmail.com', [Validators.required, Validators.email]],
      password:['12345678', [Validators.required, Validators.minLength(8) ]]
    })


    constructor( private fb: FormBuilder,
                private router:Router,
                private authservice:AuthService){}


  login(){
      const { email, password  } = this.Formulario.value
      this.authservice.login( email, password )
          .subscribe( resp => {
              if (resp === true ) {
                this.router.navigateByUrl('/dashboard')
              }else if (!resp) {
                Swal.fire('Ups!', "No se pudo conectar con el servidor", 'error')
              }else{
                Swal.fire('Ups!', resp, 'error')
              }
          })
  }
}
