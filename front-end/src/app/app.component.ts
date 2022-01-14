import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectService } from './project-domain/project.service';

@Component({
  selector: 'd2x-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'done2X';
  formGroup!: FormGroup;
  goalControl: FormControl = new FormControl();

  isAuthenticated: boolean = false;
  testing: boolean = false;
  getDefaultProjectSub$!: Subscription;
  constructor(public authService: AuthService, private projectService: ProjectService) {

    //DO NOT CHECK THIS IN
    this.testing = environment.testing
    this.isAuthenticated = true;
    this.getDefaultProjectSub$ = projectService.getDefaultProject().subscribe((project) => {
      localStorage.setItem('project-id', project.id.toString());
    });

    //DO NOT CHECK THIS IN
    // authService.isAuthenticated$.subscribe((isAuthenticated) => {
    //   this.isAuthenticated = isAuthenticated;

    //   if (this.isAuthenticated) {
    //     if (!localStorage.getItem('project-id')) {

    //       this.getDefaultProjectSub$ = projectService.getDefaultProject().subscribe((project) => {    
    //         localStorage.setItem('project-id', project.id.toString());
    //       });
    //     }
    //   }
    // });

  }
}