import { Component, OnInit } from '@angular/core';
import { Role } from '../../domain';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {


    editable : boolean;
    isChanged : boolean;
    isAdd : boolean;
    isReordered : boolean;
    role : Role = new Role();
    pageListSize : number;
    updated : number;
  constructor() { }

  ngOnInit() {
    this.editable = false;
    this.isAdd = false;
    this.isReordered = false;
    this.isChanged = false;

    this.role.id = 1;
    this.role.systemAccess = true;
    this.role.ROLE_BRANDT_ENG = true;
    this.role.ROLE_BRANDT_PM = false;
    this.role.ROLE_BRANDT_ADMIN = false;
    this.role.ROLE_CLIENT = true;
    this.role.ROLE_SUPPLIER = false;
  }

  toggleEditable(bool : boolean)
    {
        console.log(bool);
        if(bool)
            this.editable = true; 
        else
            this.editable = false;   
    }
}