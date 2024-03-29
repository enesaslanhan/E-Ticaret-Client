import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { FileUpLoadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(spinner :NgxSpinnerService, private productService:ProductService,private toastrService:ToastrService){
    super(spinner)
  }
  ngOnInit(): void {

  }

  @Output() createdProduct:EventEmitter<Product>=new EventEmitter();
  @Output() fileUploadOptions:Partial<FileUpLoadOptions>={
    actions:"upload",
    contrroller:"products",
    explanation:"Resimleri sürükleyin veya seçin...",
    accept:".png, .jpg, .jpeg, .json"
  };

  create(Name:HTMLInputElement,Stock:HTMLInputElement,Price:HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom)
    const create_product:Product=new Product();
    create_product.name=Name.value
    create_product.price=parseFloat(Price.value)
    create_product.stock=parseInt(Stock.value)

    

    this.productService.createProduct(create_product,()=>{
      this.hideSpinner(SpinnerType.BallAtom)
      this.toastrService.success("ürün eklendi")
      this.createdProduct.emit(create_product)
    },errorMessage=>{
      this.toastrService.error(errorMessage)
    });

  }

}
