import { Component, OnInit } from '@angular/core';
import { PwaService } from '../../services/pwa.service';

@Component({
  selector: 'pp-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(public pwa: PwaService) { }

  ngOnInit() {
  }

}
