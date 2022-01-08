import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { ProjectService } from "../project-domain/project.service";
import { Project } from "../project-domain/project.type";

@Injectable()
export class ProjectListResolver implements Resolve<Project[]>{

    constructor(private projectService: ProjectService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Project[] | Observable<Project[]> | Promise<Project[]> {
        return this.projectService.getProjectList();
    }
}