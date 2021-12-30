import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TaskItemModalComponent } from './task-domain/task-item-modal/task-item-modal.component';
import { TaskItem } from './task-domain/task-item/task-item.type';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog:MatDialog, private deviceDetector: DeviceDetectorService) {  }  

  public TaskItemModal(taskItem:TaskItem):MatDialogRef<TaskItemModalComponent,any>{
    return  this.dialog.open(TaskItemModalComponent, {
      panelClass:'d2x-dialog-panel',
      data: taskItem,
      disableClose: true
    });    
  }
}
