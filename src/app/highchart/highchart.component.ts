import { Component, OnInit, Input } from '@angular/core';
import { ChartModule } from 'angular2-highcharts'; 

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.css']
})
export class HighchartComponent implements OnInit {



   @Input('data') chartData:Array<any> = [{data: [0,0,0,0,0], label: ''}];
   @Input('labels') chartLabels:Array<any> = [];
   @Input('type') chartType:string = "bar";
   @Input('legend') chartLegend:boolean = false;



options: Object;
    from: any;
    to: any;
    serieName:any;
    point: any;


//line or bar
  constructor() {
        this.options = {
            chart: {
              type: this.chartType,
            },
            title : { text : this.chartData[0].label },
            xAxis: {
                categories: this.chartLabels,
            },
            series: [{
              name : this.chartData[0].label,
                data: this.chartData[0].data,
            }]
        };
    }
    
    
    onChartSelection (e) {
	  	this.from = e.originalEvent.xAxis[0].min.toFixed(2);
	  	this.to = e.originalEvent.xAxis[0].max.toFixed(2);
	}

	onSeriesMouseOver (e) {
	  this.serieName = e.context.name;
	}

	onPointSelect (e) {
	  this.point = e.context.name;
	}

  ngOnInit() {
  }

   refresh(){
     setTimeout(() => { 
       this.options = {
             chart: {
                  type: this.chartType,
                },
              title : { text : this.chartData[0].label },
              xAxis: {
                  categories: this.chartLabels,
              },
              series: [{
                name : this.chartData[0].label,
                  data: this.chartData[0].data,
              }]
          };
        },800);
   }
}
