import { Component, ViewChild,OnInit,AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../../interfaces/clienteInterface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProtegidoService } from '../../protegido.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalClientesComponent } from '../../components/modal-clientes/modal-clientes.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //? Ordenamiento
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido_p',
    'apellido_m',
    'direccion',
    'genero',
    'acciones'
  ];
  dataSource = new MatTableDataSource<Cliente>();

  constructor(
    private _protegidoService: ProtegidoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getClientes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getClientes(){
    this._protegidoService.GetClientes()
      .subscribe( resp =>{
        this.dataSource.data = resp.cliente
      })
  }

  crearCliente(){
    this.dialog.open(ModalClientesComponent,{
      width:'800px',
    })
    .afterClosed()
    .subscribe( res => {

      if( res ){
        this.mostrarsnakbar( res );
        this.getClientes();
      }
    })
  }

  editarCliente( data:number ){
    this.dialog.
      open(ModalClientesComponent,{
      width:'800px',
      data
    })
    .afterClosed()
    .subscribe( res =>{
      if (res) {
        this.mostrarsnakbar(res)
        this.getClientes()
      }
    })
  }

  borrar( id:number ){
    const data = {
      nombretabla:'clientes',
      id
    }

    this.dialog
      .open(ModalComponent, {
        width: '250px',
        data,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this._protegidoService.deleteCliente(id).subscribe((res) => {
            this.getClientes();
            this.mostrarsnakbar(res.msg );
          });
        }
      });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarsnakbar(mensaje: string = "Accion realizada")  {
    this._snackBar.open(mensaje, 'ok!', {
      duration: 4000,
    });
  }
}
