import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCompanyComponent } from './table-company.component';

describe('TableCompanyComponent', () => {
  let component: TableCompanyComponent;
  let fixture: ComponentFixture<TableCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
