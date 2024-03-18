import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/product.service';

declare var $ :any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element:ElementRef,
    private _renderer:Renderer2,
    private httpClientService:HttpClientService,
    public dialog: MatDialog,
    private toastrService:ToastrService) 
    {
      const img=_renderer.createElement("img");
      img.setAttribute("src","../../../../../assets/delete.png")
      img.setAttribute("style","cursor:pointer;")
      img.widht=20;
      img.height=20;
      _renderer.appendChild(this.element.nativeElement,img)
    }
    @Input() id:string;
    @Input () controller:string;
    @Output() callback:EventEmitter<any>=new EventEmitter();
    @HostListener("click")
    async onClick(){
      this.openDialog(async()=>{
        const td:HTMLTableCellElement=this.element.nativeElement;
        this.httpClientService.delete({
          controller:this.controller
        },this.id).subscribe(data=>{
          $(td.parentElement).fadeOut(2000,()=>{
            this.callback.emit();
            this.toastrService.success("Ürün Silindi")
          });
        },(errorResponse:HttpErrorResponse)=>{
          this.toastrService.error("Ürün silinemedi")
        
        })
        
      })
      
    }
    openDialog(afterClosed:any): void {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: DeleteState.Yes,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result==DeleteState.Yes) {
          afterClosed();
        }
        
      });
    }
  

}
