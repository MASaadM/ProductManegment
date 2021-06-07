import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
      this.products.forEach(prod => {
        this.getImage(this.url + "api/Product/DownloadImage/" + prod.image).subscribe(res => {

          prod.url = res;
        });
      });
    }, error => console.error(error));
  }
 
  ChangePage($event) {
    let x = this.url + "api/Product/GetPagedResult/" + $event + "/" + environment.PageNumber;

    this.http.get<Product[]>(x).subscribe(res => {
      this.products = res["result"]["items"]
      this.products.forEach(prod => {
        this.getImage(this.url + "api/Product/DownloadImage/" + prod.image).subscribe(res => {

          prod.url = res;
        });
      });

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
  viewImage(name: string) {
    this.router.navigate(["/viewImage", name]);
  }
  getImage(url: string): Observable<string> {
    return this.getData(url).pipe(switchMap((response) => this.readFile(response)))
  }
  getData(url: string): Observable<any> {
    return this.http.get(url, this.generatedownloadHeaders());
  }
  public generatedownloadHeaders() {
    const _headers = { Accept: 'application/json' };


    return {
      headers: new HttpHeaders(_headers),
      responseType: 'blob' as 'json',
    };
  }
  private readFile(blob: Blob): Observable<string> {
    debugger;
    return Observable.create((obs) => {
      const reader = new FileReader();

      reader.onerror = (err) => obs.error(err);
      reader.onabort = (err) => obs.error(err);
      reader.onload = () => obs.next(reader.result);
      reader.onloadend = () => obs.complete();

      return reader.readAsDataURL(blob);
    });
  }
}

