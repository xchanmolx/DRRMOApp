import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users!: User[];
  user: User = JSON.parse(localStorage.getItem('user') as any);
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females'}];
  userParams: any = {};
  pagination!: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    // tslint:disable-next-line: deprecation
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
      this.spinner.hide();
    });

    this.userParams.gender = this.user.gender === 'male' ? 'female' : 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'male' ? 'female' : 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  loadUsers() {
    this.spinner.show();
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      // tslint:disable-next-line: deprecation
      .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
      this.spinner.hide();
    }, error => {
      this.alertify.error(error);
    });
  }

}
