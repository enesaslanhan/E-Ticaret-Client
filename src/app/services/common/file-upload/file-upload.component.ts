import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(private httpClientService:HttpClientService,private toastrService:ToastrService){}
  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUpLoadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData:FormData=new FormData();
    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file:File)=>{
        fileData.append(_file.name,_file,file.relativePath);
      });
    }
    this.httpClientService.post({
      controller:this.options.contrroller,
      actions:this.options.actions,
      queryString:this.options.querString,
      headrs:new HttpHeaders({"responseType":"blob"})
    },fileData).subscribe(data=>{
      this.toastrService.success("Dosyalar başarılıyla yüklendi")
    },(erroResponse:HttpErrorResponse)=>{
      this.toastrService.error("Dosyalar yüklenirken beklenmedik bir hata ile karşılaşılmıştır")
    })
  }

}

export class FileUpLoadOptions{
  contrroller?:string
  actions?:string
  querString?:string
  explanation?:string
  accept?:string
}
