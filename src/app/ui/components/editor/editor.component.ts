import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'pp-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public editor = ClassicEditor;
  @Output() public change = new EventEmitter<string>();
  @Input() public data: string;

  constructor() { }

  ngOnInit() {
  }

  public onChange({ editor }: ChangeEvent) {
    if (editor) {
      const data = editor.getData();
      this.change.emit(data);
    }
  }
}
