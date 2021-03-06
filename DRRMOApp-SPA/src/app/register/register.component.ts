import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  user!: User;
  registerForm!: FormGroup;
  bsConfig!: Partial<BsDatepickerConfig>;
  designateList: string[] = ['Responder', 'Driver', 'Operations and Warning', 'Admin and Training', 'Research and Planning', 'DRRM Officer', 'Volunteer'];
  // tslint:disable-next-line: no-inferrable-types
  defaultDesignate: string = 'Responder';
  @ViewChild('firstNameField', { static: true }) firstNameField!: ElementRef;

  constructor(private authService: AuthService, private alertify: AlertifyService,
              private router: Router, private fb: FormBuilder) {
                // tslint:disable-next-line: deprecation
                this.authService.invokeEvent.subscribe(() => {
                  this.ngAfterViewInit();
                });
              }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue'
    };
    this.createRegisterForm();

    this.registerForm.controls.designate.setValue(this.defaultDesignate);
  }

  // tslint:disable-next-line: typedef
  ngAfterViewInit() {
    this.firstNameField.nativeElement.focus();
  }

  // tslint:disable-next-line: typedef
  createRegisterForm() {
    // tslint:disable-next-line: deprecation
    this.registerForm = this.fb.group({
      gender: ['male'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      designate: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: [null, Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  // tslint:disable-next-line: typedef
  passwordMatchValidator(g: any) {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : {mismatch: true};
  }

  // tslint:disable-next-line: typedef
  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      // tslint:disable-next-line: deprecation
      this.authService.register(this.user).subscribe(() => {
          this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        // tslint:disable-next-line: deprecation
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/team']);
        });
      });
    }
  }

}
