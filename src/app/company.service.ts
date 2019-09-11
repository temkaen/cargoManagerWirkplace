import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {map, catchError} from "rxjs/operators/";
import {Observable, empty, of} from "rxjs";
import {Company} from "./table-company/company";
import {ErrorService} from "./error.service";
import {CompanyModel} from "./table-company/company.model";
import {StatusCompany} from './item-company/statusCompany.enum';

@Injectable()
export class CompanyService {

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getCompanies(): Observable<CompanyModel> {
    return this.http.get<CompanyModel[]>(' http://localhost:3000/api/companies ').pipe(
      map(data => {
        if (data.length === 0) {
          return [];
        } else {
          return [
            ...data.map(company => {
              return {
                id: company.id,
                name: company.name || '',
                address: company.address || '',
                contactPerson: company.contactPerson || '',
                email: company.email || '',
                phone: company.phone || null,
                status: company.status === StatusCompany.companyActive ? StatusCompany.companyActive : StatusCompany.companySuspended
              };
            })
          ];
        }
      }),
      catchError(err => {
        this.errorService.transformError(err);
        return empty;
      }),
    );
  }

  postCompany(company) {
    return this.http.post('http://localhost:3000/api/company', company).pipe(
      catchError(err => {
        this.errorService.transformError(err);
        return of(err);
      }),
    );
  }

  getCompanyById(id, companies) {
    return companies.find(companyItem => companyItem.id === id);
  }

  putCompany(company, id) {
    return this.http.put(`http://localhost:3000/api/company/${id}`, company).pipe(
      catchError(err => {
        this.errorService.transformError(err);
        return of(err);
      }),
    );
  }

  putCompanyStatus(idCompany: number | string) {
    return this.http.put(`http://localhost:3000/api/company/${idCompany}/status`).pipe(
      catchError(err => {
        this.errorService.transformError(err);
        return empty;
      }),
    );
  }
}
