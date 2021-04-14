import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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

  constructor(private adminService: AdminService, private alertify: AlertifyService,
              private spinner: NgxSpinnerService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.loadUsersWithRoles();
  }

  // tslint:disable-next-line: typedef
  loadUsersWithRoles() {
    this.spinner.show();
    // tslint:disable-next-line: deprecation
    this.adminService.getUsersWithRoles().subscribe((users: any) => {
      this.users = users;
      this.spinner.hide();
    }, error => {
      this.alertify.error(error);
    });
  }

}
