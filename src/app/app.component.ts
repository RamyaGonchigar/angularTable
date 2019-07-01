import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from './http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  title = 'angularProject';
  public testTableData;

  constructor(private http: HttpServiceService){
  }

  public testColumnData = [
    {
        display: 'ID',
        sortKey: 'ID'
      },
      {
        display: 'NAME',
        sortKey: 'NAME'
      },
      {
        display: 'ROLE',
        sortKey: 'ROLE'
      }
    ];

  ngOnInit() {
    this.http.getTableData().subscribe((data) => {
      this.testTableData = data;
      console.log("this.testTableData",this.testTableData)
    });
  }

  onScroll(){
    this.http.getTableData().subscribe((data) => {
      this.testTableData = data;
      console.log("this.testTableData",this.testTableData)
    });
  }
}
