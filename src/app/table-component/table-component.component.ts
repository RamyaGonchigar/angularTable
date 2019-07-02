import { Component, OnInit, Input, Output, EventEmitter, ContentChild, TemplateRef, OnChanges } from '@angular/core';
import { HttpServiceService } from '../http-service.service';


@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements OnInit {

  @Input() data:Array<any>;

  @Input() columns: Array<any>;

  @Output() whenSorted = new EventEmitter();

  @ContentChild(TemplateRef) userDataTpl: TemplateRef<any>;

  _tableHeads: Array<any>;

  responseData: any;

  constructor(private http: HttpServiceService) {
    this.data = [];
    this.columns = [];
    this._tableHeads = [];
   }

  ngOnInit() {
    this.columns.forEach((column) => {
    this._tableHeads.push({
      display: column.display,
      displayLang: column.displayLang,
      sortKey: column.sortKey,
      hideColumn: column.hideColumn || false ,
      asc: undefined
    });
  });
  }


  _trackItems(index: number): number {
    return index;
  }

  onScroll(){
    this.http.getTableData().subscribe((data) => {
      this.responseData = data;
      this.responseData.forEach(element => {
        this.data.push(element);
      });
    },
    err => console.error(err));
  }


}
