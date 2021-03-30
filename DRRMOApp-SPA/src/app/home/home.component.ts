import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title1 = 'DRRMO';
  title2 = 'ABTIK';

  constructor() { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

}
