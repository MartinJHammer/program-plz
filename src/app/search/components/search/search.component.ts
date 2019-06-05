import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'pp-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchBox') searchbox: any; // NgAisSearchBox;
  @Input() public collectionName: string;
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
      indexName: this.collectionName
    };
  }

  public clickedHit(hit: any) {
    this.selectedHit.emit(hit);
    this.showSearchResults = false;
    this.searchbox.searchBox.nativeElement.value = '';
  }

}
