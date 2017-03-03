import { Component, OnInit, Input } from '@angular/core';
import { ChartModule } from 'angular2-highcharts'; 

@Component({
  selector: 'app-hc-pie',
  templateUrl: './hc-pie.component.html',
  styleUrls: ['./hc-pie.component.css']
})
export class HcPieComponent implements OnInit {

	@Input('data') chartData:Array<any> = [{data: [0], label: ''}];
   	@Input('labels') chartLabels:Array<any> = [];
   	@Input('legend') chartLegend:boolean = false;

  
	options: Object;
    from: any;
    to: any;
    serieName:any;
    point: any;
    pieData: Array<any> = [];

  constructor() {

     	this.setPieData();
        this.options = {
            chart: {
              type: 'pie',
            },
            plotOptions: {
		        pie: {
		            allowPointSelect: true,
		            cursor: 'pointer',
		            dataLabels: {
		                enabled: true,
		                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
		            }
		        }
		    },
            title : { text : this.chartData[0].label },
            xAxis: {
                categories: this.chartLabels,
            },
            series: [{
              name : this.chartData[0].label,
                data: this.pieData,
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

setPieData()
{
	for(let i=0; i < this.chartData[0].data.length; i++)
	   	{
	   		this.pieData[i] = {
	   			name: this.chartLabels[i],
	   			y :this.chartData[0].data[i]
	   		};
	   	}
	   }
   refresh(){

     setTimeout(() => { 

     	this.setPieData();
       this.options = {
             chart: {
                  type: 'pie',
                },
              title : { text : this.chartData[0].label },
              series: [{
                name : this.chartData[0].label,
                  data: this.pieData
              }]
          };
        },800);
   }
}
