import { TaskItemStatus } from '../task-item.service';
import { TaskItem } from './task-item.type';
import { TaskEvenType } from './TypeAction';


export class TaskEvent {
  constructor(public action: TaskEvenType,
    public taskItem: TaskItem,
    public status: TaskItemStatus = TaskItemStatus.unknown) {
  }
}
