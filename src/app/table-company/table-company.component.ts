import {Component, OnDestroy, OnInit} from '@angular/core';
import {CompanyService} from '../company.service';
import {Company} from './company';
import {Observable} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-table-company',
  templateUrl: './table-company.component.html',
  styleUrls: ['./table-company.component.less']
})
export class TableCompanyComponent implements OnInit, OnDestroy  {
    public companies$: Observable<Company[]>;
  public p: number|string = 1;
  public items: number|string = 5;
  itemsNum: any = [5, 10, 50];

  constructor(private companyService: CompanyService, public fb: FormBuilder, private route: ActivatedRoute,
              private router: Router,
             ) {}

  itemsPagination = this.fb.group({
    itemsSelect: ['']
  });

  changeItemsPerPage() {
    const valueSelect = this.itemsPagination.value;

    this.items = valueSelect.itemsSelect || this.items;
    this.router.navigate(['/companies', { items: this.items, p: this.p }]);
    }

  setPaginationParams() {
    console.log(this.itemsPagination.value);

  this.items = this.route.snapshot.paramMap.get('items') || this.items;
  this.p = this.route.snapshot.paramMap.get('p') || this.p;


  // this.itemsPagination.setValue({itemsSelect: this.items});

  }

  ngOnInit() {
      this.companies$ = this.companyService.getCompanies();
      this.setPaginationParams();
  }

  pageChanged($event: number) {
    this.p = $event;
    this.router.navigate(['/companies', { items: this.items, p: this.p }]);
  }
}
