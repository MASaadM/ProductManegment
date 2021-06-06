import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { VendorsComponent } from './vendors/vendors.component';
import { ProductsComponent } from './products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { UpdateVendorComponent } from './update-vendor/update-vendor.component';
import { DeleteVendorComponent } from './delete-vendor/delete-vendor.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { PageComponent } from './page/page.component';
import { TextInputComponent } from './text-input/text-input.component';
import { DatePipe } from '@angular/common';
//import { PagingComponent } from './paging/paging.component';
//import { MatButtonModule } from '@angular/material/button';
//import { MatCheckboxModule } from '@angular/material/checkbox';
//import { MatTableModule, MatTableDataSource, MatTableDataSourcePageEvent,MatTableDataSourcePaginator } from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    VendorsComponent,
    ProductsComponent,
    AddVendorComponent,
    UpdateVendorComponent,
    DeleteVendorComponent,
    AddProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    PageComponent,
    TextInputComponent,
    /*PagingComponent*/

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'Products', component: ProductsComponent },
      { path: 'Vendors', component: VendorsComponent },
      { path: 'addVendor', component: AddVendorComponent },
      { path: 'updateVendor/:id', component: UpdateVendorComponent, },
      { path: 'deleteVendor/:id', component: DeleteVendorComponent },
      { path: 'addProduct', component: AddProductComponent },
      { path: 'updateProduct/:id', component: UpdateProductComponent },
      { path: 'deleteProduct/:id', component: DeleteProductComponent },



    ]),
    BrowserAnimationsModule,
    //MatButtonModule,
    //MatCheckboxModule,
    //MatTableModule,
    //MatTableDataSource
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
