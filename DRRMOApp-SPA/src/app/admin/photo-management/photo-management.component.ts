import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  photos: any;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    // tslint:disable-next-line: deprecation
    this.adminService.getPhotosForApproval().subscribe((photos) => {
      this.photos = photos;
    }, error => {
      console.log(error);
    });
  }

  approvePhoto(photoId: number) {
    // tslint:disable-next-line: deprecation
    this.adminService.approvePhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex((p: any) => p.id === photoId), 1);
    }, error => {
      console.log(error);
    });
  }

  rejectPhoto(photoId: number) {
    // tslint:disable-next-line: deprecation
    this.adminService.rejectPhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex((p: any) => p.id === photoId), 1);
    }, error => {
      console.log(error);
    });
  }

}
