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
        this.showModal(event.item)
        break;
      case TypeAction.delete:
        this.deleteTaskItem(event.item);
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

  addTaskToBacklog():void {
    this.addTask(TaskItemStatus.backLog);
  }

  addTaskToInProgress():void {
    this.addTask(TaskItemStatus.inProgress);
  }
  
  addTask(status:TaskItemStatus): void {
    let taskItem = new TaskItem();
    taskItem.taskItemStatusId = status;
    this.showModal(taskItem);
  }

  showModal(taskItem: TaskItem): void {

    const dialogRef = this.dialog.open(TaskItemModalComponent, {
      data: taskItem,
      disableClose: true
    });

    this.afterClosedSub$ = dialogRef.afterClosed().subscribe((taskItem: TaskItem) => {

      //Add Task Item
      if (taskItem && !taskItem.id) {
        this.addTaskItemSub$ = this.taskItemService.addTaskItem(taskItem).subscribe((newTask) => {
          this.taskItemList.push(newTask);
          this.filterList();
        });
      };

      //Update Task Item
      if (taskItem && taskItem.id) {
        this.updateTaskItemSub$ = this.taskItemService.updateTaskItem(taskItem).subscribe((updatedTask) => {
          this.filterList();
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
