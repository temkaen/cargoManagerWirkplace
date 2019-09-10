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
import {ModalComponent} from "./modal/modal.component";

const  routes = [
  {path: 'companies', component: TableCompanyComponent},
  {path: 'companies/add', component: FormCompanyComponent},
  {path: 'companies/edit/:id', component: FormCompanyComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TableCompanyComponent,
    ItemCompanyComponent,
    FormCompanyComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
      FormsModule,
      ReactiveFormsModule
  ],
  providers: [CompanyService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
