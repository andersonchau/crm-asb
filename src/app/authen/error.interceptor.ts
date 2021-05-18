import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
///sdfsdf
// note all interceptors has to be registered in app.module.ts
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}
    // This interception handle any error generated in HTTP level 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // HTTP code : 401 (Unauthorized : caused by authen error, e.g. token not recognized )
        // HTTP coce : 403 (Forbiddened : I know who you are, but you are not permitted to access this resource )
        // https://www.learnrxjs.io/learn-rxjs/operators/error_handling/catch

        return next.handle(request).pipe(catchError(err => {
            console.log('HTTP error found : ' + err.status );
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            } else {
                // TODO: handle it here 
                console.log('HTTP error found : ' + err.status );
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}