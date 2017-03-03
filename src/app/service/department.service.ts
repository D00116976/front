import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { Department } from '../domain';
import {webServiceEndpoint} from '../commons';
import {PaginationPage, PaginationPropertySort} from '../pagination';
import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
@Injectable()
export class DepartmentService {

	constructor(private http: Http) { }

    getAllDepartments(): Rx.Observable<Array<Department>> {
        
        return this.http.get(`${webServiceEndpoint}/department`).map(this.extractData).publish().refCount();
    }

    getDepartmentsByCompanyId(id: number): Rx.Observable<Array<Department>> {
        
        return this.http.get(`${webServiceEndpoint}/department/companyid/${id}`).map(this.extractData).publish().refCount();
    }

    getDepartment(id: number): Rx.Observable<Department> 
    {
        return this.http.get(`${webServiceEndpoint}/department/${id}`).map(this.extractData).publish();
    }

    addDepartment(dept: Department): Rx.Observable<Response>
    {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${webServiceEndpoint}/department`,JSON.stringify(dept),{headers: headers}).publish().refCount();
    }

    updateDepartment(dept: Department): Rx.Observable<Response>
     {
         let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(`${webServiceEndpoint}/department`, JSON.stringify(dept),{headers: headers}).publish().refCount();
    }

    deleteDepartment(id: number): Rx.Observable<Response>
    {
        return this.http.delete(`${webServiceEndpoint}/department/${id}`).publish().refCount();
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
