
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Chart } from 'angular-highcharts';
//TODO is this blowing up the package check
import * as Highcharts from 'highcharts';
import { PieChartData } from './pie-chart-date-type';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceDone2x {

  constructor() { }

  getTaskPriorityPieChart(title: string): Chart {
    const data: PieChartData[] = [
      { y: this.getRandomInteger(10) + 1, color: '#ff3333', name: 'High', sliced: true },
      { y: this.getRandomInteger(10) + 1, color: '#00b300', name: 'Medium' },
      { y: this.getRandomInteger(10) + 1, color: '#ffff33', name: 'Low' }
    ];

    return new Chart(this.pieChartOptions(title, data));
  }

  getTaskPrioritySemiCircleChart(title: string): Chart {
    const data: PieChartData[] = [
      { y: this.getRandomInteger(10) + 1, color: '#ffff33', name: 'Low' },
      { y: this.getRandomInteger(10) + 1, color: '#00b300', name: 'Medium' },
      { y: this.getRandomInteger(10) + 1, color: '#ff3333', name: 'High' }

    ];

    let options = this.pieChartOptions(title, data);

    if (options.plotOptions?.pie) {
      options.plotOptions.pie.startAngle = -90;
      options.plotOptions.pie.endAngle = 90;
      options.plotOptions.pie.center = ['50%', '75%'];
      options.plotOptions.pie.size = '150%'
      options.plotOptions.pie.innerSize = 150;
      if (options.plotOptions.pie.dataLabels) {
        options.plotOptions.pie.dataLabels = { enabled:true, distance: 20 }
      }

    }
    return new Chart(options);
  }

  getGoalPieChart(title: string, completed: number, notCompleted: number): Chart {
    const pieChartDataList: PieChartData[] = [];
    pieChartDataList.push({ name: 'In Progress', color: '#bfbfbf', y: notCompleted });
    pieChartDataList.push({ name: 'Completed', color: '#006666', y: completed, sliced: true });
    return new Chart(this.pieChartOptions(title, pieChartDataList));
  }

  getDonutChart = (title: string): Chart => {
    const pieChartDataList: PieChartData[] = [];
    pieChartDataList.push({ name: 'In Progress', color: '#bfbfbf', y: this.getRandomInteger(100) });
    pieChartDataList.push({ name: 'Completed', color: '#006666', y: this.getRandomInteger(100) });

    let options = this.pieChartOptions(title, pieChartDataList);
    if (options.plotOptions?.pie) {
      options.plotOptions.pie.innerSize = 90;
    }
    return new Chart(options);
  }

  getRandomGoalChart = (title: string): Chart => {
    return this.getGoalPieChart(title, this.getRandomInteger(100), this.getRandomInteger(100));
  }

  pieChartOptions(title: string, pieChartDataList: any): Highcharts.Options {

    let options:Highcharts.Options = {
      chart: {
        type: 'pie', style: {
          float: 'left'
        }
      },
      title: {
        text: title,
        style: { fontWeight: 'bold' }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          innerSize: 0,
          allowPointSelect: false,
          cursor: 'pointer',
          showInLegend: false,
          borderColor: 'black',
          dataLabels: {
            enabled: true,
            distance: 5
          }
        }
      },
      series: [
        {
          type: 'pie' as any,
          name: '',
          data: pieChartDataList,
        }
      ]
    }

    return options
  }

  getBarChart = (title: string, data: any[], xAxisCategories: any[] = []): Chart => {

    Highcharts.setOptions({ lang: { thousandsSep: ',' } });

    const chartLocal = new Chart({
      // tooltip: { valueDecimals: 2, valuePrefix: '$', valueSuffix: ' USD' },
      chart: {
        type: 'bar',
        borderColor: 'red',
        className: "bar-chart"
      },
      title: {
        text: title.length > 0 ? title : undefined, // If you want the title text you need to set this
        style: { fontWeight: 'bold' }
      },
      xAxis: {
        categories: xAxisCategories,
        labels: {
          useHTML: true,
          align: 'left',
          x: 0,
          y: -25, /* to be adjusted according to number of bars*/
          style: {
            width: 350
          }
        }
      },
      yAxis: {
        title: undefined
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        bar: {
          borderColor: 'black',
          dataLabels: {
            enabled: false,
            // format: '${point.y:,.2f}',
            style: {
              fontWeight: 'bold',
              fontSize: '14px',
              color: 'black'
            }
          },
        }
      },
      series: [
        {
          type: 'bar' as any,
          name: '',
          data: data,
          dataLabels: {
            enabled: true // This will turn of the labels
          }
        }
      ]
    });

    return chartLocal;
  }

  getRandomBarChart(): Chart {
    const barChartData = [
      { y: this.getRandomInteger(10) + 1, color: '#ff3333', name: 'High' },
      { y: this.getRandomInteger(10) + 1, color: '#00b300' },
      { y: this.getRandomInteger(10) + 1, color: '#ffff33' }
    ];
    return this.getBarChart('Task Priority ', barChartData, ["High", "Medium", "Low"]);
  }

  getLineChart = (): any => {

    let chart = new Chart({
      chart: {
        type: 'spline',
      },
      title: {
        text: 'Task Priority'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      series: [
        {
          name: 'High',
          color: 'red',
          data: [10, 13, 14, 14, 17, 18, 17, 12, 14, 17, 15, 14]
        },
        {
          name: 'Medium',
          color: 'yellow',
          data: [8, 12, 17, 14, 17, 16, 14, 12, 14, 13, 15, 11]
        },
        {
          color: 'green',
          data: [11, 8, 14, 14, 9, 18, 10, 12, 14, 17, 15, 12]
        }
      ]
    } as any);

    return chart;
  }

  getRandomInteger(multiplier: number): number {
    let x = Math.random() * multiplier;
    return parseInt(x.toString());
  }

}