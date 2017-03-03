import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { Company } from '../domain';
import {webServiceEndpoint} from '../commons';

import {PaginationPage, PaginationPropertySort} from '../pagination';


import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

@Injectable()
export class CompanyService {

	constructor(private http: Http) { }

    getAllCompanies(): Rx.Observable<Array<Company>> 
    {
        return this.http.get(`${webServiceEndpoint}/company`).map(this.extractData).publish().refCount();
    }

    getCompany(id: number): Rx.Observable<Company> 
    {
        return this.http.get(`${webServiceEndpoint}/company/${id}`).map(this.extractData).publish();
    }

    addCompany(company: Company): Rx.Observable<Response>
    {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${webServiceEndpoint}/company`,JSON.stringify(company),{headers: headers}).publish().refCount();
    }

    updateCompany(company: Company): Rx.Observable<Response>
     {
         let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(`${webServiceEndpoint}/company`, JSON.stringify(company),{headers: headers}).publish().refCount();
    }

    deleteCompany(id: number): Rx.Observable<Response>
    {
        return this.http.delete(`${webServiceEndpoint}/company/${id}`).publish().refCount();
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
