import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Code, CodeService } from "../code.service";

@Injectable()
export class TaskItemStatusListResolver implements Resolve<Code[]> {
    constructor(private codeService: CodeService) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Code[]> {
        return this.codeService.GetTaskItemStatus();
    }
}
