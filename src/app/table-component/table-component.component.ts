import { Component, OnInit, Input, Output, EventEmitter, ContentChild, TemplateRef, OnChanges } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpServiceService } from '../http-service.service';


@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements OnInit, OnChanges {

  @Input() data:any;

  /**
   * Flag indicating column data to be iterated
   */
  @Input() columns: any;


  @Output() whenSorted = new EventEmitter();

  @ContentChild(TemplateRef) userDataTpl: TemplateRef<any>;



  /**
   * Flag indicating tablehead data
   */
  _tableHeads: Array<any>;

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
  ngOnChanges() {
    this.http.getTableData().subscribe((data) => {
      this.data = data;
    });
  }

  _onSort(header): void {
    header.asc = !header.asc;
    const fieldName = `SORT_BY_${header.sortKey.toUpperCase()}`;
    const direction = header.asc ? 'ASC' : 'DESC';
    this.whenSorted.emit({ fieldName, direction });
  }

  _trackItems(index: number): number {
    return index;
  }

  onScroll(){
    this.http.getTableData().subscribe((data) => {
      console.log("scrolled")
      this.data = data;
      console.log("this.data",this.data)
    });
  }


}
