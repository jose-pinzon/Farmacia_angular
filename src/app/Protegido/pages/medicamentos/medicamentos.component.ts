import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProtegidoService } from '../../protegido.service';
import { Medicina  } from '../../interfaces/medicamentosI';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalMedicamentoComponent } from '../../components/modal-medicamento/modal-medicamento.component';
import { ModalDetalleComponent } from '../../components/modal-detalle/modal-detalle.component';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css'],
})
export class MedicamentosComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //? Ordenamiento
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'id',
    'usuario',
    'tipo',
    'nombre_cientifico',
    'nombre_registrado',
    'fecha_caducidad',
    'codigo',
    'cantidad',
    'simbolo',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Medicina>();


// Ciclo de Vida__________________________
  constructor(
    private _protegidoService: ProtegidoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMedicamento();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getMedicamento(): void {
    this._protegidoService
      .ObtenerMedicamento()
      .subscribe(({ ok, medicina }) => {
        this.dataSource.data = medicina;
      });
  }

  get medicinaGet() {
    return [...this.dataSource.data];
  }


  borrar(id: number) {
    const data = {
      nombretabla:'medicamentos',
      id
    }

    // TODO:Falta realizar la api en node
    this.dialog
      .open(ModalComponent, {
        width: '250px',
        data,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this._protegidoService.EliminarMedicamento(id).subscribe((res) => {
            this.getMedicamento();
            this.mostrarsnakbar(res.msg);
          });
        }
      });
  }

  crearUsuario() {
    this.dialog.
      open(ModalMedicamentoComponent,{
      width:'700px',
    })
    .afterClosed()
    .subscribe( res =>{
      if (res) {
        this.mostrarsnakbar(res)
        this.getMedicamento()
      }
    })
  }


  editarUsuario(id:number) {
    this.dialog.
      open(ModalMedicamentoComponent,{
      width:'700px',
      data: id
    })
    .afterClosed()
    .subscribe( res =>{
      if (res) {
        this.mostrarsnakbar(res)
        this.getMedicamento()
      }

    })
  }

  VerDetalles(id:number){
    const data ={
      id,
      tabla:'medicamentos'
    }

    this.dialog.
      open(ModalDetalleComponent,{
        width:'80%',
        data
      })
      .afterClosed()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarsnakbar(mensaje: string) {
    this._snackBar.open(mensaje, 'ok!', {
      duration: 4000,
    });
  }
}
