import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {ChartsModule } from 'ng2-charts';
import {ChartModule } from 'angular2-highcharts';
import {DragulaModule }from 'ng2-dragula';
import { AlertModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/tabs';


import {AppComponent} from './app.component';
import {PersonComponent} from './person/person.component';
import {PersonListComponent} from './person-list/person-list.component';
import {TableElementsCountComponent} from './table-elements-count/table-elements-count.component';
import {TablePaginationComponent} from './table-pagination/table-pagination.component';
import {TableSortComponent} from './table-sort/table-sort.component';


import {PersonService} from './person.service';
import {UserService} from './service/user.service';
import {UserTypeService} from './service/user-type.service';
import {AuthenticatedUserService} from './service/authenticated-user.service';
import {UserWrapperService} from './service/user-wrapper.service';

import {PersonEditComponent} from './person-edit/person-edit.component';
import {PersonAddComponent} from './person-add/person-add.component';
import {AlertService} from './service/alert.service';
import {AuthenticationService} from './service/authentication.service';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {UserRegisterComponent} from './user-register/user-register.component';
import { ModalComponent } from './modal/modal.component';
import { HcPieComponent } from './highchart/hc-pie/hc-pie.component';
import { HcBarComponent } from './highchart/hc-bar/hc-bar.component';
import 'hammerjs';
import { AdministrationComponent } from './administration/administration.component';
import { ManageUsersComponent } from './administration/manage-users/manage-users.component';
import { EqualValidatorDirective } from './equal-validator.directive';
import { RolesComponent } from './administration/roles/roles.component';
import { UserAddComponent } from './administration/user-add/user-add.component';
import { PersonDetailsComponent } from './administration/person-details/person-details.component';

import { ProjectCreationComponent } from './project-creation/project-creation.component';
import { ProjectCreationAddComponent } from './project-creation/project-creation-add/project-creation-add.component';
import { ProjectCreationEditComponent } from './project-creation/project-creation-edit/project-creation-edit.component';
import { ProjectCreationDetailsComponent } from './project-creation/project-creation-details/project-creation-details.component';
import { ProjectCreationReportsComponent } from './project-creation/project-creation-reports/project-creation-reports.component';
import { ProjectCreationManageTeamsComponent } from './project-creation/project-creation-manage-teams/project-creation-manage-teams.component';
import { ProjectCreationManageProjectTeamsComponent } from './project-creation/project-creation-manage-project-teams/project-creation-manage-project-teams.component';
import { ProjectCreationManageScheduleComponent } from './project-creation/project-creation-manage-schedule/project-creation-manage-schedule.component';
import { ProjectCreationManageTasksComponent } from './project-creation/project-creation-manage-tasks/project-creation-manage-tasks.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { AddTimesheetComponent } from './timesheet/add-timesheet/add-timesheet.component';

const appRoutes: Routes = [
    {path: '', component: AdministrationComponent},
    {path: 'admin', component: AdministrationComponent},
    {path: 'project', component: ProjectCreationComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        PersonComponent,
        PersonListComponent,
        TableElementsCountComponent,
        TablePaginationComponent,
        TableSortComponent,
        PersonEditComponent,
        PersonAddComponent,
        RegisterComponent,
        LoginComponent,
        UserRegisterComponent,
        ModalComponent,
        HcPieComponent,
        HcBarComponent,
        AdministrationComponent,
        ManageUsersComponent,
        EqualValidatorDirective,
        RolesComponent,
        UserAddComponent,
        PersonDetailsComponent,
        ProjectCreationComponent,
        ProjectCreationAddComponent,
        ProjectCreationEditComponent,
        ProjectCreationDetailsComponent,
        ProjectCreationReportsComponent,
        ProjectCreationManageTeamsComponent,
        ProjectCreationManageProjectTeamsComponent,
        ProjectCreationManageScheduleComponent,
        ProjectCreationManageTasksComponent,
        TimesheetComponent,
        AddTimesheetComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        ChartsModule,
        ChartModule,
        DragulaModule,
        AlertModule.forRoot(),
        TabsModule.forRoot(), 
    ],
   
    providers: [
        PersonService, 
        UserService, 
        UserTypeService,
        AuthenticatedUserService,
        UserWrapperService,
        AuthenticationService, 
        AlertService,  
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
