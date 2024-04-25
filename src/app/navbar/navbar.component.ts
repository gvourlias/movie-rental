import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@facade';
import { UserService } from 'src/domain/services/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authFacade: AuthFacade) {
  }

  ngOnInit(): void {
  }

  isCurrentUserIdentityAdmin() {
    return this.authFacade.isCurrentUserIdentityAdmin();
  }

  isLoggedIn() {
    return this.authFacade.isLoggedIn();
  }

}
