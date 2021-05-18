import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Document} from '../document';

@NgModule({
  declarations: [LoginComponent,Document],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule

  ]
})
export class AuthenModule { }
