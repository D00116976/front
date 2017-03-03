/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement,NgModule } from '@angular/core';
import { DragulaModule }from 'ng2-dragula';

import { FormsModule } from '@angular/forms';
import { TableSortComponent } from '../table-sort/table-sort.component';
import { PersonListComponent } from './person-list.component';
import { TablePaginationComponent } from '../table-pagination/table-pagination.component';
import { ReportSheetComponent } from '../report-sheet/report-sheet.component';
import { ChartComponent } from '../chart/chart.component';
import { HighchartComponent } from '../highchart/highchart.component';
import { GooglePieChartComponent } from '../google-pie-chart/google-pie-chart.component';


describe('PersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports :[ 
        DragulaModule,
        FormsModule 
      ],
      declarations: [ 
        PersonListComponent,
        TableSortComponent,
        TablePaginationComponent,
        ReportSheetComponent,
        ChartComponent,
        HighchartComponent,
        GooglePieChartComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
