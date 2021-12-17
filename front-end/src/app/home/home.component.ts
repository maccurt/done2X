import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { interval, Subscription } from 'rxjs';
import { faGraduationCap, faFrog, faChalkboardTeacher, faCheckSquare, faGlassCheers } from '@fortawesome/free-solid-svg-icons';
import { ChartServiceDone2x } from '../chart-domain/chart.service';
import { Chart } from 'angular-highcharts';
import { PriorityData } from '../chart-domain/priority-data.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  //Font Awesome Icons
  //TODO move these to the icon service, perhaps have on service for icons and color also
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

    this.chart1 = this.chartService.completedPieChartRanddom();
    this.createPriorityData();
  }

  createPriorityData() {

    let priorityData = new PriorityData(this.chartService.getRandomInteger(100),
      this.chartService.getRandomInteger(100),
      this.chartService.getRandomInteger(100));
    this.chart2 = this.chartService.taskPriorityChart('Task Priority', priorityData);

  }

  ngAfterViewInit(): void {

    //random pie chart    
    setInterval(() => {
      this.chart1 = this.chartService.completedPieChartRanddom();
    }, 25000);

    //random bar chart    
    setInterval(() => { this.createPriorityData(); }, 15000);
  }

  public ngOnDestroy(): void {
    this.isAuthenticated$?.unsubscribe();
  }
}
