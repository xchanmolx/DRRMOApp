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
  genderList = [{ value: 'all', display: 'All' }, { value: 'male', display: 'Males' }, { value: 'female', display: 'Females'}];
  genderModel: any;
  userParams: any = {};
  pagination!: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.spinner.show();
    // tslint:disable-next-line: deprecation
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
      this.spinner.hide();
    });

    this.genderChanged();
  }

  genderChanged(): void {
    this.userParams.orderBy = 'lastActive';
    this.userParams.gender = '';
    this.userParams.population = '';
    if (this.genderModel === 'male' || this.genderModel === 'female') {
      this.userParams.gender = this.genderModel;
    } else {
      this.genderModel = 'all';
      this.userParams.population = this.user.population;
    }

    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  // tslint:disable-next-line: typedef
  resetFilters() {
    this.userParams.orderBy = 'lastActive';
    this.userParams.gender = '';
    this.genderModel = 'all';
    this.userParams.population = this.user.population;
    this.pagination.currentPage = 1;
    this.loadUsers();
  }

  // tslint:disable-next-line: typedef
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
