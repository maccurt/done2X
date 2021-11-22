import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { faGraduationCap, faFrog, faChalkboardTeacher, faCheckSquare, faGlassCheers } from '@fortawesome/free-solid-svg-icons';
import { ChartServiceDone2x } from '../chart-domain/chart.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  //Font Awesome Icons
  learnIcon = faGraduationCap;
  wartsAndAllIcon = faFrog;
  experimentLearnIcon = faChalkboardTeacher;
  goalsTaskIcon = faCheckSquare;
  celebrateIcon = faGlassCheers;

  //subs$ to dispose
  isAuthenticated$!: Subscription;
  //chart
  chart1!: Chart;
  chart2!: Chart;
  chart3!: Chart;


  constructor(private authService: AuthService,
    private chartService: ChartServiceDone2x

  ) { }

  

  public ngOnInit(): void {
    // this.isAuthenticated$ = this.authService.isAuthenticated$.subscribe(() => {
    //   console.log('authenticated in home');
    // })    

  }

  ngAfterViewInit(): void {
    this.chart1 = this.chartService.getSimplePieChart('Goals Completed', 100, 50);
    this.chart2 = this.chartService.getSimplePieChart('title 2', 75, 50);
    this.chart3 = this.chartService.getSimplePieChart('title 3', 100, 62);
  }

  public ngOnDestroy(): void {
    this.isAuthenticated$?.unsubscribe();
  }
}
