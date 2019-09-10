import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../company.service';
import {Company} from './company';
import {Observable} from 'rxjs';

@Component({

  selector: 'app-table-company',
  templateUrl: './table-company.component.html',
  styleUrls: ['./table-company.component.less']
})
export class TableCompanyComponent implements OnInit {
    public companies$: Observable<Company[]>;

  constructor(private companyService: CompanyService) {
  }
  ngOnInit() {
      this.companies$ = this.companyService.getCompanies();
  }
}
