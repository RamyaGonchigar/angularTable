import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService implements OnInit{
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getTableData (){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
      return this.http.get('http://www.mocky.io/v2/5d19e0e32f0000a148fd729f', httpOptions);
  }
}


