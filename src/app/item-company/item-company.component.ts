import { Component, Input } from '@angular/core';

@Component({
  selector: 'tbody-company',
  templateUrl: './item-company.component.html',
  styleUrls: ['./item-company.component.less']
})
export class ItemCompanyComponent  {
  @Input () company;

}
