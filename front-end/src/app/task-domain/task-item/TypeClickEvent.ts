import { TaskItemStatus } from '../task-item.service';
import { TypeAction } from './TypeAction';

//TODO, I don't like this make it for specfic to just TASK, perhaps
export class TypeClickEvent<Type> {
  constructor(public action: TypeAction, public item: Type, public status: TaskItemStatus = TaskItemStatus.unknown) {
  }
}
