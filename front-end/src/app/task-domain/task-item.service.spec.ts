

import { TaskItemService, TaskItemStatus } from './task-item.service';
import { TaskItem } from './task-item/task-item.type';

describe('TaskItemService', () => {

  let service = new TaskItemService(null as any);

  it('should behave...', () => {

    const list:TaskItem[] = [];
    const inProgressTask: TaskItem = {  taskItemStatusId: 2 } as any;
    list.push(inProgressTask);
    const result = service.filterTaskItemListByStatus(list,TaskItemStatus.inProgress);
    expect(result.length).toBe(1);

  });

});
