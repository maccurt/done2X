import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ChartServiceDone2x } from '../chart-domain/chart.service';
import { TaskItem } from '../task-domain/task-item/task-item.type';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements AfterViewInit {

  chartList: Chart[] = [];
  taskItemList: TaskItem[] = [];

  constructor(public chartService: ChartServiceDone2x) { }

  ngAfterViewInit(): void {
    this.chartList.push(this.chartService.getRandomGoalChart('Add Auth To Backend'));
    this.chartList.push(this.chartService.getRandomBarChart());
    this.chartList.push(this.chartService.getDonutChart("Design Homepage"));
    this.chartList.push(this.chartService.getTaskPriorityPieChart('Design Home Page Priority'));
    this.chartList.push(this.chartService.getTaskPrioritySemiCircleChart('Design Dashboard Priority'));
  }
}