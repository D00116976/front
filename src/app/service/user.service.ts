import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import {PaginationPage, PaginationPropertySort} from '../pagination';
import { User } from '../domain';
import {webServiceEndpoint} from '../commons';



import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAllUser(): Rx.Observable<Array<User>> {
        return this.http.get(`${webServiceEndpoint}/user`).map(this.extractData).publish().refCount();
    }

    getUser(id: number): Rx.Observable<User> 
    {
        return this.http.get(`${webServiceEndpoint}/user/${id}`).map(this.extractData).publish();
    }

    addUser(user: User): Rx.Observable<Response>
    {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${webServiceEndpoint}/user`,JSON.stringify(user),{headers: headers}).publish().refCount();
    }

    updateUser(user: User): Rx.Observable<Response>
     {
         let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(`${webServiceEndpoint}/user`, JSON.stringify(user),{headers: headers}).publish().refCount();
    }

    deleteUser(id: number): Rx.Observable<Response>
    {
        return this.http.delete(`${webServiceEndpoint}/user/${id}`).publish().refCount();
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}