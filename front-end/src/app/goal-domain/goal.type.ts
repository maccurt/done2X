export class Describer {
  id!: number;
  name!: string;
  description!: string;
}

export class Goal extends Describer {
  projectId!: number;
  whatIsDone!: string;
  targetCompletionDate: Date = new Date();
  isCompleted: boolean = false;
  completionDate?: Date;
  createdDate!: Date;
  taskCompleted = 0;
  taskNotCompleted = 0
  taskCount = 0
}