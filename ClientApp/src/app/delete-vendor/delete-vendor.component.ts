import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { vendor } from '../Models/Vendor';

@Component({
  selector: 'app-delete-vendor',
  templateUrl: './delete-vendor.component.html',
  styleUrls: ['./delete-vendor.component.css']
})
export class DeleteVendorComponent implements OnInit {

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
  deleteVendor() {
    let x = this.url + "api/Vendor/" + this.id;

    this.http.delete<vendor>(x).subscribe(res => {
      this.router.navigate(["/Vendors"]);
    });
  }
  cancel() {
 
    this.router.navigate(["/Vendors"]);
  }

}
