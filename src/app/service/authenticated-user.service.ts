import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { AuthenticatedUser } from '../domain';
import {webServiceEndpoint} from '../commons';

import {PaginationPage, PaginationPropertySort} from '../pagination';


import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

@Injectable()
export class AuthenticatedUserService {

	constructor(private http: Http) { }

    getAll(page: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<AuthenticatedUser>> {
        let params = new URLSearchParams();
        params.set('size', `${pageSize}`);
        params.set('page', `${page}`);
        if (sort != null) {
            params.set('sort', `${sort.property},${sort.direction}`);
        }

        let options = new RequestOptions({
            search: params
        });
        return this.http.get(`${webServiceEndpoint}/authuser`, options).map(this.extractData).publish().refCount();
    }

    getAuthUser(id: number): Rx.Observable<AuthenticatedUser> 
    {
        return this.http.get(`${webServiceEndpoint}/authuser/${id}`).map(this.extractData).publish();
    }

    addAuthUser(user: AuthenticatedUser): Rx.Observable<Response>
    {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${webServiceEndpoint}/authuser`,JSON.stringify(user),{headers: headers}).publish().refCount();
    }

    updateAuthUser(user: AuthenticatedUser): Rx.Observable<Response>
    {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(`${webServiceEndpoint}/authuser`, JSON.stringify(user),{headers: headers}).publish().refCount();
    }

    deleteAuthUser(id: number): Rx.Observable<Response>
    {
        return this.http.delete(`${webServiceEndpoint}/authuser/${id}`).publish().refCount();
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
