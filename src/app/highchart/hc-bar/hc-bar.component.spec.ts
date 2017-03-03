/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HcBarComponent } from './hc-bar.component';

describe('HcBarComponent', () => {
  let component: HcBarComponent;
  let fixture: ComponentFixture<HcBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
