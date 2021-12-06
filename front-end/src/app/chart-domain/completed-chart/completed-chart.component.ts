import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { IconService } from 'src/app/icon.service';
import { ChartServiceDone2x } from '../chart.service';

@Component({
  selector: 'd2x-completed-chart',
  templateUrl: './completed-chart.component.html',
  styleUrls: ['./completed-chart.component.scss']
})
export class CompletedChartComponent implements OnInit,OnChanges {

  @Input() completed!: number;
  @Input() notCompleted!: number;
  change = false;

  chart!: Chart;
  constructor(private chartService: ChartServiceDone2x,public iconService:IconService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.change){
      this.chart = this.chartService.completedPieChart(this.completed, this.notCompleted);    
    }
    this.change = true;    
  }

  ngOnInit(): void {
    this.chart = this.chartService.completedPieChart(this.completed, this.notCompleted);
  }
}