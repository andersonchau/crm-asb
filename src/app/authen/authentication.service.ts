import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from './user';
//import { userInfo } from 'node:os';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    // BehaviorSubject is a value + an observable : it always has an value , also can be subscribed ( as observable )
    // stored as credential by angular app 
    // ref : https://stackoverflow.com/questions/39494058/behaviorsubject-vs-observable
    private currentUserSubject: BehaviorSubject<User>;

    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')|| '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
    }


    public hasLoggedIn(): boolean {
        //console.log('hasLoggedIn() ' + this.currentUserSubject.value );
        if ( this.currentUserSubject.value && this.currentUserSubject.value.id > 0 ){
            return true;
        }
        return false;
    }

    public isLoggedInAsAdmin():boolean{
        // TODO : set it do id == 0 
        if ( this.currentUserSubject.value && this.currentUserSubject.value.id >= 0 ){
            return true;
        }
        return false;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        console.log('login: called ' + username + ' ' + password );
        // apiUrl should be put in environment.*.ts
        // What is the handling of login failure ? 
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                console.log('login: post return user ' + JSON.stringify(user));
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(User.getInvalidatedUser());
    }
}