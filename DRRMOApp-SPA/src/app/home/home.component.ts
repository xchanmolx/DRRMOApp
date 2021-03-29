import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor() { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

  // tslint:disable-next-line: typedef
  registerToggle() {
    this.registerMode = true;
  }

  // tslint:disable-next-line: typedef
  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

}
