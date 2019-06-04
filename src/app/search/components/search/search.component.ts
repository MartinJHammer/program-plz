import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'pp-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() public collectionName: string;
  public searchConfig: any;
  public showSearchResults = false;

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

}
