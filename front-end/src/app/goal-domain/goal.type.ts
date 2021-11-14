export class Goal {
    id!: number;
    projectId!: number;
    name!: string;
    description!: string;
    whatIsDone!: string;
    targetCompletionDate:Date = new Date();
    createdDate!: Date;
  }