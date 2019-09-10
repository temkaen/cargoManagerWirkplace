import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from './user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.less']
})

export class TableUserComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers();
  }
}