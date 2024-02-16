import {Component, inject, Input} from '@angular/core';
import {ExpensesService} from "../../services/expenses.service";
import {FirstApiService} from "../../services/first-api.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Expense} from "../../class/expense";
import {Line} from "../../class/line";
import {ExpenseStatisticsComponent} from "../expense-statistics/expense-statistics.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-expense-detail',
  standalone: true,
  imports: [
    AsyncPipe, ExpenseStatisticsComponent, RouterLink
  ],
  templateUrl: './expense-detail.component.html',
  styleUrl: './expense-detail.component.css'
})
export class ExpenseDetailComponent {

  private expenseService = inject(ExpensesService);
  private firstApiService = inject(FirstApiService);
  public message$:Observable<any>;
  //public oldExpense: any;
  public expense$:Observable<Expense> | undefined;
  @Input() month: number = new Date().getMonth();
  @Input() year: number = new Date().getFullYear();
  public monthList: String[] =
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  constructor() {
    //this.oldExpense = this.expenseService.getExpense();
    this.message$ = this.firstApiService.callJavaApp();
    //this.expense$ = this.firstApiService.callOneExpense();
    this.expense$ = this.expenseService.getExpense();
  }

  public setMonthUp(){
    if (this.month >= 11) {
      this.year++;
      this.month = -1;
    }
    this.month++;
  }

  public setMonthDown(){
    if (this.month <= 0){
      this.year--;
      this.month = 12;
    }
    this.month--;
  }

}
