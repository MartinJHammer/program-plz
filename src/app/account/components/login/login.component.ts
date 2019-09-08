import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SubscriptionHandler } from 'src/app/start/helpers/subscription-handler';
import { AuthService } from 'src/app/start/services/auth.service';

@Component({
  selector: 'pp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public subscriptionHandler = new SubscriptionHandler();

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.subscriptionHandler.register(this.auth.user.pipe(
      map(user => user ? this.router.navigate(['account/profile']) : user)
    ).subscribe());
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }
}
