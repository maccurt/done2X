import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Confirm, ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Goal } from '../goal-domain/goal.type';
import { TaskItemModalComponent } from '../task-item-modal/task-item-modal.component';
import { TaskItemService, TaskItemStatus } from '../task-item.service';
import { TypeAction, TypeClickEvent } from '../task-item/task-item.component';
import { TaskItem } from '../task-item/task-item.type';

@Component({
  selector: 'app-task-item-list',
  templateUrl: './task-item-list.component.html',
  styleUrls: ['./task-item-list.component.scss']
})

export class TaskItemListComponent implements OnInit, OnDestroy {

  taskItemList: TaskItem[] = [];
  taskinProgress: TaskItem[] = [];
  taskinCompleted: TaskItem[] = [];
  taskInBacklog: TaskItem[] = [];
  goalList: Goal[] = [];
  goalControl: FormControl = new FormControl();
  formGroup!: FormGroup;
  goal!: Goal;

  getTaskItemListSub$!: Subscription;
  addTaskItemSub$!: Subscription;
  updateTaskItemSub$!: Subscription;
  afterClosedSub$!: Subscription;
  deleteAfterClosedSub$!: Subscription;
  valueChangesSub$!: Subscription;
  routeDataSub$!: Subscription;

  constructor(private taskItemService: TaskItemService,    
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.routeDataSub$ = this.route.data.subscribe((data) => {
      const goalId = this.route.snapshot.paramMap.get('goal-id');
      this.goalList = data.goalList;
      this.goal = this.goalList.find((g) => { return g.id.toString() === goalId; }) ?? this.goalList[0];

      //unsubscribe so it does not fire the value change subscription
      this.valueChangesSub$?.unsubscribe();
      this.goalControl.setValue(this.goal);
      this.taskItemList = data.taskItemList;
      this.splitTaskItemsIntoLanes();

      this.valueChangesSub$ = this.goalControl.valueChanges.subscribe((goal: Goal) => {
        this.goal = goal;
        this.router.navigate([`task-list/${goal.id}`]);
        this.getTaskItemList();
      });
    });

    this.formGroup = new FormGroup({ goal: this.goalControl });
  }

  getTaskItemList(): void {
    console.log('getTask', this.goal)
    this.getTaskItemListSub$ = this.taskItemService.getTaskItemList(this.goal.id).subscribe((taskItemList) => {
      this.taskItemList = taskItemList;
      this.splitTaskItemsIntoLanes();
    });
  }

  splitTaskItemsIntoLanes(): void {
    this.taskinProgress = this.taskItemService.filterTaskItemListByStatus(this.taskItemList, TaskItemStatus.inProgress);
    this.taskinCompleted = this.taskItemService.filterTaskItemListByStatus(this.taskItemList, TaskItemStatus.completed);
    this.taskInBacklog = this.taskItemService.filterTaskItemListByStatus(this.taskItemList, TaskItemStatus.backLog);
  }

  actionEvent(event: TypeClickEvent<TaskItem>): void {
    switch (event.action) {
      case TypeAction.edit:
        this.editTaskItem(event.item)
        break;
      case TypeAction.delete:
        this.deleteTaskItem(event.item);
        break;
      case TypeAction.moveStatus:
        this.updateStatus(event.item, event.status)
        break;
    }
  }

  updateStatus(taskItem: TaskItem, moveToStaus: TaskItemStatus): void {
    const previousStatus = taskItem.taskItemStatusId;
    taskItem.taskItemStatusId = moveToStaus;
    this.updateTaskItemSub$ = this.taskItemService.updateTaskItem(taskItem).subscribe((updatedTask) => {
      this.removeTaskFromStatusLane(taskItem, previousStatus);
      this.moveTaskToStatusLane(updatedTask, moveToStaus);
    });
  }

