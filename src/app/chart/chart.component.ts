import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {


   @Input('data') chartData:Array<any> = [{data: [0,0,0,0,0], label: 'TEST'}];
   @Input('labels') chartLabels:Array<any> = [];
   @Input('type') chartType:string = "bar";
   @Input('legend') chartLegend:boolean = false;
   @Input('chartTypePicker') chartTypePicker: boolean = false;

  public chartOptions:any = {
    responsive: true,
    scales: {
        yAxes: [{
            display: true,
            ticks: {
                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true   // minimum value will be 0.
            }
        }]
    }
  };

  public chartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#888',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
 
  // events
  public chartClicked(e:any):void {
    //console.log(e);
    //this.chartData = this.chartData.slice();
  }
 
  public chartHovered(e:any):void {

  }

  legendToggle()
  {
    this.chartLegend = !this.chartLegend;
  }

  refresh()
  {
      console.log("UpdateCharts");
  }
}


