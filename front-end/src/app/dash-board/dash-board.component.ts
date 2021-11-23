import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ChartServiceDone2x } from '../chart-domain/chart.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit, AfterViewInit {

  lineChart!: Chart;

  constructor(private chartService: ChartServiceDone2x) { }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

    this.lineChart = this.chartService.getLineChart();
  }

}
