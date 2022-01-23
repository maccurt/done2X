import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { IconColorService } from 'src/app/iconColor.service';
import { ChartServiceDone2x } from '../chart.service';

@Component({
  selector: 'd2x-completed-chart',
  templateUrl: './completed-chart.component.html',
  styleUrls: ['./completed-chart.component.scss']
})
export class CompletedChartComponent implements OnInit, OnChanges {

  @Input() name: string = "Task"
  @Input() completed!: number;
  @Input() notCompleted!: number;
  change = false;

  chart!: Chart;
  constructor(private chartService: ChartServiceDone2x,
    public iconColorService: IconColorService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.change) {
      this.chart = this.chartService.completedPieChart(this.completed, this.notCompleted);
    }
    this.change = true;
  }

  ngOnInit(): void {
    this.chart = this.chartService.completedPieChart(this.completed, this.notCompleted);
  }
}
