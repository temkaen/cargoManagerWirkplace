import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../company.service';
import {Company} from './company';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-table-company',
  templateUrl: './table-company.component.html',
  styleUrls: ['./table-company.component.less']
})
export class TableCompanyComponent implements OnInit {
    public companies$: Observable<Company[]>;
    items: Company[];
  pageOfItems: Array<any>;
  p: number = 1;


  constructor(private companyService: CompanyService) {
  }
  ngOnInit() {
      this.companies$ = this.companyService.getCompanies();

      const itemsSubscription = this.companyService.getCompanies().subscribe(data => this.items = data );


  }
  // console.log(this.items);
}
