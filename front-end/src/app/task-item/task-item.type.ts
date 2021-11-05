export class TaskItem {
    id!: number;
    name!: string;
    description?: string;
    taskItemStatusId!: number;
    priority: number = 3
}