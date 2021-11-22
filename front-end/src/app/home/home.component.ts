import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { faGraduationCap, faFrog, faChalkboardTeacher,faCheckSquare,faGlassCheers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  //Font Awesome Icons
  learnIcon = faGraduationCap;
  wartsAndAllIcon = faFrog;
  experimentLearnIcon = faChalkboardTeacher;
  goalsTaskIcon = faCheckSquare;
  celebrateIcon = faGlassCheers;

  //subs$ to dispose
  isAuthenticated$!: Subscription;


  constructor(private authService: AuthService) { }

  public ngOnInit(): void {
    // this.isAuthenticated$ = this.authService.isAuthenticated$.subscribe(() => {
    //   console.log('authenticated in home');
    // })



  }

  public ngOnDestroy(): void {
    this.isAuthenticated$?.unsubscribe();
  }
}
