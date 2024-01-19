import {Component, inject, Input} from '@angular/core';
import {ExpensesService} from "../../services/expenses.service";
import {FirstApiService} from "../../services/first-api.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Expense} from "../../class/expense";

@Component({
  selector: 'app-expense-detail',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './expense-detail.component.html',
  styleUrl: './expense-detail.component.css'
})
export class ExpenseDetailComponent {

  private expenseService = inject(ExpensesService);
  private firstApiService = inject(FirstApiService);
  public message$:Observable<string>;
  public expense: any;
  public expense$:Observable<Expense>;

  constructor() {
    this.expense = this.expenseService.getExpense();
    this.message$ = this.firstApiService.callJavaApp();
    this.expense$ = this.firstApiService.callOneExpese();
  }



}
