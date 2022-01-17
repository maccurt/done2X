import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { GoalService } from "../goal-domain/goal.service";
import { Goal } from "../goal-domain/goal.type";

@Injectable()
export class GoalResolver implements Resolve<Goal | undefined> {

    constructor(private goalService: GoalService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<Goal> | undefined {

        const goalId = route.paramMap.get('goal-id');
        if (goalId) {
            return this.goalService.getGoal(+goalId);
        }
        else {
            return undefined;
        }
    }
}
