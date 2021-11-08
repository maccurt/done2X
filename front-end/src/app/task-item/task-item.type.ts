import { TaskItemStatus } from "../task-item.service";

export class TaskItem {
    id!: number;
    goalId!: number;
    name!: string;
    description?: string;
    taskItemStatusId: number = TaskItemStatus.backLog;
    priority: number = 3;
    updatedDate!: Date;
    createdDate!: Date;
    statusUpdatedDate!: Date;

}