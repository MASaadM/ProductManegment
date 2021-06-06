import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../Models/Product';
import { vendor } from '../Models/Vendor';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public vendors: vendor[];
  product: Product = {} as Product;
  url: string = "";
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router
    , private datePipe: DatePipe  ) {
    this.url = baseUrl;
    http.get<vendor[]>(baseUrl + 'api/Vendor').subscribe(result => {


      this.vendors = result;

    }, error => console.error(error));
  }

  ngOnInit() {
  }
  newProduct() {
    let x = this.url + "api/Product";

    this.http.post<Product>(x, this.product).subscribe(res => {

      this.router.navigate(["/Products"]);
    });

  }
  validate() {

  }
  validateInputNumber(event, min: number, max: number, type: number) {

    if (event.target.value > max || event.target.value < min) {
      if (type === 1) {
        this.product.price = null;
      }
      else if (type === 2) {
        this.product.votes = null;
      }
    }

  }
  validatedate(event) {
    var todaysDate = new Date();
    var xtodaysDate = this.datePipe.transform(todaysDate, 'yyyy-MM-dd');
    if (event.target.value < xtodaysDate) {

      this.product.expirydate = null;
    }
  }
}
