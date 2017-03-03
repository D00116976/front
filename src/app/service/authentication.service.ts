import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import {webServiceEndpoint} from '../commons';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.get(`${webServiceEndpoint}/user/login/${username}`)
            .map(this.extractData);
        }

    logout() {
        localStorage.removeItem('currentUser');
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
