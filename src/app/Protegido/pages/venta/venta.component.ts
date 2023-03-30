import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../../interfaces/clienteInterface';
import { Medicina } from '../../interfaces/medicamentosI';
import { ProtegidoService } from '../../protegido.service';

import { Subject, debounceTime } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import {
  VentaInterface,
  body_venta,
  producto,
} from '../../interfaces/ventaInterface';


import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent {
  //! Varibles de la tabla
  displayedColumns: string[] = [
    'position',
    'Vendedor',
    'Cliente',
    'Producto',
    'Cantidad',
    'Total',
    'Eliminar',
  ];
  // Datos de la tabla
  dataSource = new MatTableDataSource<VentaInterface>();

  //!Variables de las cuentas
  cantidad: number = 1;
  cantidades: number[] = [];
  preciosProducto: number[] = [];
  descuento: number = 0;
  TotalCompra: number = 0;

  //!Variables de busqueda
  termino: string = '';
  medicamentos: Medicina[] = [];
  medicamentoSelect: Medicina | undefined;

  terminoCliente: string = '';
  clientes: Cliente[] = [];
  clienteSelect: Cliente | undefined;
  desabilitarInputCliente: boolean = false;

  private searchTerms = new Subject<String>();

  //!Varible para verificar si es para un cliente
  isSelected: boolean = true;

  //!Variable para mandar errores
  Errores:string[] = []

  constructor(
    private _protegidoService: ProtegidoService,
    private _authService: AuthService
  ) {
    this.searchTerms.pipe(debounceTime(500)).subscribe((term) => {
      switch (term) {
        case 'medicamento':
          this.busquedaProducto();
          break;
        case 'cliente':
          this.busquedaCliente();
          break;

        default:
          break;
      }
    });
  }



  get isClient() {
    return this.isSelected ? 'Es Cliente' : 'Sin Cliente';
  }


  get precioProducto() {
    return this.preciosProducto;
  }

  get Iva() {
    return this.TotalCompra * 0.16;
  }

  get Subtotal() {
    return this.TotalCompra;
  }

  get Totalpagar() {
    return this.TotalCompra - this.descuento + this.Iva;
  }

  get usuario() {
    return this._authService.usuario;
  }


  generatePdf() {
    const documentDefinition:any = {
      content: [
        { text: 'Reporte de Ventas', style: 'header' },
        { text: 'Fecha: ' + new Date().toLocaleDateString(), style: 'subheader' },
        { text: 'Ventas Totales: $1000', style: 'subheader' }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        }
      }
    };
    pdfMake.createPdf(documentDefinition).open();
  }


  //Todo: Funcion para revisar los datos guardados en la tabla
  verificar() {
    console.log(this.dataSource.data);
    console.log(this.cantidades);
    console.log(this.preciosProducto);
  }



  TotalProduto(index: number) {
    if (!this.cantidades[index]) return;

    this.precioProducto[index] = this.cantidades[index] * this.dataSource.data[index].precioOriginal;
    this.SumaDeTotal();
  }

  SumaDeTotal() {
    this.TotalCompra = 0;
    for (const precioPro of this.precioProducto) {
      this.TotalCompra += precioPro;
    }
  }

  limpiezaTable() {
    this.dataSource.data = [];
    this.TotalCompra = 0;
    this.descuento = 0;
    this.desabilitarInputCliente = false;
    this.clienteSelect = undefined;
    this.terminoCliente = '';
  }

  RealizarPago() {
    const body: body_venta = {
      cliente_id: this.isSelected ? this.clienteSelect?.id : 10,
      vendedor_id: this.usuario.uid,
      precio_bruto: this.TotalCompra,
      descripcion: 'descripcion probando resta',
      descuento: this.descuento,
      iva: this.Iva,
      productos: [],
      total: this.Totalpagar,
    };

    this.dataSource.data.forEach((venta, i) => {
      const datos_prod: producto = {
        id: venta.producto_id,
        cantidad: this.cantidades[i],
        total: this.preciosProducto[i],
      };
      body.productos.push(datos_prod);
    });

    this._protegidoService.createVenta(body).subscribe((resp) => {
      this.limpiezaTable();
      alert(resp.msg);
    });
  }

  agregarProducto() {
    this.Errores = []

    while (!this.clienteSelect) {
      this.Errores.push('El cliente es obligatorio')
      return
    }

    while (!this.medicamentoSelect) {
        this.Errores.push('El medicamento es obligatorio')
        return
    }

    let total = this.medicamentoSelect?.precio! * this.cantidad;
    const DatosCompra: VentaInterface = {
      vendedor_id: this.usuario.uid,
      vendedor: this.usuario.nombre,
      cliente_id: this.clienteSelect?.id!,
      cliente: this.clienteSelect?.nombre!,
      producto_id: this.medicamentoSelect?.id!,
      producto: this.medicamentoSelect?.nombre_registrado!,
      precioOriginal: this.medicamentoSelect?.precio!,
    };

    this.preciosProducto.push(total);
    this.cantidades.push(this.cantidad);

    //!agregar los campos a la tabla
    const data = this.dataSource.data;
    data.push(DatosCompra);
    this.dataSource.data = data;

    this.Errores = []
    this.SumaDeTotal();

    //?Limpieza de datos
    this.medicamentoSelect = undefined;
    this.termino = '';
    this.cantidad = 1;
  }

  toggleSelection() {
    //?Funcion para verificar si la compra se realizara con cliente o no
     this.isSelected = !this.isSelected;

    if (this.isSelected) {
        this.clienteSelect = undefined
    } else{
      this.clienteSelect = {
        id:10,
        nombre:'S/N',
        apellido_m:'SN',
        apellido_p:'SN',
        genero:'SN',
        direccion:'SN'
      }
    }

  }


  quitar(i: number) {
    this.TotalCompra = this.TotalCompra - this.precioProducto[i];

    this.precioProducto.slice(i, 1);

    this.dataSource.data = this.dataSource.data.filter(
      (row, index) => index != i
    );
  }

  onSearchInput(term: string = 'nada') {
    this.searchTerms.next(term);
  }

  //TODO: Funciones para buscar entre todos los clientes
  busquedaProducto() {
    this._protegidoService
      .ObtenerMedicamento(this.termino)
      .subscribe((resp) => (this.medicamentos = resp.medicina));
  }

  busquedaCliente() {
    this._protegidoService
      .GetClientes(this.terminoCliente)
      .subscribe((resp) => (this.clientes = resp.cliente));
  }
  //TODO: Funciones para buscar el dato del elemento seleccionado

  opcionseleccionada(e: MatAutocompleteSelectedEvent) {
    if (!e.option.value) {
      this.medicamentoSelect = undefined;
      return;
    }
    const medicamento: Medicina = e.option.value;

    // acompletar con el valor seleccionado
    this.termino = medicamento.nombre_registrado;

    this._protegidoService
      .GetMedicamento(medicamento.id!)
      .subscribe((medicina) => (this.medicamentoSelect = medicina.medicamento));
  }
  opcionseleccionadaCliente(e: MatAutocompleteSelectedEvent) {
    if (!e.option.value) {
      this.clienteSelect = undefined;
      return;
    }
    const cliente: Cliente = e.option.value;

    // acompletar con el valor seleccionado
    this.terminoCliente = cliente.apellido_p;

    this._protegidoService.ShowCliente(cliente.id).subscribe((resp) => {
      this.desabilitarInputCliente = true;
      this.clienteSelect = resp.cliente;
    });
  }
}
