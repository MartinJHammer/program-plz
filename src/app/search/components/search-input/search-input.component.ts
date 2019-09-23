import { Component, OnInit, Inject, forwardRef, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectSearchBox } from 'instantsearch.js/es/connectors';

@Component({
  selector: 'pp-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent extends BaseWidget implements OnInit {
  @Input() public autofocus: boolean;
  @ViewChild('input', { static: true }) public input: ElementRef;
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
