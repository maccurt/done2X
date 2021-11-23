
import { Injectable } from '@angular/core';
import { Chart } from 'angular-highcharts';
//TODO is this blowing up the package check
import * as Highcharts from 'highcharts';
import { PieChartData } from './pie-chart-date-type';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceDone2x {

  constructor() { }

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
          color:'red',
          data: [10, 13, 14, 14, 17, 18, 17, 12, 14, 17, 15, 14]
        },
        {
          name: 'Medium',
          color:'yellow',
          data: [8, 12, 17, 14, 17, 16, 14, 12, 14, 13, 15, 11]
        },
        {
          color:'green',
          data: [11, 8, 14, 14, 9, 18, 10, 12, 14, 17, 15, 12]
        }
      ]
    } as any);

    return chart;
  }

  getBarChart = (title: string, data: any[], xAxisCategories: any[] = []): Chart => {

    Highcharts.setOptions({ lang: { thousandsSep: ',' } });

    const chartLocal = new Chart({
      // tooltip: { valueDecimals: 2, valuePrefix: '$', valueSuffix: ' USD' },
      chart: {
        type: 'bar',
        borderColor: 'red'
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
            enabled: true,  // I don't think this is currently show, you turned off labels below
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
            enabled: false // This will turn of the labels
          }
        }
      ]
    });

    return chartLocal;
  }


  getGoalPieChart = (): Chart => {

    let pieChartDataList: PieChartData[] = [];

    pieChartDataList.push({ name: 'In Progress', color: '#bfbfbf', y: 100 });
    pieChartDataList.push({ name: 'Completed', color: '#006666', y: 150, sliced: true });
    // pieChartDataList.push({ name: 'Low', color: '#009999', y: 100 });    
    // pieChartDataList.push({ name: 'High', color: '#999966', y: 100 });

    const chartLocal = new Chart({
      chart: {
        type: 'pie',
        style: {
          float: 'left'
        }
      },
      title: {
        text: 'Goals',
        style: { fontWeight: 'bold' }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          // innerSize: 150,
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
    });

    return chartLocal

  }

  getPieChart = (title: string, data: PieChartData[]): Chart => {

    //TODO What was the purpose of this? name it so you makes sense
    //I assume it is removing anything that is not greater than zero?
    let dataSanitized = data.filter((d) => {
      return d.y > 0;
    })

    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });

    const chartLocal = new Chart({

      //TODO Fix the tool tip you are not showing money here
      // tooltip: { valueDecimals: 2, valuePrefix: '$', valueSuffix: ' USD' },
      chart: {
        type: 'pie'
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
          // innerSize:90,  //This will make it an donut
          allowPointSelect: true,
          cursor: 'pointer',
          showInLegend: false,
          dataLabels: {
            enabled: false,
            distance: 0
          }
          // dataLabels: {
          //   enabled: true,
          //   format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          // }
        }
      },
      series: [
        {
          type: 'pie' as any,
          name: '',
          data: dataSanitized,
        }
      ]
    });

    return chartLocal;
  }
}