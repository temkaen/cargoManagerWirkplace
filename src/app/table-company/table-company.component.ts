import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../company.service';
import {Company} from './company';
import {Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-table-company',
  templateUrl: './table-company.component.html',
  styleUrls: ['./table-company.component.less']
})
export class TableCompanyComponent implements OnInit {
  public companies$: Observable<Company[]>;
  public p: number| string = 1;
  public items: number|string = 10;
  itemsNum: string[] = ['10', '20'];
  itemsPagination: FormGroup;
  public savedPaginationParams: object;


  constructor(private companyService: CompanyService,  private route: ActivatedRoute,
              private router: Router,
  ) {
    this.itemsPagination = new FormGroup({
      itemsSelect: new FormControl(null)
  });
  }

  changeItemsPerPage() {
    const valueSelect = this.itemsPagination.value;
    this.items = valueSelect.itemsSelect || this.items;
    localStorage.setItem('parametersPagination', JSON.stringify({items: this.items, p: this.p}));
    this.router.navigate(['/companies', { items: this.items, p: this.p }]);
  }

  // checkPaginationParams() {
  //     this.savedPaginationParams = JSON.parse(localStorage.getItem('parametersPagination')) || false;
  // }

  setPaginationParams() {
    // console.log(this.savedPaginationParams);
    // if (!this.savedPaginationParams){
      this.items = this.route.snapshot.paramMap.get('items') || this.items;
      this.p = this.route.snapshot.paramMap.get('p')  || this.p;
      this.itemsPagination.controls.itemsSelect.setValue(`${this.items}`, {onlySelf: true} );
    // }
  }

  ngOnInit() {
    this.companies$ = this.companyService.getCompanies();
    // this.checkPaginationParams();
    this.setPaginationParams();
  }

  pageChanged($event: number) {
    this.p = $event;
    localStorage.setItem('parametersPagination', JSON.stringify({p: this.p, items: this.items}));
    this.router.navigate(['/companies', { items: this.items, p: this.p }]);
  }
}
