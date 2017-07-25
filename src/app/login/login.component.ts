import { Component, OnInit } from '@angular/core';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn: boolean = false;
  constructor(private auth: AuthService) { }

  ngOnInit() {
      this.auth.isAuthenticatedAsync().then((authenticated) => {
          this.loggedIn = authenticated;
        });
  }
  
  chkLoggedIn() {
      return this.auth.isAuthenticated();
  }
}
