import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', { static: true }) memberTabs!: TabsetComponent;
  @ViewChild(MemberMessagesComponent) memberMessagesComponent!: MemberMessagesComponent;
  user!: User;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private authService: AuthService, private alertify: AlertifyService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.route.data.subscribe(data => {
      this.user = data.user;
    });

    // tslint:disable-next-line: deprecation
    this.route.queryParams.subscribe(params => {
      const selectedTab = params.tab;
      // tslint:disable-next-line: no-unused-expression
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });
  }

  focusOnMessageBox(): void {
    this.memberMessagesComponent.focusOnMessageBox();
  }

  // tslint:disable-next-line: typedef
  selectTab(tabId: number) {
      this.memberTabs.tabs[tabId].active = true;
  }

  sendLike(id: number): void {
    // tslint:disable-next-line: deprecation
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('You have liked: ' + this.user.firstName);
    }, error => {
      this.alertify.error(error);
    });
  }

}
