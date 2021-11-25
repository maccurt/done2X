import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartServiceDone2x } from '../chart-domain/chart.service';
import { IconService } from '../icon.service';
import { TaskItemStatus } from '../task-domain/task-item.service';
import { TaskItem } from '../task-domain/task-item/task-item.type';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss']
})
export class ExperimentComponent implements OnInit, AfterViewInit {

  loaded: boolean = false;
  hideA: boolean = false;
  hideB: boolean = false;

  taskItemList!: TaskItem[];

  constructor(public chartService: ChartServiceDone2x,
    public fontService: IconService,

  ) {
    this.taskItemList = this.getTaskItemList_mock();

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.loaded = true;
  }

  //MOCKS
  getTaskItemList_mock(): TaskItem[] {
    const taskItemList: TaskItem[] = [];
    taskItemList.push(this.getTaskItem_mock('Wash sheets for guest bedroom', 1))
    taskItemList.push(this.getTaskItem_mock('Clean guest bathroom', 1))
    taskItemList.push(this.getTaskItem_mock('Order Trash Bin For Debris', 2))
    taskItemList.push(this.getTaskItem_mock('Buy Barrell size trash liners', 2))
    taskItemList.push(this.getTaskItem_mock('Caulk Windows', 2))
    taskItemList.push(this.getTaskItem_mock('Fix Railing on Steps', 3))
    taskItemList.push(this.getTaskItem_mock('Replace Light Bulbs in dining room', 3))
    taskItemList.push(this.getTaskItem_mock('Buy Turkey', 3))
    taskItemList.push(this.getTaskItem_mock('Clean Car & Get Gas', 3))
    taskItemList.push(this.getTaskItem_mock('Cook Meal', 3))
    return taskItemList;

  }
  getTaskItem_mock(name: string, priority: number): TaskItem {

    let taskItem: TaskItem = {
      id: 1,
      goalId: 1,
      name,
      taskItemStatusId: TaskItemStatus.backLog,
      priority,
      updatedDate: new Date(),
      createdDate: new Date(),
      statusUpdatedDate: new Date(),
      completed: false
    };
    return taskItem;
  }
}