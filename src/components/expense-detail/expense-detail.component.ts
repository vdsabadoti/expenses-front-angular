import {Component, inject, Input} from '@angular/core';
import {ExpensesService} from "../../services/expenses.service";
import {FirstApiService} from "../../services/first-api.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Expense} from "../../class/expense";
import {ExpenseStatisticsComponent} from "../expense-statistics/expense-statistics.component";

@Component({
  selector: 'app-expense-detail',
  standalone: true,
  imports: [
    AsyncPipe, ExpenseStatisticsComponent
  ],
  templateUrl: './expense-detail.component.html',
  styleUrl: './expense-detail.component.css'
})
export class ExpenseDetailComponent {

  private expenseService = inject(ExpensesService);
  private firstApiService = inject(FirstApiService);
  public message$:Observable<string>;
  public oldExpense: any;
  public expense$:Observable<Expense>;

  constructor() {
    this.oldExpense = this.expenseService.getExpense();
    this.message$ = this.firstApiService.callJavaApp();
    this.expense$ = this.firstApiService.callOneExpense();
  }



}
