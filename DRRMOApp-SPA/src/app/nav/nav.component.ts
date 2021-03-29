import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl!: string;

  constructor(public authService: AuthService, private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    // tslint:disable-next-line: deprecation
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    // tslint:disable-next-line: no-non-null-assertion
    this.authService.currentUser = null!;
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

}
