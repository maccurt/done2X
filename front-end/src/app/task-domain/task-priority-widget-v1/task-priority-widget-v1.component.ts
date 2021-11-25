import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Chart } from 'angular-highcharts';
import { ChartServiceDone2x } from 'src/app/chart-domain/chart.service';
import { IconService } from 'src/app/icon.service';
import { TaskItem } from '../task-item/task-item.type';
import { orderBy } from 'lodash';

interface IPriority {
  priority: number;
}

@Component({
  selector: 'd2x-task-priority-widget-v1',
  templateUrl: './task-priority-widget-v1.component.html',
  styleUrls: ['./task-priority-widget-v1.component.scss']
})
export class TaskPriorityWidgetV1Component implements OnInit, AfterViewInit {

  @Input() version = 1;
  @Input() title: string = '';
  @Input() taskItemList: TaskItem[] = [];
  chart!: Chart;
  proprtyToSort = 'priority';

  constructor(public iconService: IconService, private chartService: ChartServiceDone2x) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.setChart();
  }

  sort(property: string) {

    if (this.proprtyToSort !== property) {
      this.taskItemList = orderBy(this.taskItemList, [property], ['asc'])
      this.proprtyToSort = property;
    }
    else {
      this.taskItemList = orderBy(this.taskItemList, [property], ['desc'])
      this.proprtyToSort = '';
    }
  }

  priorityToggle(change: MatButtonToggleChange, taskItem: TaskItem) {
    //TODO is there a way to bind to the value and not need this method    
    taskItem.priority = parseInt(change.value);
    this.setChart();
  }

  setChart() {
    this.chart = this.chartService.getTaskPriorityPieChartX("Task Priority", this.taskItemList);
  }

  changeStatus(item: IPriority) {
    const max = 3
    item.priority = item.priority + 1;
    if (item.priority > max) {
      item.priority = 1;
    }
    this.setChart();
  }

}