import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Goal, GoalService } from "../goal-domain/goal.service";

@Injectable()
export class GoalListResolver implements Resolve<Goal[]>{

    constructor(private goalService: GoalService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Goal[] | Observable<Goal[]> | Promise<Goal[]> {
        return this.goalService.GetGoalList();
    }
}