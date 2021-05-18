import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import {Notice} from './model/notice';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private http: HttpClient) { }

  getNoticeList(companyId: number) : Observable<Notice[]> {
    //const body = "{}";
    //const body= {testing:'abc'}; // this is the POST body.
        // TODO : handle error case  
        // <any> denote the return type, 
        return this.http.get<any>(`${environment.apiUrl}/notices/`+companyId)
            .pipe(map( apiResponse => {
                console.log('/notice API returns ' + JSON.stringify(apiResponse) );
                return apiResponse.data; // "data field" match type Notice[] 
            }));
  }
  
  createNewNotice(title:string, content:string, companyId:number): Observable<Number>{
    // this time we use form-data instead of JSON 
    var formData: any = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    /*
    this.http.post('http://localhost:4000/api/create-user', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    */
    return this.http.post<any>(`${environment.apiUrl}/notice/`+companyId,formData)
            .pipe(map( apiResponse => {
                console.log('POST /notice API returns ' + JSON.stringify(apiResponse) );
                return apiResponse.status;
            }));
  }
}
