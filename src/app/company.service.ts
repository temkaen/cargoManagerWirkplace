import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, catchError} from 'rxjs/operators/';
import {Observable, empty} from 'rxjs';
import {Company} from './table-company/company';
import {ErrorService} from './error.service';


@Injectable()
export class CompanyService {

    constructor(private  http: HttpClient, private errorService: ErrorService) {
    }
    getCompanies(): Observable<Company[]> {
        return this.http.get<Company[]>(' http://localhost:3000/api/companies ').pipe(
          map(data => {
            if ( data.length === 0) {
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
                    status: company.status === 'Active' ? 'success' : 'fail',
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
            return empty;
          }),
        );
    }
}
