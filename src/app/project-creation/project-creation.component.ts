import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.css']
})
export class ProjectCreationComponent implements OnInit {
	tabIndex:number = 0;
	 public tabs: any[] = [
    {title: 'Reports', id: 0, content:''},
    {title: 'Add', id: 1, content:''},
    {title: 'Edit', id: 2, content:''},
    {title: 'Manage Task', id: 3, content:''},
    {title: 'Manage Teams', id: 4, content:''},
    {title: 'Manage Project Teams', id: 5, content:''},
    {title: 'Schedule', id: 6, content:''}
  ];
 
  public setActiveTab(): void {
  	console.log("changeTab");
    this.tabs[this.tabIndex].active = true;
  }
  constructor() { }

  ngOnInit() {
  	this.setActiveTab();
  }

}