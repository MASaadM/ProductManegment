import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Models/Product';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {


  product: Product = {} as Product;
  id: string = "";
  url: string = "";
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router
    , private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get("id");

    this.http.get<Product>(baseUrl + "api/Product/" + this.id).subscribe(res => {
      this.product = res;
    });
    this.url = baseUrl;
  }

  ngOnInit() {
  }
  deleteProduct() {
    let x = this.url + "api/Product/" + this.id;

    this.http.delete<Product>(x).subscribe(res => {

      this.router.navigate(["/Products"]);
    });
  }
  cancel() {

    this.router.navigate(["/Products"]);
  }

}
