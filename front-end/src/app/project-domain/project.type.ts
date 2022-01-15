import { Goal } from "../goal-domain/goal.type";

export class Project {
    id!: number;
    name!: string;
    goalCompleted = 0;
    goalNotCompleted = 0
    goalCount = 0;
    currentGoals: Goal[] = [];
}