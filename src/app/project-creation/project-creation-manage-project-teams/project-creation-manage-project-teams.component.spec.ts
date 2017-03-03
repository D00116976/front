/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProjectCreationManageProjectTeamsComponent } from './project-creation-manage-project-teams.component';

describe('ProjectCreationManageProjectTeamsComponent', () => {
  let component: ProjectCreationManageProjectTeamsComponent;
  let fixture: ComponentFixture<ProjectCreationManageProjectTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCreationManageProjectTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreationManageProjectTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
