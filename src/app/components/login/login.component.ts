import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SubscriptionHandler } from 'src/app/helpers/subscription-handler';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

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
    this.subscriptionHandler.register(this.auth.user$.pipe(
      map(user => user ? this.router.navigate(['profile']) : user)
    ).subscribe());
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }
}
