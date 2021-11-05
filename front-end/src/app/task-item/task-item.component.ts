import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskItem } from './task-item.type';


export enum TypeAction {
  add = 1,
  edit,
  delete
}

export class TypeClickEvent<Type> {
  constructor(public action: TypeAction, public item: Type) {

  }
}

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.less']
})
export class TaskItemComponent implements OnInit {

  @Input()
  taskItem!: TaskItem;
  @Output()
  actionEvent = new EventEmitter<TypeClickEvent<TaskItem>>();

  @Output()
  deleteClicked = new EventEmitter<TaskItem>();

  constructor() { }

  taskItemClick(): void {
    this.actionEvent.emit(new TypeClickEvent<TaskItem>(TypeAction.edit, this.taskItem));
  }

  delete(): void {
    this.actionEvent.emit(new TypeClickEvent<TaskItem>(TypeAction.delete, this.taskItem));
  }

  ngOnInit(): void {
  }

}
