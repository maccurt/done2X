import { AfterViewInit, Component, DoCheck, Input, IterableDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Subject } from 'rxjs';
import { ChartServiceDone2x } from 'src/app/chart-domain/chart.service';
import { IconColorService } from 'src/app/iconColor.service';
import { TaskItem } from '../../task-domain/task-item/task-item.type';
import { PriorityData } from '../priority-data.type';

@Component({
  selector: 'd2x-task-priority-chart-v1',
  templateUrl: './task-priority-chart-v1.component.html',
  styleUrls: ['./task-priority-chart-v1.component.scss']
})
export class TaskPriorityChartV1Component implements OnInit, OnChanges {

  @Input() data!: PriorityData
  chart!: Chart

  constructor(private chartService: ChartServiceDone2x,
    public iconColorService:IconColorService,
    ) { }

  ngOnInit(): void {
    this.chart = this.chartService.taskPriorityChart('Task Priority', this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chart = this.chartService.taskPriorityChart('Task Priority', this.data);
  }
}