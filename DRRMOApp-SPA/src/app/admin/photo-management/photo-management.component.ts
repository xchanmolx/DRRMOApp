import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  photos: any;

  constructor(private adminService: AdminService, private alertify: AlertifyService,
              private spinner: NgxSpinnerService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getPhotosForApproval();
  }

  // tslint:disable-next-line: typedef
  getPhotosForApproval() {
    this.spinner.show();
    // tslint:disable-next-line: deprecation
    this.adminService.getPhotosForApproval().subscribe((photos) => {
      this.photos = photos;
      this.spinner.hide();
    }, error => {
      this.alertify.error(error);
    });
  }

  // tslint:disable-next-line: typedef
  approvePhoto(photoId: number) {
    // tslint:disable-next-line: deprecation
    this.adminService.approvePhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex((p: any) => p.id === photoId), 1);
    }, error => {
      this.alertify.error(error);
    });
  }

  // tslint:disable-next-line: typedef
  rejectPhoto(photoId: number) {
    // tslint:disable-next-line: deprecation
    this.adminService.rejectPhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex((p: any) => p.id === photoId), 1);
    }, error => {
      this.alertify.error(error);
    });
  }

}
