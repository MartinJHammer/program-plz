import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/start/services/auth.service';

@Component({
  selector: 'pp-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public isExpanded = true;
  public showSubmenu: boolean;
  public isShowing: boolean;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

}
