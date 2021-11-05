import { TaskItemStatus } from "../task-item.service";

export class TaskItem {
    id!: number;
    name!: string;
    description?: string;
    taskItemStatusId: number = TaskItemStatus.backLog;
    priority: number = 3;
}