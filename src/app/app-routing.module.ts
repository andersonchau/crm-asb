import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent } from './home/home.component';
import {LoginComponent } from './login/login.component';
import {AuthGuard} from './authen/auth.guard';
import {FileExchangeComponent} from './file-exchange/file-exchange.component';
import {NoticeViewComponent} from './notice-view/notice-view.component';
import {IssueViewComponent} from './issue-view/issue-view.component';
import {MessageViewComponent} from './message-view/message-view.component';
import {CreateNoticeComponent} from './create-notice/create-notice.component';
import { from } from 'rxjs';

// Explanation : 
// (1) '/' -> HomeComponent , but checked by AuthGuard to see if can really enter
// (2) AuthGuard has logic if not eligible -> navigate to /login => LoginComponenet 
// (3) ** means if no match => redirecto '' -> first rule. 
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'noticeView', component: NoticeViewComponent, canActivate: [AuthGuard] },
  { path: 'fileExchange', component: FileExchangeComponent, canActivate: [AuthGuard] },
  { path: 'issueView', component: IssueViewComponent, canActivate: [AuthGuard] },
  { path: 'messageView', component: MessageViewComponent, canActivate: [AuthGuard] },
  { path: 'noticeCreate', component: CreateNoticeComponent, canActivate: [AuthGuard] },
  
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
