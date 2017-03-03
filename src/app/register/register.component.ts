import {Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import * as Rx from 'rxjs/Rx';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';
import {showLoading, hideLoading, doNothing} from '../commons'
import {User} from '../user/user.component';

@Component({
    moduleId: module.id,
    selector: 'app-user',
    templateUrl: './register.component.html'
})

export class RegisterComponent{
    //model: any = {};
    loading = false;
    user: User = new User();
    //users: User[] = [];



    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }
  

    register() {
        console.log("REGISTER CALLED");
        this.loading = true;
        // this.userService.create(this.user)
        //     .subscribe(
        //         data => {
        //             //this.user = new User();
        //             this.alertService.success('Registration successful', true);
        //             this.router.navigate(['/login']);
        //             console.log("PASS");
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //             console.log("FAIL");
        //         });
            
    }

}