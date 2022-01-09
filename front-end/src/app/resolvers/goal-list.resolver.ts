import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { GoalService } from "../goal-domain/goal.service";
import { Goal } from "../goal-domain/goal.type";

@Injectable()
export class GoalListResolver implements Resolve<Goal[]>{

    constructor(private goalService: GoalService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Goal[] | Observable<Goal[]> | Promise<Goal[]> {

        const projectId = route.paramMap.get('project-id');
        if (projectId) {
            return this.goalService.GetGoalList(+projectId);
        }
        return [];
    }
}