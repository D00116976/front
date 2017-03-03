import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';

import {UserWrapperService} from '../service/user-wrapper.service';
import {DepartmentService} from '../service/department.service';
import {UserTypeService} from '../service/user-type.service';
import {PhoneService} from '../service/phone.service';
import {PersonService} from '../person.service';
import {User, PersonEntity, AuthenticatedUser, UserWrapper, UserType, Department, Company} from '../domain';
import {showLoading, hideLoading, doNothing} from '../commons'

@Component({
    selector: 'app-person-edit',
    templateUrl: './person-edit.component.html',
    styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

    @Input('userId') id:number;
    isPerson:boolean=false;
    isCompany:boolean=false;
    userWrapper:UserWrapper = null;
    companies:Array<Company>;
    dept:Array<Department>;
    userTypes:Array<UserType>;
    
    constructor(
        private router: Router, 
        private route: ActivatedRoute, 
        private userWrapperService: UserWrapperService,
        private departmentService: DepartmentService,
        private userTypeService: UserTypeService,
        private personService: PersonService
        ) {

    }

    ngOnChanges()
    {
        if(this.id!=null)
        {
            this.userWrapper = null;
            this.isPerson=false;
            this.isCompany = false;
            this.userWrapperService.getUser(this.id).subscribe(usr => this.userWrapper = usr);

            setTimeout(()=>{
                if(this.userWrapper.person)
                    this.isPerson=true;
                else
                    this.isCompany=true;
            },100);
        }
    }
    ngOnInit() {
        this.userTypeService.getAllUserTypes().subscribe(uts => this.userTypes = uts);
    }
    setDept(companyId)
    {
        this.departmentService.getDepartmentsByCompanyId(companyId).subscribe(departments => this.dept = departments);
    }
    update(){
        // this.userWrapperService.updatePerson(this.user)
        // .subscribe(
        //   data => {
            //     this.user = new WrapperUser();
            //   },
            //   error => console.log(error)
            // );
        }
    }
