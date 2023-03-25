
import { Component,ViewChild,OnInit,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Provedor } from '../../interfaces/proveedores';
import { ProtegidoService } from '../../protegido.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalProvedoresComponent } from '../../components/modal-provedores/modal-provedores.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-provedores',
  templateUrl: './provedores.component.html',
  styleUrls: ['./provedores.component.css']
})
export class ProvedoresComponent implements AfterViewInit, OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //? Ordenamiento
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido_p',
    'apellido_m',
    'email',
    'acciones'
  ];
  dataSource = new MatTableDataSource<Provedor>();

  constructor(
    private _protegidoService: ProtegidoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProvedores();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProvedores(){
    this._protegidoService.GetProvedores()
      .subscribe( resp =>{
        this.dataSource.data = resp.provedores
      })
  }

  crearProvedor(){
    this.dialog.open(ModalProvedoresComponent,{
      width:'800px',
    })
    .afterClosed()
    .subscribe( res => {

      if( res ){
        this.mostrarsnakbar( res );
        this.getProvedores();
      }
    })
  }

  editarProvedor( data:number ){
    this.dialog.
      open(ModalProvedoresComponent,{
      width:'800px',
      data
    })
    .afterClosed()
    .subscribe( res =>{
      if (res) {
        this.mostrarsnakbar(res)
        this.getProvedores()
      }
    })
  }

  borrar( id:number ){
    const data = {
      nombretabla:'provedores',
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
          this._protegidoService.deleteprovedor(id).subscribe((res) => {
            this.getProvedores();
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
