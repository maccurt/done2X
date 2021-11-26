import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Subject } from 'rxjs';
import { ChartServiceDone2x } from 'src/app/chart-domain/chart.service';
import { TaskItem } from '../task-item/task-item.type';

@Component({
  selector: 'd2x-task-priority-chart-v1',
  templateUrl: './task-priority-chart-v1.component.html',
  styleUrls: ['./task-priority-chart-v1.component.scss']
})
export class TaskPriorityChartV1Component implements OnInit, AfterViewInit {

  @Input() version = 1
  @Input() taskItemList: TaskItem[] = [];
  chart!: Chart
  @Input() change!: Subject<Boolean>

  constructor(private chartService: ChartServiceDone2x) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {

    this.chart = this.chartService.taskPriorityChart1('Task Priority', this.taskItemList, this.version);

    if (this.change) {
      this.change.subscribe(() => {
        console.log('changing');
        this.chart = this.chartService.taskPriorityChart1('Task Priority', this.taskItemList, this.version);
      })
    }
    else {
      console.log('subject not set');
    }

  }
}