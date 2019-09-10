import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableCompanyComponent } from './table-company/table-company.component';
import { ItemCompanyComponent } from './item-company/item-company.component';
import { FormCompanyComponent } from './form-company/form-company.component';
import { TableUserComponent } from './table-user/table-user.component';
import { ItemUserComponent } from './item-user/item-user.component';
import { CompanyService } from './company.service';
import { UserService } from './user.service';
import { ErrorService } from './error.service';

const  routes = [
  { path: '', redirectTo: '/companies', pathMatch: 'full' }, // this route redirected to default page and must be remove later
  { path: 'companies', component: TableCompanyComponent },
  { path: 'companies/add', component: FormCompanyComponent },
  { path: 'users', component: TableUserComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TableCompanyComponent,
    ItemCompanyComponent,
    FormCompanyComponent,
    TableUserComponent,
    ItemUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CompanyService, UserService, ErrorService],
  bootstrap: [AppComponent]
})

export class AppModule { }