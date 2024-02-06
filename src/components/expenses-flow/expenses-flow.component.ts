import {Component, inject} from '@angular/core';
import {ExpensesService} from "../../services/expenses.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Observable} from "rxjs";
import {Expense} from "../../class/expense";
import {LoginServiceService} from "../../services/login-service.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-expenses-flow',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    AsyncPipe
  ],
  templateUrl: './expenses-flow.component.html',
  styleUrl: './expenses-flow.component.css'
})
export class ExpensesFlowComponent {

  public expenses: Observable<Expense[]>;
  private expensesService = inject(ExpensesService);
  private loginService = inject(LoginServiceService);

  constructor() {
    this.expenses = this.expensesService.getExpenses(this.loginService.getIdFromOnlineUser());
  }

  public setExpenseAtService(id:number) : void {
    this.expensesService.setExpenseDetail(id);
  }

}
