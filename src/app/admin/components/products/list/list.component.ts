import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/product.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(private prodcutService:ProductService,spinner:NgxSpinnerService,private alertifyService:AlertifyService,private toastrService:ToastrService){
    super(spinner)
  }
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updateDate'];
  dataSource  : MatTableDataSource<List_Product>=null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getProducts()
  }
  async getProducts(){
    this.showSpinner(SpinnerType.BallAtom)
    const allProducts:{totalCount:number,products:List_Product[]}=await this.prodcutService.read(
      this.paginator?this.paginator.pageIndex:0,this.paginator?this.paginator.pageSize:5,
      ()=>this.hideSpinner(SpinnerType.BallAtom),error=>this.toastrService.error("Ürün listelenmedi"))
    this.dataSource=new MatTableDataSource<List_Product>(allProducts.products)
    this.paginator.length=allProducts.totalCount
  }
  async pageChanged(){
    await this.getProducts();
  }

}
