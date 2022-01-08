import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from './project.type';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private httpClient: HttpClient) { }

  getProjectList(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(environment.API_URL + 'project/list');
  }
  getDefaultProject(): Observable<Project> {
    return this.httpClient.get<Project>(environment.API_URL + 'project');
  }
}
