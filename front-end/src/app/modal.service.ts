import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Confirm, ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { GoalModalComponent } from './goal-domain/goal-modal/goal-modal.component';
import { Goal } from './goal-domain/goal.type';
import { TaskItemModalComponent } from './task-domain/task-item-modal/task-item-modal.component';
import { TaskItem } from './task-domain/task-item/task-item.type';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  public goalModal(goal: Goal): MatDialogRef<GoalModalComponent, any> {
    return this.dialog.open(GoalModalComponent, {
      panelClass: 'd2x-dialog-panel',
      data: goal,
      disableClose: true
    });
  }
  
  public taskItemModal(taskItem: TaskItem): MatDialogRef<TaskItemModalComponent, any> {
    return this.dialog.open(TaskItemModalComponent, {
      panelClass: 'd2x-dialog-panel',
      data: taskItem,
      disableClose: true
    });
  }

  public moveTaskModal(taskCount: number,goalName:string): MatDialogRef<ConfirmModalComponent, any> {    

    let confirm: Confirm = {
      title: '',
      question: `Move ${taskCount} Task To ${goalName}?`,
      yesAnswer: 'Yes, Move Task',
      noAnswer: 'No'
    };
    return this.dialog.open(ConfirmModalComponent, {
      panelClass: 'd2x-dialog-panel',
      disableClose: true,
      data: confirm
    });
  }

  public deleteTaskModal(taskItem: TaskItem): MatDialogRef<ConfirmModalComponent, any> {

    let confirm: Confirm = {
      question: `Delete Task?`, yesAnswer: 'Delete', noAnswer: 'Cancel', nameOfEntity: taskItem.name
    };

    return this.dialog.open(ConfirmModalComponent, {
      panelClass: 'd2x-dialog-panel',
      disableClose: true,
      data: confirm
    });
  }

  public deleteGoalModal(goal:Goal): MatDialogRef<ConfirmModalComponent, any> {

    let confirm: Confirm = {
      question: `Delete Goal?`, yesAnswer: 'Delete', noAnswer: 'Cancel', nameOfEntity: goal.name
    };    

    return this.dialog.open(ConfirmModalComponent, {
      panelClass: 'd2x-dialog-panel',
      disableClose: true,
      data: confirm
    });
  }
}