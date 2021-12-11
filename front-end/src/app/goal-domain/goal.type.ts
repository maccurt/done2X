export class Goal {
    id!: number;
    projectId!: number;
    name!: string;
    description!: string;
    whatIsDone!: string;
    targetCompletionDate:Date = new Date();
    isCompleted:boolean = false;
    completionDate?:Date;
    createdDate!: Date;
    taskCompleted!:number;
    taskNotCompleted!:number;
    taskCount!:number;
  }