import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TableCompanyComponent } from './table-company/table-company.component';
import { ItemCompanyComponent } from './item-company/item-company.component';
import {RouterModule} from '@angular/router';
import {CompanyService} from './company.service';
import {ErrorService} from './error.service';
import { FormCompanyComponent } from './form-company/form-company.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JwPaginationComponent } from 'jw-angular-pagination';
import {NgxPaginationModule} from 'ngx-pagination';

const  routes = [
  { path: '', redirectTo: '/companies', pathMatch: 'full' }, /// this route redirected to default page and must be remove later
  {path: 'companies', component:   TableCompanyComponent},
  {path: 'companies/add', component: FormCompanyComponent},
];

@NgModule({
  declarations: [

    AppComponent,
    TableCompanyComponent,
    ItemCompanyComponent,
    FormCompanyComponent,
    JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
      FormsModule,
      ReactiveFormsModule,
    NgxPaginationModule

  ],
  providers: [CompanyService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
