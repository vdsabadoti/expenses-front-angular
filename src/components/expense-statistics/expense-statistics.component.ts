import {Component, Input} from '@angular/core';
import {Expense} from "../../class/expense";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-expense-statistics',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './expense-statistics.component.html',
  styleUrl: './expense-statistics.component.css'
})
export class ExpenseStatisticsComponent {
  @Input() expense!: Expense;

  constructor() {
    let budgetByMonth : number = 10;
    let balance: number = 10;
  }

}
