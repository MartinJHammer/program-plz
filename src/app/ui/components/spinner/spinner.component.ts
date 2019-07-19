import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pp-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() public spinner: 'ripple' | 'dot' = 'ripple';

  constructor() { }

  ngOnInit() {
  }

}
