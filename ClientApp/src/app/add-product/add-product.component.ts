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
  urlImage: any = null;
  msg = "";
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router
    , private datePipe: DatePipe) {
    this.url = baseUrl;
    http.get<vendor[]>(baseUrl + 'api/Vendor').subscribe(result => {


      this.vendors = result;

    }, error => console.error(error));
  }

  ngOnInit() {
  }
  formData = new FormData();
  public uploadFile = (files) => {
    if (files.length === 0) {
      this.msg = 'You must select an image';
      this.urlImage = null;
      return;
    }
    let fileToUpload = <File>files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileToUpload);

    reader.onload = (_event) => {
      this.msg = "";
      this.urlImage = reader.result;
    }

    this.formData.append('file', fileToUpload, fileToUpload.name);

  }
  newProduct() {
    //let fileToUpload = <File>files[0];

    this.formData.append('data', JSON.stringify(this.product));

    let x = this.url + "api/Product";

    this.http.post<Product>(x, this.formData).subscribe(res => {

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
