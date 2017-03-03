/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {ChartsModule } from 'ng2-charts';
import {ChartModule } from 'angular2-highcharts';
import {ChartService} from '../service/chart.service';

import { ChartComponent } from '../chart/chart.component';
import { ReportSheetComponent } from './report-sheet.component';

describe('ReportSheetComponent', () => {
  let component: ReportSheetComponent;
  let fixture: ComponentFixture<ReportSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartsModule, ChartModule],
      declarations: [ ReportSheetComponent, ChartComponent ],
      providers: [ChartService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
