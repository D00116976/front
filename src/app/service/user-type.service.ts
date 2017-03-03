import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserType } from '../domain';
import {webServiceEndpoint} from '../commons';

import {PaginationPage, PaginationPropertySort} from '../pagination';

import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

@Injectable()
export class UserTypeService {

	constructor(private http: Http) { }

    getAllUserTypes(): Rx.Observable<Array<UserType>> {
        
        return this.http.get(`${webServiceEndpoint}/usertype`).map(this.extractData).publish().refCount();
    }

    getAll(page: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<UserType>> {
        let params = new URLSearchParams();
        params.set('size', `${pageSize}`);
        params.set('page', `${page}`);
        if (sort != null) {
            params.set('sort', `${sort.property},${sort.direction}`);
        }

        let options = new RequestOptions({
            search: params
        });
        return this.http.get(`${webServiceEndpoint}/usertype`, options).map(this.extractData).publish().refCount();
    }

    getUserType(id: number): Rx.Observable<UserType> 
    {
        return this.http.get(`${webServiceEndpoint}/usertype/${id}`).map(this.extractData).publish();
    }

    addUserType(user: UserType): Rx.Observable<Response>
    {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${webServiceEndpoint}/usertype`,JSON.stringify(user),{headers: headers}).publish().refCount();
    }

    updateUserType(user: UserType): Rx.Observable<Response>
     {
         let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(`${webServiceEndpoint}/usertype`, JSON.stringify(user),{headers: headers}).publish().refCount();
    }

    deleteUserType(id: number): Rx.Observable<Response>
    {
        return this.http.delete(`${webServiceEndpoint}/usertype/${id}`).publish().refCount();
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
