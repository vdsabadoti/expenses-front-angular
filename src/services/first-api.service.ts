import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Expense} from "../class/expense";


@Injectable({
  providedIn: 'root'
})
export class FirstApiService {

  private url:string = 'http://localhost:8080/hello';
  constructor(public http: HttpClient) { }

  callJavaApp() : any {
    return this.http.get(this.url);
  }

  callExpenseById(id:number) : Observable<String> {
    let url = this.url + 'moto?id=' + id.toString();
    return this.http.get<String>(url);
  }

  callOneExpense() : Observable<Expense> {
    return this.http.get<Expense>('http://localhost:8080/expense');
  }

}
