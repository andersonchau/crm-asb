import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators,AbstractControl, ValidationErrors, ValidatorFn  } from '@angular/forms';
import { Notice } from '../model/notice';
import {NoticeService} from '../notice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-notice',
  templateUrl: './create-notice.component.html',
  styleUrls: ['./create-notice.component.css']
})
export class CreateNoticeComponent implements OnInit {
  // demonstration of reactive form 
  // Title/Content/importance/company(dropdown)
  
  // Assume we got this from API , but async ? 
  companyList = [{'id':1, 'name':'First Client company'}, {'id':2, 'name': 'Second Client Company'}];
  
  public getCompanyName(companyId:number) : string{
    for(let company of this.companyList ){
      if (company.id == companyId) return company.name;
    }
    return '';
  }

  public getCompanyIdList() : Array<Number> {
    var companies : Array<Number> = [];
    for(let company of this.companyList ){
      companies.push(company.id);
    }
    return companies;

  }

  createNoticeForm = this.fb.group({
    title : ['', [Validators.required]],  // first param is default value, Validators.required is the built-in validator
    content : ['',[ Validators.required,this.myCustomValidator(10)]], // 
    company :  ['', [Validators.required]]
  });
  // ValidationErrors is an type alias for { [key: string]: boolean }

   myCustomValidator(shortestLen:number): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      var val: string = control.value || '' ;
      //if (control.value == undefined || (isNaN(control.value)) {
        // Another meaning ? 
               //  return {'isEmpty':true};
     //}
     console.log('myCustomValidator : ' + val);
      if (val.length > 0 &&  val.length < shortestLen ){
         return {'lengthTooShort':true}; 
      }
      
      return null;
      
    }
  }
  constructor(private fb: FormBuilder,
             private noticeService :NoticeService,
             private router: Router ) { 
    
  }

  myContent : string = '';
  get content(){
    return this.createNoticeForm.controls.content;
  }
  // TODO : 
  onSubmit(){
    if(this.createNoticeForm.valid) {
    console.log('going to call noticeService->createNewNotice()');
    this.noticeService.createNewNotice(this.createNoticeForm.get('title')!.value , 
                                       this.createNoticeForm.get('content')!.value,1  ).subscribe(
                                         data =>{
                                           console.log('createNewNotice return result ' + data );
                                           if ( data == 1 ){
                                              this.router.navigate(['/noticeView']); 
                                           } else {
                                              console.log('failure in creating notice');
                                           }
                                         },
                                         error => console.log('Create notice failure , other error', error)
                                       );
    } else {
      console.log('create from not valid!');
    }
    
    

  }
  
  
  ngOnInit(): void {
   
  }

  

}
