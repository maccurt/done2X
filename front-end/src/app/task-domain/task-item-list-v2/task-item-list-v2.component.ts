import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { orderBy } from 'lodash';
import { Subscription } from 'rxjs';
import { Confirm, ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { Goal } from 'src/app/goal-domain/goal.type';
import { IconService } from 'src/app/icon.service';

import { TaskItemModalComponent } from '../task-item-modal/task-item-modal.component';
import { TaskItemService, TaskItemStatus } from '../task-item.service';
import { TaskItem } from '../task-item/task-item.type';
import { TypeAction } from '../task-item/TypeAction';
import { TypeClickEvent } from '../task-item/TypeClickEvent';

@Component({
  selector: 'd2x-task-item-list-v2',
  templateUrl: './task-item-list-v2.component.html',
  styleUrls: ['./task-item-list-v2.component.scss']
})
export class TaskItemListV2Component implements OnDestroy {
  @Input() completedMode: boolean = false;
  @Input() taskItemList: TaskItem[] = [];
  @Input() goal!: Goal;
  @Output() actionEvent = new EventEmitter<TypeClickEvent<TaskItem>>();

  proprtyToSort: string = 'priority';
  //subscription
  afterClosedSub$!: Subscription;
  addTaskItemSub$!: Subscription;
  deleteAfterClosedSub$!: Subscription;
  updateTaskItemSub$!: Subscription;

  constructor(
    private dialog: MatDialog,
    private taskItemService: TaskItemService,
    public iconService: IconService
  ) { }

  public sort(property: string) {

    if (this.proprtyToSort !== property) {
      this.taskItemService.sortTaskItemList(this.taskItemList, property, true);
      this.proprtyToSort = property;
    }
    else {
      this.taskItemService.sortTaskItemList(this.taskItemList, property, false);
      this.proprtyToSort = '';
    }
  }

  public moveTaskStatus(taskItem: TaskItem) {
    if (this.completedMode) {
      taskItem.taskItemStatusId = TaskItemStatus.inProgress;
    }
    else {
      taskItem.taskItemStatusId = TaskItemStatus.completed;
    }

    this.taskItemService.updateTaskItem(taskItem).subscribe((response) => {
      this.taskItemService.removeTaskFromList(taskItem, this.taskItemList);
      this.actionEvent.emit(new TypeClickEvent(TypeAction.moveStatus, response));
    });
  }

  public addTaskItem() {
    const taskItem = new TaskItem();
    taskItem.goalId = this.goal.id;
    const dialogRef = this.dialog.open(TaskItemModalComponent, {
      data: taskItem,
      disableClose: true
    });

    this.afterClosedSub$ = dialogRef.afterClosed().subscribe((taskItem: TaskItem) => {
      this.addTaskItemSub$ = this.taskItemService.addTaskItem(taskItem).subscribe((response) => {
        //TODO remove this if we are not going to use the completed property
        response.completed = (taskItem.taskItemStatusId === TaskItemStatus.completed);
        this.actionEvent.emit(new TypeClickEvent(TypeAction.moveStatus, response));
      });
    })
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
          this.taskItemService.removeTaskFromList(taskItem, this.taskItemList);
          this.actionEvent.emit(new TypeClickEvent(TypeAction.delete, taskItem));
        })
      }
    })
  }

  public editTaskItem(taskItem: TaskItem) {
    const dialogRef = this.dialog.open(TaskItemModalComponent, {
      data: taskItem,
      disableClose: true
    });

    let taskItemStatusId = taskItem.taskItemStatusId;
    this.afterClosedSub$ = dialogRef.afterClosed().subscribe((taskItem: TaskItem) => {
      if (taskItem) {
        this.updateTaskItemSub$ = this.taskItemService.updateTaskItem(taskItem).subscribe((updatedTask) => {
          Object.assign(taskItem, updatedTask);
          taskItem.completed = (taskItem.taskItemStatusId === TaskItemStatus.completed);

          if (taskItemStatusId !== taskItem.taskItemStatusId) {
            this.taskItemService.removeTaskFromList(taskItem, this.taskItemList);
            this.actionEvent.emit(new TypeClickEvent(TypeAction.moveStatus, taskItem));
          }
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.afterClosedSub$?.unsubscribe;
    this.addTaskItemSub$?.unsubscribe;
    this.deleteAfterClosedSub$?.unsubscribe;
    this.updateTaskItemSub$?.unsubscribe;
  }
}