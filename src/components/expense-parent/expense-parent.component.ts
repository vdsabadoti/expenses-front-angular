import { Component } from '@angular/core';
import {GroupsFlowComponent} from "../groups-flow/groups-flow.component";
import {RouterOutlet} from "@angular/router";
import {ExpenseComponent} from "../expense/expense.component";

@Component({
  selector: 'app-expense-parent',
  standalone: true,
  imports: [GroupsFlowComponent, RouterOutlet, ExpenseComponent],
  templateUrl: './expense-parent.component.html',
  styleUrl: './expense-parent.component.css'
})
export class ExpenseParentComponent {

}
