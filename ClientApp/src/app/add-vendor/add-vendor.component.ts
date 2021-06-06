import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { vendor } from '../Models/Vendor';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent implements OnInit {
  vendor: vendor = {} as vendor;
  url: string = "";
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    this.url = baseUrl;
  }

  ngOnInit() {
  }
  newVendor() {
    let x = this.url + "api/Vendor";
   
    this.http.post<vendor>(x, this.vendor).subscribe(res => {
   
      this.router.navigate(["/Vendors"]);
    });
  }
}
