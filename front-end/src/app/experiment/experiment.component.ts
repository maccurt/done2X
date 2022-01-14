import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ChartServiceDone2x } from '../chart-domain/chart.service';
import { IconColorService } from '../iconColor.service';
import { TaskItemStatus } from '../task-domain/task-item.service';
import { TaskItem } from '../task-domain/task-item/task-item.type';
import { Experiment } from './experiment.type';


@Component({
  selector: 'd2x-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss']
})
export class ExperimentComponent implements AfterViewInit {

  loaded: boolean = false;
  hideA: boolean = false;
  hideB: boolean = false;
  taskItemList!: TaskItem[];

  experimentList: Experiment[] = [{ id: 1, name: 'Experiment 1', version: 1 },
  { id: 2, name: 'Experiment 2', version: 2 },
  { id: 3, name: 'Experiment 3', version: 3 }]
  experiment!: Experiment; 

  constructor(public chartService: ChartServiceDone2x,
    public fontService: IconColorService,

  ) {
    this.experiment = this.experimentList[0];
    this.taskItemList = this.getTaskItemList_mock();
  }  

  ngAfterViewInit(): void {
    this.loaded = true;
  }

  experimentClick(change: MatButtonToggleChange) {

    let x = this.experimentList.find((e) => {
      return e.id == change.value;
    });

    if (x) {
      this.experiment = x;      
    }
  }

  //MOCKS
  getTaskItemList_mock(): TaskItem[] {
    const taskItemList: TaskItem[] = [];
    taskItemList.push(this.getTaskItem_mock(1, 'Wash sheets for guest bedroom', 1,));
    taskItemList.push(this.getTaskItem_mock(2, 'Clean guest bathroom', 1, true));
    taskItemList.push(this.getTaskItem_mock(3, 'Order Trash Bin For Debris', 2));
    taskItemList.push(this.getTaskItem_mock(4, 'Buy Barrell size trash liners', 2));
    taskItemList.push(this.getTaskItem_mock(5, 'Caulk Windows', 2));
    taskItemList.push(this.getTaskItem_mock(6, 'Fix Railing on Steps', 3));
    taskItemList.push(this.getTaskItem_mock(7, 'Replace Light Bulbs in dining room', 3, true));
    taskItemList.push(this.getTaskItem_mock(8, 'Buy Turkey', 3));
    taskItemList.push(this.getTaskItem_mock(9, 'Clean Car & Get Gas', 3, true));
    taskItemList.push(this.getTaskItem_mock(10, 'Cook Meal', 3));
    return taskItemList;
  }

  getTaskItem_mock(id: number, name: string, priority: number, completed = false): TaskItem {

    let taskItem: TaskItem = {
      selected:false,
      id,
      goalId: 1,
      name,
      taskItemStatusId: TaskItemStatus.backLog,
      priority,
      updatedDate: new Date(),
      createdDate: new Date(),
      statusUpdatedDate: new Date(),
      completed
    };
    return taskItem;
  }
}