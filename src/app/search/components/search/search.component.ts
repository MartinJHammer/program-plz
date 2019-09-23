import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchInputComponent } from '../search-input/search-input.component';

@Component({
  selector: 'pp-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchBox', { static: true }) searchbox: any; // NgAisSearchBox;
  @Input() public collection: string;
  public searchConfig: any;
  public showSearchResults = false;
  @Output() public selectedHit = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.setSearchConfig();

  }

  public searchChanged(query) {
    if (typeof query === 'string') {
      if (query.length) {
        this.showSearchResults = true;
      } else {
        this.showSearchResults = false;
      }
    }
  }

  public setSearchConfig() {
    this.searchConfig = {
      ...environment.algolia,
      indexName: this.collection
    };
  }

  public clickedHit(hit: any) {
    this.selectedHit.emit(hit);
    this.showSearchResults = false;
    (this.searchbox as SearchInputComponent).input.nativeElement.value = '';
  }

}
