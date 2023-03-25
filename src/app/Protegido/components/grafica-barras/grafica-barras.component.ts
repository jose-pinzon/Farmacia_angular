import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';



@Component({
  selector: 'app-grafica-barras',
  templateUrl: './grafica-barras.component.html',
  styleUrls: ['./grafica-barras.component.css']
})
export class GraficaBarrasComponent implements OnInit {

  @Input() horizontal:boolean = false
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  public barChartPlugins = [ //!Este plugin es para que aparesca el valor de las barras
    DataLabelsPlugin
  ];

  public barChartType: ChartType = 'bar';
  @Input() barChartData: ChartData<'bar'> = {
    labels:['2012','2013','2014','2015','2016','2017','2018'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', backgroundColor:'#61FA2B', hoverBackgroundColor:'red' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
      { data: [28, 78, 40, 29, 33, 29, 82], label: 'Series C' },
    ],
  };



  ngOnInit(): void {
    if (this.horizontal){
          //Esto muestra la gráfica en sentido horizontal y todos los datos en ese sentido.
          this.barChartOptions!.indexAxis = 'y';
          this.barChartOptions!.scales!["y"]!.min = 0;
      }
  }

  public randomize(): void {
    // Only Change 3 values

    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];
    this.barChartData.datasets[1].data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];
    this.barChartData.datasets[2].data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];
    this.chart?.update();
  }

}
