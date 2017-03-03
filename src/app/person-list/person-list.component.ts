import {Component, OnInit, ViewChild} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import * as Rx from 'rxjs/Rx';

import 'rxjs/add/operator/switchMap';

import {PaginationPage, PaginationPropertySort} from '../pagination';
import {Table} from '../table';
import {showLoading, hideLoading, doNothing} from '../commons';
import {UserWrapperService} from '../service/user-wrapper.service';
import {DepartmentService} from '../service/department.service';
import {CompanyService} from '../service/company.service';
import {UserTypeService} from '../service/user-type.service';

import {User, Person, PersonEntity, Company, Department, UserType, UserWrapper} from '../domain';
import {ReportSheetComponent} from '../report-sheet/report-sheet.component';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css'],
})
export class PersonListComponent implements OnInit, Table<UserWrapper> {

    @ViewChild(ReportSheetComponent) childcmp:ReportSheetComponent;

    updateCharts(){
        //console.log("updateCharts");
        //this.childcmp.updateCharts();
    }

    // personPage : PaginationPage<Person>;
    // self : Table<Person>;
    personPage : PaginationPage<UserWrapper>;
    self : Table<UserWrapper>;
    editable : boolean;
    isChanged : boolean;
    isAdd : boolean;
    isReordered : boolean;
    isMinimized : boolean =false;
    newPerson : UserWrapper = new UserWrapper();
    viewId:number =null;
    newCompany : UserWrapper = new UserWrapper();
    currentPerson : UserWrapper = new UserWrapper();
    pageListSize : number;
    updated : number;

    personHeaders = ['id','forename','familyName','jobTitle','company','department','userType','userComment','username','userPassword'];
    
    companies : Array<Company>;
    depts : Array<Department>;
    newDept : Array<Department>;
    userTypes : Array<UserType>;
    
    initUsers()
    {
        this.newPerson.user = new User();
        this.newPerson.user.userType = new UserType();
        this.newPerson.person = new PersonEntity();
        this.newPerson.person.department = new Department();
        this.newPerson.person.department.company = new Company();
        this.newPerson.company = new Company();
        this.newCompany.user = new User();
        this.newCompany.user.userType = new UserType();
        this.newCompany.person = new PersonEntity();
        this.newCompany.person.department = new Department();
        this.newCompany.person.department.company = new Company();
        this.newCompany.company = new Company();
        this.currentPerson.user = new User();
        this.currentPerson.user.userType = new UserType();
        this.currentPerson.person = new PersonEntity();
        this.currentPerson.person.department = new Department();
        this.currentPerson.person.department.company = new Company();
        this.currentPerson.company = new Company();
    }
    debug()
    {
        console.log("All Users on page:");
        console.log(this.personPage);
        console.log("All Companies:");
        console.log(this.companies);
        console.log("All Departments:");
        console.log(this.depts);
        console.log("All UserTypes:");
        console.log(this.userTypes);
    }
    debugDep(event)
    {
        console.log(event);
    }
    setDept(event)
    {
        console.log(event);
        this.departmentService.getDepartmentsByCompanyId(event.id).subscribe(departments => this.depts = departments);
       for(let d of this.depts)
       {
           console.log("* "+d.name);
       }
    }

    getDepts(company) : Array<Department>
    {
        let departs : Array<Department> = [];
        for(let i=0; company.length; i++)
            this.departmentService.getDepartment(company[i]).subscribe(departments => departs[i] = departments);
        return departs;
    }
    
    setNewDept(event)
    {
        this.departmentService.getDepartmentsByCompanyId(event.id).subscribe(departments => this.newDept = departments);
    }

    constructor(
        private userWrapperService: UserWrapperService,
        private departmentService: DepartmentService, 
        private companyService: CompanyService, 
        private userTypeService : UserTypeService,
        private router: Router,
        private dragulaService: DragulaService
        ) {
        dragulaService.setOptions('row-one', {
            moves: function (el, container, handle) {
                return handle.className === 'handle';
            }
        });
    }

    ngOnInit() {
        this.initUsers();
        console.log("Person-List Loading");
        this.pageListSize = 10;
        
        let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, this.pageListSize, null);
        showLoading();
        observable.subscribe(doNothing, hideLoading, hideLoading);

        this.companyService.getAllCompanies().subscribe(companies => this.companies = companies);
        this.departmentService.getAllDepartments().subscribe(departments => this.depts = departments);
        this.userTypeService.getAllUserTypes().subscribe(userTypes => this.userTypes = userTypes);
        this.self = this;
        this.editable = false;
        this.isChanged = false;
        this.isAdd = false;
        this.isReordered = false;
        this.updated = 0;
    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<UserWrapper>> {
        let observable: Rx.Observable<PaginationPage<UserWrapper>> = this.userWrapperService.getAllUser(pageNumber, pageSize, sort);
        observable.subscribe(personPage => this.personPage = personPage);
        
        return observable;
    }

        fetchPageEmloyee(companyId:number, pageNumber: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<UserWrapper>> {
        let observable: Rx.Observable<PaginationPage<UserWrapper>> = this.userWrapperService.getAllUser(pageNumber, pageSize, sort);
        observable.subscribe(personPage => this.personPage = personPage);
        
        return observable;
    }

    add(){
        this.userWrapperService.addUser(this.newPerson).subscribe(
            data => {
                this.newPerson = new UserWrapper();
            },
            error => console.log(error));
        this.isAdd=false;
        let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, this.pageListSize, null);
        showLoading();
        observable.subscribe(doNothing, hideLoading, hideLoading);
    }

    goToDetails(person) {
        this.router.navigate(['person', person.id]);
    }

     goToEdit(person)
    {
        this.router.navigate(['person_edit', person.id]);
    }

    goToAdd()
    {
        this.router.navigate(['person_add']);
    }

    checkIfChange(id, person)
    {
        if(id.classList.contains('ng-dirty'))
        {
            this.isChanged=true;
            person.changed=true;
        }
    }

    toggleEditable(bool : boolean)
    {
        console.log(bool);
        if(bool)
        {
            this.editable = true;
        }
        else
            this.editable = false;   
    }

    checkForUpdate()
    {
        this.updated=0;
        for(let p of this.personPage.content)
        {
            if(p.changed == true)
            {
                this.updated++;
                this.update(p);
                p.changed = false;
            }
            
        }
        this.isChanged=false;
        this.editable=false;
        this.fetchPage(0, this.pageListSize, null);
    }

    update(user){

        this.userWrapperService.updateUser(user)
        .subscribe(
          data => {
            user = new UserWrapper();
          },
          error => console.log(error)
        );
        this.router.navigate(['']);
    }

    deleteAll()
    {
        for(let p of this.personPage.content)
        {
            this.delete(p);
        }
    }

    delete(user) {
        let observable: Rx.Observable<Response> = this.userWrapperService.deleteUser(user.user.id);
        showLoading();
        observable.switchMap(() => {
            return this.fetchPage(0, this.pageListSize, null);
        }).subscribe(doNothing, hideLoading, hideLoading);
    }

    
}
