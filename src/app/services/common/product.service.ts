import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Product } from 'src/app/contracts/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  createProduct(product:Product,successCallBack?:any){
      this.httpClientService.post({
        controller:"products"
      },product).subscribe(result=>{
        successCallBack();
      })
  }
}
