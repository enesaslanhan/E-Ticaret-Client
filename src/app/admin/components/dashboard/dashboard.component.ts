import { Component, Inject, inject } from '@angular/core';
import{HttpClient, HttpHeaders}from'@angular/common/http'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private httpClient:HttpClient,@Inject("baseUrl") private baseurl:string){}

}

