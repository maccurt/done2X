import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Confirm, ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { TaskItemModalComponent } from '../task-item-modal/task-item-modal.component';
import { TaskItemService, TaskItemStatus } from '../task-item.service';
import { TypeAction, TypeClickEvent } from '../task-item/task-item.component';
import { TaskItem } from '../task-item/task-item.type';

@Component({
  selector: 'app-task-item-list',
  templateUrl: './task-item-list.component.html',
  styleUrls: ['./task-item-list.component.less']
})

export class TaskItemListComponent implements OnInit, OnDestroy {
  taskItemList: TaskItem[] = [];
  getTaskItemListSub$!: Subscription;
  addTaskItemSub$!: Subscription;
  updateTaskItemSub$!: Subscription;
  afterClosedSub$!: Subscription;
  deleteAfterClosedSub$!: Subscription;
  taskinProgress: TaskItem[] = [];
  taskinCompleted: TaskItem[] = [];
  taskInBacklog: TaskItem[] = [];

  constructor(private taskItemService: TaskItemService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTaskItemListSub$ = this.taskItemService.getTaskItemList().subscribe((taskItemList) => {
      this.taskItemList = taskItemList
      this.filterList();
    });
  }

  filterList(): void {
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

      this.removeTaskFromStatusLane(taskItem,previousStatus);
      this.moveTaskToStatusLane(updatedTask, moveToStaus);
    });
  }

  // removeTaskItemFromList(taskItem: TaskItem) {
  //   let index = this.taskItemList.indexOf(taskItem);
  //   if (index > -1) {
  //     this.taskItemList.splice(index, 1);
  //   }
  // }

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
        list = this.taskinProgress;
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
      question: `Delete Task?`,
      yesAnswer: 'Delete',
      noAnswer: 'Cancel',
      nameOfEntity: taskItem.name

    }
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      disableClose: true,
      data: confirm
    });

    this.deleteAfterClosedSub$ = dialogRef.afterClosed().subscribe((confirm: boolean) => {

      if (confirm) {
        this.taskItemService.deleteTaskItem(taskItem.id).subscribe((deleted) => {
          if (deleted) {
            let index = this.taskItemList.indexOf(taskItem);
            if (index > -1) {
              this.taskItemList.splice(index, 1);
              this.filterList();
            }
          }
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
            this.removeTaskFromStatusLane(taskItem, taskItem.taskItemStatusId)
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
  }
}
