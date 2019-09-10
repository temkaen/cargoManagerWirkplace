import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators/";
import { Observable, empty } from "rxjs";
import { User } from "./table-user/user";
import { ErrorService } from "./error.service";

@Injectable()
export class UserService {
  constructor(private  http: HttpClient, private errorService: ErrorService) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(' http://localhost:3000/api/users ').pipe(
      map( data => {
        return (data.length === 0) ? [] : data.map(this.parsingUser);
      }),

      catchError(err => {
        this.errorService.transformError(err);
        return empty;
      }),
    );
  }

  parsingUser(user): User {
    return {
      id: user.id,
      surname: user.surname || '',
      name: user.name || '',
      patronymic: user.patronymic || '',
      login: user.login || '',
      role: user.role || ''
    };
  }
}