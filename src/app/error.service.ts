import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';



@Injectable()
export class ErrorService {

    constructor(private  http: HttpClient) {
    }

  transformError(err) {
      switch (err.status) {
        case 404:
        {
          console.log('Error 404 occurred');
        }
          break;
        case 500:
        {
          console.log('Error 500 occurred');
        }
          break;
      }
  }
}
