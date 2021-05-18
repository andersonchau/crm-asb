import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationService } from './authen/authentication.service';
import { User } from './authen/user';
import { Router } from '@angular/router';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    hasLoggedIn() : boolean {
        return this.authenticationService.hasLoggedIn();
        
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}