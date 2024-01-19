import {Component, inject} from '@angular/core';
import {ExpensesService} from "../../services/expenses.service";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-expenses-flow',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './expenses-flow.component.html',
  styleUrl: './expenses-flow.component.css'
})
export class ExpensesFlowComponent {

  public expenses: Array<any>;
  private expensesService = inject(ExpensesService);

  constructor() {
    this.expenses = this.expensesService.getExpenses();
  }

  public setExpenseAtService(id:number) : void {
    this.expensesService.setExpenseDetail(id);
  }

}
