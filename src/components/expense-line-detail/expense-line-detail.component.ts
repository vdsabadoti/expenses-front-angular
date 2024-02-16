import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {ExpenseStatisticsComponent} from "../expense-statistics/expense-statistics.component";
import {ExpensesService} from "../../services/expenses.service";
import {map, Observable} from "rxjs";
import {Expense} from "../../class/expense";
import {LineDetail} from "../../class/line-detail";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-expense-line-detail',
  standalone: true,
    imports: [
        AsyncPipe,
        ExpenseStatisticsComponent
    ],
  templateUrl: './expense-line-detail.component.html',
  styleUrl: './expense-line-detail.component.css'
})
export class ExpenseLineDetailComponent {

  private expenseService = inject(ExpensesService);
  public expense$:Observable<Expense> | undefined;
  public lines$:Observable<LineDetail[]> | undefined;
  public idLineInt: string | null | undefined ;

  constructor(private route: ActivatedRoute) {
    this.expense$ = this.expenseService.getExpense();
    this.route.queryParamMap.subscribe((paramMap) => {
      // read param from paramMap
      this.idLineInt = paramMap.get('idLine');
      // use parameter...
    });
    this.lines$ = this.expenseService.getLineDetails(Number(this.idLineInt));
  }

}
