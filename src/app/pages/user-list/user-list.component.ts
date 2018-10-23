import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/user';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users: User[] = [];

  constructor(private usersService: UsersService) { }

  private currentPage = 0;
  private maxCount = 20;
  public scrollCallback;

  ngOnInit() {
    this.scrollCallback = this.nextPage.bind(this);
    this.nextPage()
      .subscribe();
  }

  nextPage() {
    return this.usersService.getUserList(this.maxCount, this.currentPage)
      .pipe(
        map(res => {
        this.users = this.users.concat(res);
          this.currentPage++;
        }));
  }

}
