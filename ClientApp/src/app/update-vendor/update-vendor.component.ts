import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { vendor } from '../Models/Vendor';

@Component({
  selector: 'app-update-vendor',
  templateUrl: './update-vendor.component.html',
  styleUrls: ['./update-vendor.component.css']
})
export class UpdateVendorComponent implements OnInit {
  vendor: vendor = {} as vendor;
  id: string = "";
  url: string = "";
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router
    , private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.http.get<vendor>(baseUrl + "api/Vendor/" + this.id).subscribe(res => {
      this.vendor = res;
    });
    this.url = baseUrl;
  }

  ngOnInit() {
  }
  updateVendor() {
    let x = this.url + "api/Vendor";

    this.http.put<vendor>(x, this.vendor).subscribe(res => {
      
      this.router.navigate(["/Vendors"]);
    });
  }
}
