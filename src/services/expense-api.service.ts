import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Expense} from "../class/expense";
import {User} from "../class/user";

@Injectable({
  providedIn: 'root'
})
export class ExpenseApiService {

  private static URL:string = 'http://localhost:8080/';
  private static GET_ALL_EXPENSES:string = 'getexpenses?id=';
  private static GET_EXPENSE_BY_ID:string = 'getsingleexpense?id=';
  constructor(public http: HttpClient) { }

  public getExpensesFromUser(idUser:number): Observable<Expense[]> {
    let url:string = ExpenseApiService.URL + ExpenseApiService.GET_ALL_EXPENSES + idUser;
    return this.http.get<Expense[]>(url);
  }

  public getExpenseById(idExpense:number): Observable<Expense> {
    let url:string = ExpenseApiService.URL + ExpenseApiService.GET_EXPENSE_BY_ID + idExpense;
    return this.http.get<Expense>(url);
  }

}
