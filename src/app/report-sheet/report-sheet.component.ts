import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {ChartService} from '../service/chart.service';
import {HcPieComponent} from '../highchart/hc-pie/hc-pie.component';
import {HcBarComponent} from '../highchart/hc-bar/hc-bar.component';

@Component({
  selector: 'app-report-sheet',
  templateUrl: './report-sheet.component.html',
  styleUrls: ['./report-sheet.component.css']
})
export class ReportSheetComponent implements OnInit {


    @ViewChild(HcPieComponent) hcPie:HcPieComponent;
    @ViewChild(HcBarComponent) hcBar:HcBarComponent;

	@Input('tableData') tableData:Array<any>=[];
	@Input('tableSize') tableSize:number =10;
    chartData : Array<any>;
    chartLabels : Array<any>;
    chartType : string;
    locationData : Array<any>;
    locationLabels : Array<any>;
    ageLocationData : Array<any>;




  	constructor(private chartService: ChartService) { }

  	ngOnInit() {
        this.chartData = [
            {data: [0,0,0,0,0], label: 'Age'},
          ];
        this.chartLabels = [];
        this.chartType = 'bar';
        this.locationData =[
            {data: [0,0,0,0,0], label: 'Location'},
          ];
        this.locationLabels =[];
        this.ageLocationData =[
            {data: [0,0,0,0,0], label: 'AgeByLocation'},
          ];
        this.updateCharts();
  	}

  	updateCharts()
    {
        this.updateAgeChart();
        this.updateLocationChart();
        //this.updateAgeLocationChart();
        this.hcPie.refresh();
        this.hcBar.refresh();
    }

    updateAgeChart()
    {
        let _chartData:Array<any> = new Array(this.tableSize);
        let _chartLabels:Array<any> = new Array(this.tableSize);
        setTimeout(() => { 

            let ages: number[] = [];
            let i = 0;
            for(let p of this.tableData)
            {
                ages[i]=p.age;
                _chartLabels[i]=p.firstname;
                i++;
            }
            _chartData = [
                {data: ages, label: 'Age'},
            ];
            this.chartData = _chartData;
            this.chartLabels = _chartLabels;
        }, 800);
    }

    updateLocationChart()
    {
        setTimeout(() => {  
            let locationArray: string[] = [];
            let i=0;
            for(let p of this.tableData)
            {
                locationArray[i] = p.location;
                i++;
            }
            let result = this.chartService.dataCount(locationArray);
            this.locationLabels=result[0];
            this.locationData =[ 
                {data: result[1], label:'Location'},
            ];
        }, 600);
    }

    updateAgeLocationChart()
    {
        setTimeout(() => {  
            let locationArray: string[] = [];
            let ages: number[] = [];
            let i=0;
            for(let p of this.tableData)
            {
                locationArray[i] = p.location;
                ages[i] = p.age;
                i++;
            }
            let temp = [locationArray,ages];
            let res = this.chartService.dataCount(locationArray);
            let result = this.chartService.dataCount2(res, temp);
            this.locationLabels=result[0];
            this.ageLocationData =[ 
                {data: result[1], label:'AgeByLocation'},
            ];
        }, 600);
    }
}
