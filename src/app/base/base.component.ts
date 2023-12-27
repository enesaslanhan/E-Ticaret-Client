import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { timeout } from 'rxjs';

export class BaseComponent {

  constructor(private spinner:NgxSpinnerService){}

  showSpinner(spinnerNameType:SpinnerType){
    this.spinner.show(spinnerNameType)
    setTimeout(()=> this.hideSpinner(spinnerNameType),3000)
  }

  hideSpinner(spinnerNameType:SpinnerType){
    this.spinner.hide(spinnerNameType)  
  }
}
export enum SpinnerType{
  BallAtom="s1",
  BallScale="s2",
  BallSpinner="s3"
}