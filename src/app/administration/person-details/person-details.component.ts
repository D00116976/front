import { Component, OnInit, Input } from '@angular/core';
import {UserWrapperService} from '../../service/user-wrapper.service';
import {DepartmentService} from '../../service/department.service';
import {UserTypeService} from '../../service/user-type.service';
import {PersonService} from '../../person.service';
import {User, PersonEntity, AuthenticatedUser, UserWrapper, UserType, Department, Company} from '../../domain';
@Component({
	selector: 'app-person-details',
	templateUrl: './person-details.component.html',
	styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

	@Input('user') userWrapper:UserWrapper=null;
	companies : Array<Company>;
	depts : Array<Department>;
	userTypes : Array<UserType>;
	constructor() { }

	ngOnInit() {
	}

}
