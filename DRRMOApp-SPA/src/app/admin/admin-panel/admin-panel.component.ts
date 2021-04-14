import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users!: User[];
  pagination!: Pagination;

  constructor(private adminService: AdminService, private alertify: AlertifyService,
              private spinner: NgxSpinnerService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getUsersWithRoles();
  }

  // tslint:disable-next-line: typedef
  getUsersWithRoles() {
    this.spinner.show();
    // tslint:disable-next-line: deprecation
    this.adminService.getUsersWithRoles().subscribe((users: any) => {
        this.users = users;
        this.spinner.hide();
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
  }

}
