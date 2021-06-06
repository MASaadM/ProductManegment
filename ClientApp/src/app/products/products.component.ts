import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Product } from '../Models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  public products: Product[];
  Count: number = 0;
  pageCount: number = 0;
  url: string = "";
  pager: number[] = [];
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    this.url = baseUrl;
    http.get<Product[]>(baseUrl + 'api/Product/GetPagedResult/1/' + environment.PageNumber).subscribe(result => {

      this.products = result["result"]["items"];
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
    let x = this.url + "api/Product/GetPagedResult/" + $event + "/" + environment.PageNumber;

    this.http.get<Product[]>(x).subscribe(res => {
      this.products = res["result"]["items"]

    })
  }
  addProduct() {
    this.router.navigate(["/addProduct"]);
  }
  updateProduct(id: number) {
    this.router.navigate(["/updateProduct", id]);
  }
  deleteProduct(id: number) {
    this.router.navigate(["/deleteProduct", id]);
  }
}

