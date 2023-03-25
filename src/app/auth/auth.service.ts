import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Usuario, AuthI } from './interfaces/authI';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseurl:string = environment.baseUrl
  private _usuario!:Usuario

  constructor(  private http:HttpClient) {}

  get usuario(){
    return { ...this._usuario}
  }



  // !Login -------------------------------------------
  login( email:string, password:string ){

    const url = `${this._baseurl}/auth/login`

    const body = { email, password }

    return  this.http.post<AuthI>( url, body )
            .pipe(
                tap(({ ok, token }) => {
                  if (ok) {
                    localStorage.setItem('token', token! )
                  }
                }),
                map( resp => resp.ok ),
                catchError( resp =>{
                  return of( resp.error.msg )
                } )
            )
  }


  register( datos:Usuario ){

    const url = `${this._baseurl}/auth/register`
    const  { nombre, email,apellido_p,apellido_m,edad, password } = datos
    const body = { nombre , email,apellido_p, apellido_m, edad, password }

    return  this.http.post<AuthI>(url, body)
            .pipe(
              tap( ({ ok, token }) => {
                if ( ok ) {
                    localStorage.setItem('token', token! )
                }
              }),
              map(resp => resp.ok ),
              catchError( res => {

                let message;
                if(res.error.errors){
                  let errores:any = Object.values( res.error.errors )
                  message =  errores[0].msg
                }else{
                  message =  res.error.msg
                }

                return of( message )
              })
            )
  }



  validarToken(): Observable<boolean> {
    const url = `${this._baseurl}/auth/renew`
    const headers = new HttpHeaders()
          .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<AuthI>( url,{ headers })
        .pipe(
          map( resp => {  /* Solo se disapara si la respuesta exitosa */

            localStorage.setItem('token', resp.token! )
            this._usuario = {
              nombre: resp.nombre!,
              email: resp.email!,
              uid: resp.uid!
            }

            return resp.ok
          }),
          catchError( err => of(false))
        );
  }


  logout(){
    localStorage.removeItem('token')
  }


}
