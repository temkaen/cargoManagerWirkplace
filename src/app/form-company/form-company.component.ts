import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {ModalService} from '../modal/modal.service';

interface iResponse {
  status: number;
  message: string;
}

@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.less']
})

export class FormCompanyComponent  implements OnDestroy, OnInit {
  formCompany: FormGroup;
  subscription;
  success;
  repeatCompany;
  href: boolean = false;
  public company;
  url: string;
  id: string;
  companyItem = '';
  add: boolean = true;
  edit: boolean = false;
  messageError: string;

  constructor(private companyService: CompanyService, private router: Router, private route: ActivatedRoute, private modalService: ModalService) {
    this._createForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      if (this.router.url !== '/companies/add') {
        this.href = true;
        this.edit = true;
        this.success = true;
        this.add = false;
        this.getCompany(this.id);
      }
    });
  }

  getCompany(id) {
    this.company = this.companyService.getCompanies().subscribe((response) => {
      this.companyItem = this.companyService.getCompanyById(id, response);
      this.patchForm(this.companyItem);
    });
  }

  public _createForm() {
    this.formCompany = new FormGroup({
      name: new FormControl( '', Validators.required),
      address: new FormControl('', Validators.required),
      contactPerson: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required,
        Validators.pattern(/^(8(-?)0|(\+)?375)-?[29|25|44|33]{2}-?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$/)]),
    });
  }

  patchForm(company) {
    this.formCompany.patchValue({
      name: company.name,
      address: company.address,
      contactPerson: company.contactPerson,
      email: company.email,
      phone: company.phone
    });
  }

  addCompany(id1: string, id2: string) {
    this.subscription = this.companyService.postCompany(this.formCompany.value).subscribe((response: iResponse) => {
      if (response.status === 409) {
        this.checkError(response);
        this.modalService.open(id2);
      } else {
        this.modalService.open(id1);
        this.formCompany.disable();
        this.success = true;
      }
    });
  }

  editCompany(id3: string, id2: string) {
    this.subscription = this.companyService.putCompany(this.formCompany.value, this.id).subscribe((response) => {
      if (response.status === 409) {
        console.dir(response);
        this.checkError(response);
        this.modalService.open(id2);
      } else {
        this.modalService.open(id3);
        this.formCompany.disable();
      }
    });
  }

  checkError(response) {
    if (response.error.message === 'A company with this name and email already exists!') {
      this.formCompany.controls.name.setValue('');
      this.formCompany.controls.email.setValue('');
      this.messageError = 'A company with this name or email already exists!'
    } else if(response.error.message === 'A company with this name already exists!') {
      this.formCompany.controls.name.setValue('');
      this.messageError = 'A company with this name already exists!'
    } else {
      this.formCompany.controls.email.setValue('');
      this.messageError = 'A company with this email already exists!';
    }
  }

  closeModal(id) {
    this.modalService.close(id);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
