import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Response} from '@angular/http';
import { FormsModule } from '@angular/forms';
import * as Rx from 'rxjs/Rx';

import {UserWrapperService} from '../service/user-wrapper.service';
import {CompanyService} from '../service/company.service';
import {DepartmentService} from '../service/department.service';
import {UserTypeService} from '../service/user-type.service';
import {User,PersonEntity,UserWrapper, Company,Department,UserType,AuthenticatedUser} from '../domain';
//import {Person} from '../domain';
import {showLoading, hideLoading, doNothing} from '../commons'

@Component({
    selector: 'app-person-add',
    templateUrl: './person-add.component.html',
    styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {
    @Output() tabChanged = new EventEmitter();
    @Input('tabIndex') tabIndex:number;
    @Input('editable') editable: boolean = false;
    user: UserWrapper = new UserWrapper();
    isAdd : boolean;

    companies : Array<Company>;
    depts : Array<Department>;
    newDept : Array<Department>;
    userTypes : Array<UserType>;
    
    debug(){
        console.log(this.depts);
        console.log(this.companies);
        console.log(this.user);
    }
    
    add(){
        this.userWrapperService.addUser(this.user).subscribe(
            data => {
                this.user = new UserWrapper();
                this.initUser();
            },
            error => console.log(error));
        this.isAdd=false;
        this.tabIndex=0;
        this.tabChanged.emit()
    }

    constructor(
        private router: Router, 
        private route: ActivatedRoute, 
        private userWrapperService: UserWrapperService,
        private companyService : CompanyService,
        private departmentService : DepartmentService,
        private userTypeService : UserTypeService
        ) {
        
    }
    ngOnInit() {
        this.initUser();
        this.companyService.getAllCompanies().subscribe(companies => this.companies = companies);
        this.departmentService.getAllDepartments().subscribe(departments => this.depts = departments);
        this.userTypeService.getAllUserTypes().subscribe(userTypes => this.userTypes = userTypes);
        this.isAdd = false;
    }

    initUser()
    {
        this.user.user = new User();
        this.user.authUser = new AuthenticatedUser();
        this.user.user.userType = new UserType();
        this.user.person = new PersonEntity();
        this.user.person.department = new Department();
        this.user.person.department.company = new Company();
        this.user.company = null;
    }

    setDept(event)
    {
        this.departmentService.getDepartmentsByCompanyId(event.id).subscribe(departments => this.depts = departments);
    }

    setName(name)
    {
        this.user.user.name=name;
    }
}