  removeTaskFromStatusLane(taskItem: TaskItem, removeFromStatus: TaskItemStatus): void {
    let list: TaskItem[] = [];
    switch (removeFromStatus) {
      case TaskItemStatus.backLog:
        list = this.taskInBacklog
        break;
      case TaskItemStatus.inProgress:
        list = this.taskinProgress
        break;
      case TaskItemStatus.completed:
        list = this.taskinCompleted
        break;
    }

    if (list.length > -1) {
      let index = list.indexOf(taskItem);
      if (index > -1) {
        list.splice(index, 1);
      }
    }
  }

  moveTaskToStatusLane(taskItem: TaskItem, moveToStaus: TaskItemStatus, isNew = false): void {
    switch (moveToStaus) {
      case TaskItemStatus.backLog:
        if (isNew) {
          this.taskInBacklog.unshift(taskItem);
        }
        else if (this.taskInBacklog.indexOf(taskItem) === -1) {
          this.taskInBacklog.unshift(taskItem);
        }
        break;
      case TaskItemStatus.inProgress:
        if (isNew) {
          this.taskinProgress.unshift(taskItem);
        }
        else if (this.taskinProgress.indexOf(taskItem) === -1) {
          this.taskinProgress.unshift(taskItem);
        }
        break;
      case TaskItemStatus.completed:
        if (isNew) {
          this.taskinCompleted.unshift(taskItem);
        }
        else if (this.taskinCompleted.indexOf(taskItem) === -1) {
          this.taskinCompleted.unshift(taskItem);
        }
        break;
    }
  }

  deleteTaskItem(taskItem: TaskItem) {
    let confirm: Confirm = {
      question: `Delete Task?`, yesAnswer: 'Delete', noAnswer: 'Cancel', nameOfEntity: taskItem.name
    }

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      disableClose: true,
      data: confirm
    });

    this.deleteAfterClosedSub$ = dialogRef.afterClosed().subscribe((confirm: boolean) => {

      if (confirm) {
        this.taskItemService.deleteTaskItem(taskItem.id).subscribe(() => {
          this.removeTaskFromStatusLane(taskItem, taskItem.taskItemStatusId);
        })
      }
    })
  }

  addTaskToBacklog(): void {
    this.addTask(TaskItemStatus.backLog);
  }

  addTaskToInProgress(): void {
    this.addTask(TaskItemStatus.inProgress);
  }

  addTask(status: TaskItemStatus): void {
    let taskItem = new TaskItem();
    taskItem.goalId = this.goal.id;
    taskItem.taskItemStatusId = status;
    this.editTaskItem(taskItem);
  }

  editTaskItem(taskItem: TaskItem): void {

    const previousStatus = taskItem.taskItemStatusId
    const dialogRef = this.dialog.open(TaskItemModalComponent, {
      data: taskItem,
      disableClose: true
    });

    this.afterClosedSub$ = dialogRef.afterClosed().subscribe((taskItem: TaskItem) => {
      //Add Task Item
      if (taskItem && !taskItem.id) {
        this.addTaskItemSub$ = this.taskItemService.addTaskItem(taskItem).subscribe((newTask) => {
          this.moveTaskToStatusLane(newTask, newTask.taskItemStatusId, true);
        });
      };

      //Update Task Item
      if (taskItem && taskItem.id) {
        this.updateTaskItemSub$ = this.taskItemService.updateTaskItem(taskItem).subscribe((updatedTask) => {
          if (previousStatus !== updatedTask.taskItemStatusId) {
            this.removeTaskFromStatusLane(taskItem, previousStatus)
            this.moveTaskToStatusLane(updatedTask, updatedTask.taskItemStatusId);
          }
        });
      };
    })
  }

  ngOnDestroy(): void {
    this.getTaskItemListSub$?.unsubscribe();
    this.addTaskItemSub$?.unsubscribe();
    this.updateTaskItemSub$?.unsubscribe();
    this.afterClosedSub$?.unsubscribe();
    this.deleteAfterClosedSub$?.unsubscribe();
    this.routeDataSub$?.unsubscribe();
    this.valueChangesSub$?.unsubscribe();
  }
}
