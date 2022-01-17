import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Chart } from 'angular-highcharts';
import { ChartServiceDone2x } from 'src/app/chart-domain/chart.service';
import { IconColorService } from 'src/app/iconColor.service';
import { TaskItem } from '../task-item/task-item.type';
import { orderBy } from 'lodash';
import { Code, CodeService } from 'src/app/code.service';
import { Subject } from 'rxjs';
import { TaskItemStatus } from '../task-item.service';
import { PriorityData } from 'src/app/chart-domain/priority-data.type';

interface IPriority {
  priority: number;
}

@Component({
  selector: 'd2x-task-priority-widget-v1',
  templateUrl: './task-priority-widget-v1.component.html',
  styleUrls: ['./task-priority-widget-v1.component.scss']
})
export class TaskPriorityWidgetV1Component implements OnInit, AfterViewInit {
  //event
  @Input() version = 1;
  @Input() title: string = '';
  @Input() taskItemList: TaskItem[] = [];
  
  chart!: Chart;
  priorityData!: PriorityData;
  proprtyToSort = 'priority';
  priorityList: Code[] = [];

  constructor(public iconColorService: IconColorService,
    private codeService: CodeService,
    private chartService: ChartServiceDone2x) { }

  ngOnInit(): void {

    this.codeService.GetPriority().subscribe((codes) => {
      this.priorityList = codes;
    });
  }

  ngAfterViewInit(): void {
    this.setChart();
  }

  public updateTaskItemStatus(taskItem: TaskItem) {
    taskItem.taskItemStatusId = taskItem.completed ? TaskItemStatus.completed : TaskItemStatus.backLog;
  }

  sort(property: string) {

    if (this.proprtyToSort !== property) {
      this.taskItemList = orderBy(this.taskItemList, [property], ['asc']);
      this.proprtyToSort = property;
    }
    else {
      this.taskItemList = orderBy(this.taskItemList, [property], ['desc']);
      this.proprtyToSort = '';
    }
  }

  priorityToggle(change: MatButtonToggleChange, taskItem: TaskItem) {
    //TODO is there a way to bind to the value and not need this method    
    taskItem.priority = parseInt(change.value);
    this.setChart();
  }

  setChart() {
    this.priorityData = this.chartService.getPriorityData(this.taskItemList);    
  }

  changeStatus(item: IPriority) {
    const max = 3;
    item.priority = item.priority + 1;
    if (item.priority > max) {
      item.priority = 1;
    }
    this.setChart();
  }
}