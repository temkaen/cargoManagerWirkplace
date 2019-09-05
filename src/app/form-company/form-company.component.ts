import {Component, OnDestroy} from '@angular/core';
import {CompanyService} from '../company.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface iResponse {
  status: number;
}

@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.less']
})
export class FormCompanyComponent  implements OnDestroy {
  formCompany: FormGroup;
  subscription;
  success;
  repeatCompany;

  constructor(private companyService: CompanyService) {
    this._createForm();
  }

  private _createForm() {
    this.formCompany = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      contactPerson: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required,
        Validators.pattern(/^(8(-?)0|(\+)?375)-?[29|25|44|33]{2}-?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$/)]),
    });
  }

  addCompany() {
    this.subscription = this.companyService.postCompany(this.formCompany.value).subscribe((response: iResponse) => {
      if (response.status === 409) {
        this.repeatCompany = true;
      } else {
        this.success = true;
      }
    });

  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
