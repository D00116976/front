/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HcPieComponent } from './hc-pie.component';

describe('HcPieComponent', () => {
  let component: HcPieComponent;
  let fixture: ComponentFixture<HcPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
