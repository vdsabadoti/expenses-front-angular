import {Component, inject, Input} from '@angular/core';
import {GroupService} from "../../services/group.service";
import {FirstApiService} from "../../services/first-api.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Group} from "../../class/group";
import {Expense} from "../../class/expense";
import {GroupStatisticsComponent} from "../group-statistics/group-statistics.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-expense-detail',
  standalone: true,
  imports: [
    AsyncPipe, GroupStatisticsComponent, RouterLink
  ],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {

  private expenseService = inject(GroupService);
  //public oldExpense: any;
  public group$:Observable<Group> | undefined;
  public expenses$:Observable<Expense[]> | undefined;
  @Input() month: number = new Date().getMonth();
  @Input() year: number = new Date().getFullYear();
  public monthList: String[] =
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  constructor() {
    //this.expense$ = this.firstApiService.callOneExpense();
    this.group$ = this.expenseService.getGroup();
    this.expenses$ = this.expenseService.filterExpensesByMonthAndYear(this.month, this.year);
  }

  public setMonthUp(){
    if (this.month >= 11) {
      this.year++;
      this.month = -1;
    }
    this.month++;
    this.expenses$ = this.expenseService.filterExpensesByMonthAndYear(this.month, this.year);
  }

  public setMonthDown(){
    if (this.month <= 0){
      this.year--;
      this.month = 12;
    }
    this.month--;
    this.expenses$ = this.expenseService.filterExpensesByMonthAndYear(this.month, this.year);
  }

}
