import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../company.service';
import {Company} from './company';
import {Observable} from 'rxjs';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-table-company',
  templateUrl: './table-company.component.html',
  styleUrls: ['./table-company.component.less']
})
export class TableCompanyComponent implements OnInit {
    public companies$: Observable<Company[]>;
  public p = 1;
  public items = 5;
  selectPagination: FormGroup;
  // noinspection JSAnnotator
  itemsNum: any = [5, 10, 50];
  isSubmitted = false;




  constructor(private companyService: CompanyService, public fb: FormBuilder, private route: ActivatedRoute,
              private router: Router,
             ) {

  }

  itemsPagination = this.fb.group({
    itemsSelect: ['', [Validators.required]]
  });


  changeItemsPerPage() {
    const valueSelect = this.itemsPagination.value;
    this.items = valueSelect.itemsSelect || this.items;

    this.router.navigate(['/companies', { items: this.items, p: this.p }]);
  }

  setPaginationParams() {
    const matrixUrl = this.router.parseUrl('/companies');
    console.log(matrixUrl);
  }
  ngOnInit() {
      this.companies$ = this.companyService.getCompanies();
      this.setPaginationParams();


  }




}
