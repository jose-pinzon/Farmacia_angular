import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable, map, catchError, of, delay, debounce, debounceTime } from 'rxjs';
import { MedicamentoInterface, MedicamentoSaveI, Medicina } from './interfaces/medicamentosI';
import { HttpClient } from '@angular/common/http';
import { TipoMedicamentoInterface, TipoMedicamentoI } from './interfaces/TipoMedicamentoI';
import { UsuarioInterface } from './interfaces/UsuariosI';
import { ClienteI, ClienteShow, Cliente } from './interfaces/clienteInterface';
import { VentaAPIInterface, VentaI, VentaInterface, body_venta } from './interfaces/ventaInterface';
import { Provedor, ProvedorI, ProvedorMsg, ProvedorIshow } from './interfaces/proveedores';
import { ImagenUploadI } from './interfaces/ImagenUploadI';



@Injectable({
  providedIn: 'root'
})
export class ProtegidoService {

  private baseUrl:string = environment.baseUrl

  constructor(private http:HttpClient ) {}


  //! Peticiones datos de ventas-----------------------------------------------------------------------------------------
  Getventas():Observable<VentaAPIInterface>{
    return this.http.get<VentaAPIInterface>(`${ this.baseUrl }/venta`)
  }




  //! Peticiones al cliente-----------------------------------------------------------------------------------------

  GetClientes( termino:string = 'all'):Observable<ClienteI>{
    return this.http.get<ClienteI>(`${ this.baseUrl }/clientes?termino=${termino}`)
  }

  ShowCliente( id:number ):Observable<ClienteShow>{
    return this.http.get<ClienteShow>(`${ this.baseUrl }/clientes/${id}`)
  }

  createCliente( body:Cliente ):Observable<ClienteShow>{
    return this.http.post<ClienteShow>(`${ this.baseUrl }/clientes`, body )
  }

  updateCliente( id:number, body:Cliente ):Observable<ClienteShow>{
    return this.http.put<ClienteShow>(`${ this.baseUrl }/clientes/${id}`, body )
  }

  deleteCliente( id:number ):Observable<ClienteShow>{
    return this.http.delete<ClienteShow>(`${ this.baseUrl }/clientes/${id}`)
  }

//! peticiones Imagen

CreateImagen( imagen:File ):Observable<ImagenUploadI>{
  const fd = new FormData()
  fd.append('imagen', imagen)
  return this.http.post<ImagenUploadI>(`${ this.baseUrl }/upload`, fd)
}



  //! Peticiones Medicamento-----------------------------------------------------------------------------------------
  ObtenerMedicamento(  termino:string = 'all' ):Observable<MedicamentoInterface>{
    return this.http.get<MedicamentoInterface>(`${ this.baseUrl }/medicamentos?termino=${ termino }`)
  }

  GetMedicamento(id:number | string  ):Observable<MedicamentoSaveI>{
    return this.http.get<MedicamentoSaveI>(`${this.baseUrl}/medicamentos/${id}`)
    // .pipe( delay( 1000))
  }

  SaveMedicamento( body:Medicina ):Observable<MedicamentoSaveI>{
    const url = `${this.baseUrl}/medicamentos`
    return this.http.post<MedicamentoSaveI>(url , body)

  }

  UpdateMedicamento(  id:number, body:Medicina  ):Observable<MedicamentoSaveI>{
    const url = `${this.baseUrl}/medicamentos/${ id }`
    return this.http.put<MedicamentoSaveI>(url , body)
  }

  ObtenerUsuarios():Observable<UsuarioInterface>{
    return this.http.get<UsuarioInterface>(`${ this.baseUrl }/usuarios`)
  }

  EliminarMedicamento(id:number){
    return this.http.delete<any>(`${ this.baseUrl}/medicamentos/${id}`)
  }

  //! Peticiones Tipo medicamento------------------------------------------------------------------------------------------

  ObtenerTiposMedicamentos():Observable<TipoMedicamentoInterface>{
    return this.http.get<TipoMedicamentoInterface>(`${ this.baseUrl }/tipoMedicamentos`)
  }

  showTipoMedicamento( id:number ):Observable<TipoMedicamentoI>{
    return this.http.get<TipoMedicamentoI>(`${ this.baseUrl }/tipoMedicamentos/${id }`)
  }

  createTipoMedicamento( body:TipoMedicamentoI  ):Observable<TipoMedicamentoI>{
    return this.http.post<TipoMedicamentoI>(`${ this.baseUrl }/tipoMedicamentos`, body)
  }
  updateTipoMedicamento( id:number,body:TipoMedicamentoI  ):Observable<TipoMedicamentoI>{
    return this.http.put<TipoMedicamentoI>(`${ this.baseUrl }/tipoMedicamentos/${id }`, body)
  }
  deleteTipoMedicamento( id:number ):Observable<TipoMedicamentoI>{
    return this.http.delete<TipoMedicamentoI>(`${ this.baseUrl }/tipoMedicamentos/${id }`)
  }


  //! Peticiones de Provedores------------------------------------------------------------------------------------------

  GetProvedores( termino:string = 'all'):Observable<ProvedorI>{
    return this.http.get<ProvedorI>(`${ this.baseUrl }/provedores?termino=${termino}`)
  }

  Showprovedor( id:number ):Observable<ProvedorIshow>{
    return this.http.get<ProvedorIshow>(`${ this.baseUrl }/provedores/${id}`)
  }

  createprovedor( body:Provedor ):Observable<ProvedorMsg>{
    return this.http.post<ProvedorMsg>(`${ this.baseUrl }/provedores`, body )
  }

  updateprovedor( id:number, body:Provedor ):Observable<ProvedorMsg>{
    return this.http.put<ProvedorMsg>(`${ this.baseUrl }/provedores/${id}`, body )
  }

  deleteprovedor( id:number ):Observable<ProvedorMsg>{
    return this.http.delete<ProvedorMsg>(`${ this.baseUrl }/provedores/${id}`)
  }

  //! Peticiones venta------------------------------------------------------------------------------------------
  createVenta( body:body_venta ):Observable<VentaI>{
    return this.http.post<VentaI>(`${ this.baseUrl }/venta`, body)
  }

}
