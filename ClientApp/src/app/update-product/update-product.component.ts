import { DatePipe } from '@angular/common';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../Models/Product';
import { vendor } from '../Models/Vendor';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  public vendors: vendor[];
  product: Product = {} as Product;
  id: string = "";
  url: string = "";
  urlImage: any = null;
  msg = "";
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router
    , private datePipe: DatePipe, private route: ActivatedRoute) {
    this.url = baseUrl;
    this.id = this.route.snapshot.paramMap.get("id");
    http.get<vendor[]>(baseUrl + 'api/Vendor').subscribe(result => {


      this.vendors = result;

    }, error => console.error(error));
    http.get<Product>(baseUrl + "api/Product/" + this.id).subscribe(res => {
      this.product = res;
      this.product.expirydate = this.datePipe.transform(this.product.expirydate, 'yyyy-MM-dd');
      //http.get<Observable<any>>(baseUrl + "api/Product/DownloadImage/" + this.product.image)
      //  .pipe<Observable<string>>(switchMap((response) => this.readFile(response)))
      //  .subscribe(res => {

      //    this.urlImage = res
      //});
      //debugger;
      this.getImage(baseUrl + "api/Product/DownloadImage/" + this.product.image).subscribe(res => {
        console.log(res);
        this.urlImage = res;
      });

    });

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
  ngOnInit() {
  }
  updateProduct() {
   /* this.formData.append('data', JSON.stringify(this.product));*/
    let x = this.url + "api/Product";

    this.http.put<Product>(x, this.product).subscribe(res => {

      this.router.navigate(["/Products"]);
    });

  }
  validate() {

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
