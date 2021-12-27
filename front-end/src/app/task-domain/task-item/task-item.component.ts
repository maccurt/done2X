import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconColorService } from 'src/app/iconColor.service';
import { TaskItemStatus } from '../task-item.service';
import { TaskItem } from './task-item.type';
import { TypeAction } from './TypeAction';
import { TypeClickEvent } from './TypeClickEvent';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  //input & output
  @Input()
  taskItem!: TaskItem;
  @Output()
  actionEvent = new EventEmitter<TypeClickEvent<TaskItem>>();
  @Output()
  deleteClicked = new EventEmitter<TaskItem>();

  constructor(public iconColorService:IconColorService) { }

  taskItemClick(): void {
    this.actionEvent.emit(new TypeClickEvent<TaskItem>(TypeAction.edit, this.taskItem));
  }

  delete(): void {
    this.actionEvent.emit(new TypeClickEvent<TaskItem>(TypeAction.delete, this.taskItem));
  }

  public moveToBacklog(): void {
    this.actionEvent.emit(new TypeClickEvent<TaskItem>(TypeAction.moveStatus, this.taskItem, TaskItemStatus.backLog));
  }
  public moveToCompleted(): void {
    this.actionEvent.emit(new TypeClickEvent<TaskItem>(TypeAction.moveStatus, this.taskItem, TaskItemStatus.completed));
  }

  public moveToInProgress(): void {
    this.actionEvent.emit(new TypeClickEvent<TaskItem>(TypeAction.moveStatus, this.taskItem, TaskItemStatus.inProgress));
  }
}
