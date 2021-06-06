import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { vendor } from '../Models/Vendor';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent {

  public vendors: vendor[];
  Count: number = 0;
  pageCount: number = 0;
  url: string = "";
  pager: number[] = [];
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    this.url = baseUrl;
    http.get<vendor[]>(baseUrl + 'api/Vendor/GetPagedResult/1/' + environment.PageNumber).subscribe(result => {


      this.vendors = result["result"]["items"];
      this.Count = result["result"]["count"];
      if (this.Count > 5) {
        this.pageCount = Math.ceil(this.Count / environment.PageNumber);
      }
      else {
        this.pageCount = 1;
      }
      for (let i = 1; i <= this.Count; i++) {
        this.pager.push(i);
      }
    }, error => console.error(error));
  }

  ChangePage($event) {
    let x = this.url + "api/Vendor/GetPagedResult/" + $event + "/" + environment.PageNumber;

    this.http.get<vendor[]>(x).subscribe(res => {
      this.vendors = res["result"]["items"]

    })
  }
  addVendor() {
    this.router.navigate(["/addVendor"]);
  }
  updateVendor(id: number) {
    this.router.navigate(["/updateVendor", id]);
  }
  deleteVendor(id: number) {
    this.router.navigate(["/deleteVendor",id]);
  }
}


