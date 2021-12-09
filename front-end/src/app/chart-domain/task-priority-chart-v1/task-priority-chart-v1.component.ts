import { AfterViewInit, Component, DoCheck, Input, IterableDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Subject } from 'rxjs';
import { ChartServiceDone2x } from 'src/app/chart-domain/chart.service';
import { TaskItem } from '../../task-domain/task-item/task-item.type';

@Component({
  selector: 'd2x-task-priority-chart-v1',
  templateUrl: './task-priority-chart-v1.component.html',
  styleUrls: ['./task-priority-chart-v1.component.scss']
})
export class TaskPriorityChartV1Component implements OnInit {

  @Input() taskItemList: TaskItem[] = [];
  @Input() change!: Subject<TaskItem[]>
  chart!: Chart

  constructor(private chartService: ChartServiceDone2x) { }

  ngOnInit(): void {
    this.chart = this.chartService.taskPriorityChart1('Task Priority', this.taskItemList);
    if (this.change) {
      this.change.subscribe((data) => {
        this.taskItemList = data;
        this.chart = this.chartService.taskPriorityChart1('Task Priority', data);
      })
    }
  }
}