import { Component, ViewChild, OnInit,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TipoMedicamento } from '../../interfaces/TipoMedicamentoI';
import { MatTableDataSource } from '@angular/material/table';
import { ProtegidoService } from '../../protegido.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
import { ModalTipoMedicamentoComponent } from '../../components/modal-tipo-medicamento/modal-tipo-medicamento.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-tipos-medicamentos',
  templateUrl: './tipos-medicamentos.component.html',
  styleUrls: ['./tipos-medicamentos.component.css']
})
export class TiposMedicamentosComponent implements AfterViewInit,OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //? Ordenamiento
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'tipo',
    'descripcion',
    'acciones'
  ];

  dataSource = new MatTableDataSource<TipoMedicamento>();

  constructor(
    private _protegidoService: ProtegidoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTiposMedicamentos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTiposMedicamentos(){
    this._protegidoService.ObtenerTiposMedicamentos()
      .subscribe( resp =>{
        this.dataSource.data = resp.tipoMedicamento
      })
  }


  crearTipo(){
    this.dialog.
      open(ModalTipoMedicamentoComponent,{
      width:'500px',
    })
    .afterClosed()
    .subscribe( res =>{
      if (res) {
        this.mostrarsnakbar(res)
        this.getTiposMedicamentos()
      }
    })
  }

  editarTipo( id:number ){
    this.dialog.
    open(ModalTipoMedicamentoComponent,{
    width:'500px',
    data:id
  })
  .afterClosed()
  .subscribe( res =>{
    if (res) {
      this.mostrarsnakbar(res)
      this.getTiposMedicamentos()
    }
  })
  }

  borrar(id: number) {

    const data = {
      nombretabla:'tipomedicamentos',
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
          this._protegidoService.deleteTipoMedicamento(id).subscribe((res) => {
            this.getTiposMedicamentos();
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
