
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

  getBarChart = (title: string, data: any[], xAxisCategories: any[] = []): Chart => {

    // see https://stackoverflow.com/questions/42866870/highcharts-progress-bar-chart/42871005#42871005
    Highcharts.setOptions({ lang: { thousandsSep: ',' } });

    const chartLocal = new Chart({
      tooltip: { valueDecimals: 2, valuePrefix: '$', valueSuffix: ' USD' },
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
        enabled: false // This removed the legend
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,  // I don't think this is currently show, you turned off labels below
            format: '${point.y:,.2f}',
            style: {
              fontWeight: 'bold',
              fontSize: '14px',
              color: 'black'
            }
          },  // This is how you put 2 decimal points
        }
      },
      series: [
        {
          type: 'bar' as any,
          name: '',
          data,
          dataLabels: {
            enabled: false // This will turn of the labels
          }
        }
      ]
    });

    return chartLocal;
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
          dataLabels:{
            enabled:false,
            distance:0
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