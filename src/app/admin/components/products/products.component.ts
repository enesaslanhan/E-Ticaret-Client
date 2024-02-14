import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  constructor(private httpClientService:HttpClientService){}
  ngOnInit(): void {
    
    this.httpClientService.get({
      controller:"products"
    }).subscribe(data=>console.log(data));



    // this.httpClientService.delete({
    //    controller: "products"
    //  }, "d5dbd4a9-916a-4eef-bb7f-c175275540d1")
    //  .subscribe();



    /*
    this.httpClientService.put({
      conroller:"products"
    },{
      id:"5d9880e7-dbc9-471d-bac9-920317760fc8",
      name:"silgi"
    }).subscribe()
   */
    /*
    this.httpClientService.post({
      conroller:"prodcuts"
    },{
      name:"kağıt",
      stock:1000,
      price:5
    }).subscribe();
    */
  }
  
  

}
