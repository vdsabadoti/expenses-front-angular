import { Component } from '@angular/core';
import {ExpensesFlowComponent} from "../expenses-flow/expenses-flow.component";
import {RouterOutlet} from "@angular/router";
import {ExpenseDetailComponent} from "../expense-detail/expense-detail.component";

@Component({
  selector: 'app-expense-parent',
  standalone: true,
  imports: [ExpensesFlowComponent, RouterOutlet, ExpenseDetailComponent],
  templateUrl: './expense-parent.component.html',
  styleUrl: './expense-parent.component.css'
})
export class ExpenseParentComponent {

}
