import {Component, OnDestroy, OnInit} from '@angular/core';
import {CompanyService} from '../company.service';
import {Company} from './company';
import {Observable, Subscription} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-table-company',
  templateUrl: './table-company.component.html',
  styleUrls: ['./table-company.component.less']
})
export class TableCompanyComponent implements OnInit, OnDestroy  {
    public companies$: Observable<Company[]>;
  public p = 1;
  public items = 5;
  public sub;
  itemsNum: any = [5, 10, 50];
  private urlParams: Params;

  constructor(private companyService: CompanyService, public fb: FormBuilder, private route: ActivatedRoute,
              private router: Router,
             ) {}

  itemsPagination = this.fb.group({
    itemsSelect: ['', [Validators.required]]
  });

  changeItemsPerPage() {
    const valueSelect = this.itemsPagination.value;
    this.items = valueSelect.itemsSelect || this.items;

    this.router.navigate(['/companies', { items: this.items, p: this.p }]);
  }

  setPaginationParams() {

  this.sub = this.route.params.subscribe(params => this.urlParams = params
   );
  this.items = this.urlParams.items || this.items;
  this.p = this.urlParams.p || this.p;
  console.log(this.itemsPagination.value);
  }

  ngOnInit() {
      this.companies$ = this.companyService.getCompanies();
      this.setPaginationParams();
  }

  pageChanged($event: number) {
    this.p = $event;
    this.router.navigate(['/companies', { items: this.items, p: this.p }]);
    return this.p;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
