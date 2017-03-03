import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';

import {UserWrapper} from '../domain';
import {webServiceEndpoint} from '../commons';

import {PaginationPage, PaginationPropertySort} from '../pagination';

import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

@Injectable()
export class UserWrapperService {
	
	constructor(
		private http: Http) { }

	getAllUser(page: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<UserWrapper>> {
		console.log("getAllUser() method called");
        let params = new URLSearchParams();
        params.set('size', `${pageSize}`);
        params.set('page', `${page}`);
        if (sort != null) {
            params.set('sort', `${sort.property},${sort.direction}`);
        }

        let options = new RequestOptions({
            search: params
        });
        return this.http.get(`${webServiceEndpoint}/wrapperuser`, options).map(this.extractData).publish().refCount();
    }

    getAllPersonByCompanyId(id:number, page: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<UserWrapper>> {
		console.log("getAllUser() method called");
        let params = new URLSearchParams();
        params.set('size', `${pageSize}`);
        params.set('page', `${page}`);
        if (sort != null) {
            params.set('sort', `${sort.property},${sort.direction}`);
        }

        let options = new RequestOptions({
            search: params
        });
        return this.http.get(`${webServiceEndpoint}/wrapperuser/company/${id}`, options).map(this.extractData).publish().refCount();
    }

    getUser(id: number): Rx.Observable<UserWrapper> 
    {
    	console.log("getUser("+id+") method called");
        return this.http.get(`${webServiceEndpoint}/wrapperuser/${id}`).map(this.extractData).publish().refCount();
    }

	addUser(user: UserWrapper): Rx.Observable<Response>
	{
		console.log("addUser(user) method called");
		let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${webServiceEndpoint}/wrapperuser`,JSON.stringify(user),{headers: headers}).publish().refCount();
	}

	updateUser(user: UserWrapper): Rx.Observable<Response>
	{
		console.log("updateUser(user) method called");
		let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(`${webServiceEndpoint}/wrapperuser`, JSON.stringify(user),{headers: headers}).publish().refCount();
	}

	deleteUser(id: number): Rx.Observable<Response>
	{
		console.log("deleteUser(id) method called");
		 return this.http.delete(`${webServiceEndpoint}/wrapperuser/${id}`).publish().refCount();
	}

	private extractData(res: Response) 
	{
		let body = res.json();
		return body || {};
	}
}
