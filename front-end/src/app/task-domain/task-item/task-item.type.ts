import { Code } from "src/app/code.service";
import { TaskItemStatus } from "../task-item.service";

export class TaskItem {
    selected:boolean = false;
    id!: number;
    goalId!: number;
    taskTypeId:number = 1; //TODO should this default to do
    taskTypeCode?:Code
    name!: string;
    description?: string;
    taskItemStatusId: number = TaskItemStatus.backLog;
    priority: number = 3;
    updatedDate!: Date;
    createdDate!: Date;
    statusUpdatedDate!: Date;
    completed: boolean = false;
}