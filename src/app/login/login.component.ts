

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';

import {  AuthenticationService } from '../authen/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }

        this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
    // ref : https://yating00000.github.io/post/angular/route-param/
    // e.g.  http://somewhere/heroes?returnUrl=1 
    // this.route.snapshot.queryParams['returnUrl']  == 1 
    // 
    // e.g. http://somewhere/heroes/5?paramA=1&paramB=6542
    // this.activatedRoute.snapshot.params = {type: "heroes", id: "5"}
    // 
    // e.g. this.router.navigate(['/products'], { queryParams: { order: 'popular', 'price-range': 'not-cheap' } });
    // =>http://localhost:4200/products?order=popular&price-range=not-cheap
    // this.route.snapshot.queryParams['order']  == popular
    // 
    // routerlink passing parameters : <a [routerLink]="['products']" [queryParams]="{ id: 101 }">Prodcuts</a> 
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
       // this is to enter /xxx/xxxx directory or just to '/'  
    }

    ngOnInit() {
       
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    //this.alertService.error(error);
                    console.log('alert : login error!');
                    this.loading = false;
                });
    }

  
     

}