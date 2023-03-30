import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ProtegidoService } from '../../protegido.service';
import { Venta } from '../../interfaces/ventaInterface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-Registro_ventas',
  templateUrl: './Registro_ventas.component.html',
  styleUrls: ['./Registro_ventas.component.css']
})
export class Registro_ventasComponent implements  AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  fechaInicio:Date = new Date;
  fechaFin:Date = new Date;

  range:FormGroup = this._fb.group({
    start:[ null , [Validators.required ]],
    end:[ null, [Validators.required ]]
  })


  displayedColumns: string[] = ['id', 'Producto', 'Factura', 'Cantidad', 'Total','Fecha_Compra'];
  dataSource = new MatTableDataSource<Venta>();

  constructor(
    private _protegidoService:ProtegidoService,
    private _fb:FormBuilder
  ) {}


  ngOnInit() {
    this.obtenerVentas();
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }






  obtenerVentas(){
    this._protegidoService.Getventas()
      .subscribe({
        next:(resp) => {
          this.dataSource.data = resp.venta
        },
        error:( err) => {
          console.log(err);
        }
      })

    }


  FiltroEntreFechas(){
  if (!this.range.controls['start'].value || !this.range.controls['end'].value ) return;

    // Funciona pero afecta a mi busqueda por parametro
    this.dataSource.filterPredicate = (data: Venta, filter: string) => {
      const fechaInicio = new Date(this.range.controls['start'].value).getTime();
      const fechaFin =  new Date(this.range.controls['end'].value).getTime();
      const date = new Date(data.createdAt).getTime();
      return date >= fechaInicio && date <= fechaFin;
    };
    this.dataSource.filter = 'custom'
  }


    // Filtro por solo un dia
  filtroUnDia( filterValue:Date){


    this.dataSource.filterPredicate = (data: Venta, filter: string) => {
      const date = new Date( data.createdAt );

      return date.toDateString() === filter;
    };
    this.dataSource.filter = filterValue.toDateString();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // Para realizar filtros con los nombres de las tablas relacionadas
    this.dataSource.filterPredicate = (data:Venta, filter:string ) =>{
        const Medicamentos = [
          data.Medicamento?.nombre_registrado
        ]
        const match = Medicamentos.some( med => med?.toLowerCase().includes( filter));
        return match
    }

  }


  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

}
