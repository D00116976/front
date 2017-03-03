import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
	tabIndex:number = 0;
	 public tabs: any[] = [
    {title: 'Manage Users', id: 0, content:''},
    {title: 'Add User', id: 1, content:''},
    {title: 'Manage Rate Cards', id: 2, content:''},
    {title: 'Add Rate Card', id: 3, content:''},
    {title: 'Bank Reconciliation', id: 4, content:''},
    {title: 'Visa Reconciliation', id: 5, content:''},
    {title: 'Supplier Search', id: 6, content:''}
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