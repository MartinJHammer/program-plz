import { Component, OnInit, Inject, forwardRef, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectSearchBox } from 'instantsearch.js/es/connectors';

@Component({
  selector: 'pp-search2',
  templateUrl: './search2.component.html',
  styleUrls: ['./search2.component.scss']
})
export class Search2Component extends BaseWidget implements OnInit {
  @Input() public autofocus: boolean;
  @ViewChild('input') public input: ElementRef;
  @Output() public change = new EventEmitter();

  public state: {
    query: string;
    refine: (...args) => any;
    clear: (...args) => any;
    isSearchStalled: boolean;
    widgetParams: object;
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('SearchBox');
  }

  ngOnInit() {
    this.createWidget(connectSearchBox, {
      // instance options
    });
    super.ngOnInit();
  }

  public onInput(value: string) {
    this.state.refine(value);
    this.change.emit(value);
  }
}
