import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient,@Inject("baseUrl") private baseurl:string){}

  private url(requestParameter:Partial<RequestParameters>):string{
    return `${requestParameter.baseUrl ? requestParameter.baseUrl:this.baseurl}/${requestParameter.controller}
    ${requestParameter.acrtion ? `/${requestParameter.acrtion}`:""}`;
  }

  get<T>(requestParameter:Partial<RequestParameters>, id?:string):Observable<T>{
    let url:string="";
    if (requestParameter.fullEndPoint) {
      url=requestParameter.fullEndPoint
    } 
    else{
      url=`${this.url(requestParameter)}${id ? `/${id}`:""}`;  
    }
    return this.httpClient.get<T>(url,{headers:requestParameter.headrs})

  }
  post<T>(requestParameter:Partial<RequestParameters>,body:Partial<T>):Observable<T>{
    let url:string=""
    if(requestParameter.fullEndPoint)
      url=requestParameter.fullEndPoint
    else
      url=`${this.url(requestParameter)}`;
    return this.httpClient.post<T>(url,body,{headers:requestParameter.headrs});
  }
  put<T>(requestParameter:Partial<RequestParameters>,body:Partial<T>):Observable<T>{
    let url:string="";
    if(requestParameter.fullEndPoint){
      url=requestParameter.fullEndPoint;
    }
    else{
      url=`${this.url(requestParameter)}`;
    }
    return this.httpClient.put<T>(url,body,{headers:requestParameter.headrs});
  }

  delete<T>(requestParameter:Partial<RequestParameters>,id:string):Observable<T>{
    let url:string=""
    if (requestParameter.fullEndPoint) {
      url=requestParameter.fullEndPoint
    }
    else{
      url = `${this.url(requestParameter)}/${id}`;
      url = url.replace(/\s/g, '');//boşluk hatası alıyordum url de onun için boşlukları sildirme işlemi yapıyorum
    }
    return this.httpClient.delete<T>(url,{headers:requestParameter.headrs});
  }

}



export class RequestParameters{
  controller?:string;
  acrtion?:string
  headrs?:HttpHeaders
  baseUrl?:string
  fullEndPoint?:string
}