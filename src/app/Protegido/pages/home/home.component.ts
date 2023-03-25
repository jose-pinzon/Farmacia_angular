import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  colSize:number = 4;
  rowspanGraficaPricipal:number = 12
  colsGraficasRestantes:number = 2
  rowspanGraficasRestantes:number = 7

  constructor( breakpintobserver: BreakpointObserver ){
    breakpintobserver.observe([
      Breakpoints.XSmall,/* max-width equals 599.99px */
      Breakpoints.Small,/* min-width equals 600px and max-width equals 959.99px */
      Breakpoints.Medium,/* min-width equals 960px and max-width equals 1279.99px */
      Breakpoints.Large,/* min-width equals 1280px and max-width equals 1919.99px */
      Breakpoints.XLarge/* min-width equals 1920px */
    ])
    .subscribe( (result:BreakpointState ) =>{


      switch (true) {
        case result.breakpoints[Breakpoints.XSmall]:
          this.rowspanGraficaPricipal = 5
          this.colSize=1
          this.colsGraficasRestantes = 1
          this.rowspanGraficasRestantes = 5
          break;
        case result.breakpoints[Breakpoints.Small]:/* Small tablet  */
          this.rowspanGraficaPricipal = 8
          this.colSize=2
          this.colsGraficasRestantes = 1
          this.rowspanGraficasRestantes = 8
          break;


        case result.breakpoints[Breakpoints.Medium]:/* Tablet mas grande (768x1024 )*/
          this.rowspanGraficaPricipal = 10
          this.colSize=2
          this.rowspanGraficasRestantes = 6
          break;

        //Tamaños de escritorio
        case result.breakpoints[Breakpoints.Large]:
              this.rowspanGraficaPricipal = 13
              this.colSize=4
            this.rowspanGraficasRestantes = 7

            break;
        case result.breakpoints[Breakpoints.XLarge]:/* Tamaño mi nonitor */
            this.rowspanGraficaPricipal = 17
            this.colSize=4
            this.rowspanGraficasRestantes = 9
          break;


        default:
          break;
      }

    })
  }





  //? Datos que se envian a las graficas
  labelsData: string[] = ['2021', '2022', '2023', '2024', '2025'];
  proveedoresData: ChartData<'bar'> = {
      labels: this.labelsData,
      datasets:[
          { data: [100, 200, 300, 400, 5000], label: 'Vendedor A' },
          { data: [50, 250, 30, 450, 2000], label: 'Vendedor B' }
      ]
  };

  productoData: ChartData<'bar'> = {
    labels: this.labelsData,
    datasets:[
        { data: [200, 300, 400, 300, 100], label: 'Carros', backgroundColor: 'blue' }
    ]
  }


};


