import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';

import {UserWrapperService} from '../service/user-wrapper.service';
import {UserWrapper} from '../domain';
import {showLoading, hideLoading, doNothing} from '../commons'

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

    person: UserWrapper;

    constructor(private router: Router, private route: ActivatedRoute, private userWrapperService: UserWrapperService) {

    }

    ngOnInit() {}
    
     goToEdit(person)
    {
        this.router.navigate(['person_edit', person.id]);
    }

    delete(person) {
        let observable: Rx.Observable<Response> = this.userWrapperService.deleteUser(person.id);
        showLoading();
        observable.subscribe(doNothing, hideLoading, ()=> {
            this.router.navigate(['']);
            //hideLoading();
        });
    }

    back() {
        history.back();
    }
}
