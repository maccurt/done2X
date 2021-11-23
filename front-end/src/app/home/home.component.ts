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
    //pie chart
    this.chart1 = this.chartService.getGoalPieChart();

    //bar chart
    const barChartData = [
      { y: 50, color: '#ff3333' },
      { y: 17, color: '#00b300' },
      { y: 34, color: '#ffff33' }
    ];

    this.chart2 = this.chartService.getBarChart('Completd Priority', barChartData, ['High', 'Medium', 'Low']);
    this.chart3 = this.chartService.getGoalPieChart();
  }

  public ngOnDestroy(): void {
    this.isAuthenticated$?.unsubscribe();
  }
}
