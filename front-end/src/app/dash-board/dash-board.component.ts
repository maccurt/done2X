import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ChartServiceDone2x } from '../chart-domain/chart.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit, AfterViewInit {

  chartList:Chart[] = [];

  constructor(public chartService: ChartServiceDone2x) { } 
  

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {


    this.chartList.push(this.chartService.getRandomGoalChart());
    this.chartList.push(this.chartService.getRandomBarChart());
    this.chartList.push(this.chartService.getRandomGoalChart());
    this.chartList.push(this.chartService.getRandomGoalChart());
    this.chartList.push(this.chartService.getRandomGoalChart());
    this.chartList.push(this.chartService.getRandomBarChart());
    // this.chartList.push(this.chartService.getRandomBarChart());
    // this.chartList.push(this.chartService.getRandomGoalChart());
    
  }


}
