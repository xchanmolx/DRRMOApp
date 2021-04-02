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

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);

  }

  // tslint:disable-next-line: typedef
  focusOnFirstName() {
    this.authService.callMethodFocusOnFirstName();
  }

  // tslint:disable-next-line: typedef
  login() {
    // tslint:disable-next-line: deprecation
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error('Username or password is incorrect');
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  // tslint:disable-next-line: typedef
  loggedIn() {
    return this.authService.loggedIn();
  }

  // tslint:disable-next-line: typedef
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    // tslint:disable-next-line: no-non-null-assertion
    this.authService.currentUser = null!;
    this.alertify.message('Logged out');
    this.model = {};
    this.router.navigate(['/home']);
  }

}
