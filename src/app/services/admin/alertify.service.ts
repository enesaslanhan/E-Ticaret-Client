import { Injectable } from '@angular/core';
declare var alertify:any
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  message(message:string,messageType:MessageType, posistion:Posistion,delay:number=3,dissmisOthers:boolean=false){
    alertify.set('notifier','delay', delay);
    alertify.set('notifier','position', posistion);
    const mess=alertify[messageType](message);
    if (mess) {
      mess.dissmisOthers();
    }
  }
}
export enum MessageType{
  Error="error",
  Succes="succes",
  Message="message",
  Warning="warning",
  Notify="notify"
}
export enum Posistion{
  TopCenter="top-center",
  TopRight="top-right",
  TopLeft="top-left",
  BottomRight="bottom-right",
  BottomCenter="bottom-center",
  BottomTop="bottom-top",
}