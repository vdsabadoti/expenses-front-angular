import {Component, inject} from '@angular/core';
import {AsyncPipe, DatePipe} from "@angular/common";
import {GroupStatisticsComponent} from "../group-statistics/group-statistics.component";
import {GroupService} from "../../services/group.service";
import {map, Observable, pipe} from "rxjs";
import {Group} from "../../class/group";
import {Detail} from "../../class/detail";
import {ActivatedRoute} from "@angular/router";
import {Expense} from "../../class/expense";

@Component({
  selector: 'app-expense-line-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    GroupStatisticsComponent,
    DatePipe
  ],
  templateUrl: './expense-detail.component.html',
  styleUrl: './expense-detail.component.css'
})
export class ExpenseDetailComponent {

  private expenseService = inject(GroupService);
  public group$:Observable<Group> | undefined;
  public details$:Observable<Detail[]> | undefined;
  public expense$:Observable<Expense> | undefined;
  public id: string | null | undefined ;

  constructor(private route: ActivatedRoute) {
    this.group$ = this.expenseService.getGroup();
    this.route.queryParamMap.subscribe((paramMap) => {
      // read param from paramMap
      this.id = paramMap.get('id');
      // use parameter...
    });
    this.details$ = this.expenseService.getDetails(Number(this.id));
    this.expense$ = this.expenseService.getExpense(Number(this.id));
  }

}
