import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  constructor(private httpClientService:HttpClientService){}
  ngOnInit(): void {
    
  }
  @ViewChild(ListComponent) ListComponents:ListComponent;
  createdProduct(product:Product){
    this.ListComponents.getProducts();
  }
  
  

}
