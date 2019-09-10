import { Component, Input } from '@angular/core';

@Component({
  selector: 'tbody-user',
  templateUrl: './item-user.component.html',
  styleUrls: ['./item-user.component.less']
})

export class ItemUserComponent  {
  @Input () user;
}