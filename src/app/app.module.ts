import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';
import { fakeBackendProvider } from './authen/fake-backend'
import {JwtInterceptor} from './authen/jwt.interceptor'
import {ErrorInterceptor} from './authen/error.interceptor';
import { FileComponent } from './file/file.component';
import { FileExchangeComponent } from './file-exchange/file-exchange.component';
import { NoticeViewComponent } from './notice-view/notice-view.component';
import { IssueViewComponent } from './issue-view/issue-view.component';
import { MessageViewComponent } from './message-view/message-view.component';
import { CreateNoticeComponent } from './create-notice/create-notice.component'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FileComponent,
    FileExchangeComponent,
    NoticeViewComponent,
    IssueViewComponent,
    MessageViewComponent,
    CreateNoticeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        fakeBackendProvider ],
  bootstrap: [AppComponent]
})
export class AppModule { }
