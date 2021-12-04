import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { TaskItemService } from "../task-domain/task-item.service";

import { TaskItem } from "../task-domain/task-item/task-item.type";

@Injectable()
export class TaskItemListResolver implements Resolve<TaskItem[]>{

    constructor(private taskService: TaskItemService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): TaskItem[] | Observable<TaskItem[]> | Promise<TaskItem[]> {

        const goalId = route.paramMap.get('goal-id');
        if (goalId) {
            return this.taskService.getTaskItemList(+goalId)
        }
        else {
            //TODO this should never happen, what is the better fix?
            return of([])
        }
    }
}

