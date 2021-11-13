import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectService } from './project-domain/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'done2X';
  formGroup!: FormGroup;
  goalControl: FormControl = new FormControl();

  isAuthenticated: boolean = false;
  testing: boolean = false;
  getDefaultProjectSub$!: Subscription;
  constructor(public authService: AuthService, private projectService: ProjectService) {

    this.testing = environment.testing

    authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;

      if (this.isAuthenticated) {

        if (!localStorage.getItem('project-id')) {

          this.getDefaultProjectSub$ = projectService.getDefaultProject().subscribe((project) => {
            console.log('set project to', project);
            localStorage.setItem('project-id', project.id.toString());
          });
        }
      }

    });
  }
}