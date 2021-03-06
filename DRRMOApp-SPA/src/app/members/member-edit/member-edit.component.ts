import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  user!: User;
  photoUrl!: string;
  @HostListener('window:beforeunload', ['$event'])
  // tslint:disable-next-line: typedef
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService, private authService: AuthService, private spinner: NgxSpinnerService) { }


  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.spinner.show();
    // tslint:disable-next-line: deprecation
    this.route.data.subscribe(data => {
      this.user = data.user;
      this.spinner.hide();
    });
    // tslint:disable-next-line: deprecation
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  // tslint:disable-next-line: typedef
  updateUser() {
    // tslint:disable-next-line: deprecation
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(() => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, (error: any) => {
      this.alertify.error(error);
    });
  }

  // tslint:disable-next-line: typedef
  updateMainPhoto(photoUrl: string) {
    this.user.photoUrl = photoUrl;
  }

}
