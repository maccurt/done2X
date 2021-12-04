import { TaskItemStatus } from '../task-item.service';
import { TypeAction } from './TypeAction';


export class TypeClickEvent<Type> {
  constructor(public action: TypeAction, public item: Type, public status: TaskItemStatus = TaskItemStatus.unknown) {
  }
}
