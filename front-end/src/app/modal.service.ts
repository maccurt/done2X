import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Confirm, ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { TaskItemModalComponent } from './task-domain/task-item-modal/task-item-modal.component';
import { TaskItem } from './task-domain/task-item/task-item.type';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog, private deviceDetector: DeviceDetectorService) { }

  public TaskItemModal(taskItem: TaskItem): MatDialogRef<TaskItemModalComponent, any> {
    return this.dialog.open(TaskItemModalComponent, {
      panelClass: 'd2x-dialog-panel',
      data: taskItem,
      disableClose: true
    });
  }

  public DeleteTaskModal(taskItem: TaskItem): MatDialogRef<ConfirmModalComponent, any> {

    let confirm: Confirm = {
      question: `Delete Task?`, yesAnswer: 'Delete', noAnswer: 'Cancel', nameOfEntity: taskItem.name
    }

    return this.dialog.open(ConfirmModalComponent, {
      panelClass: 'd2x-dialog-panel',
      disableClose: true,
      data: confirm
    });

  }
}
