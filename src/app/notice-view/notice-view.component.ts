import { Component, OnInit } from '@angular/core';
import {Notice} from '../model/notice';
import {NoticeService} from '../notice.service';
import {AuthenticationService} from '../authen/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notice-view',
  templateUrl: './notice-view.component.html',
  styleUrls: ['./notice-view.component.css']
})
export class NoticeViewComponent implements OnInit {

  noticeList$: Observable<Notice[]>;
  noticeService : NoticeService;
  authenService : AuthenticationService;

  constructor(noticeService : NoticeService,
    authenService : AuthenticationService ) { 
    this.noticeService = noticeService;
    this.authenService = authenService;
    
  }

  ngOnInit(): void {
    // TODO : 
    console.log('current user is is ' + this.authenService.currentUserValue );
    console.log('comanyId is ' + this.authenService.currentUserValue.companyId );
    this.noticeList$ = this.noticeService.getNoticeList(this.authenService.currentUserValue.companyId);
  }

}
