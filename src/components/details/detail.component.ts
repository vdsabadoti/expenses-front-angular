import {Component, inject} from '@angular/core';
import {AsyncPipe, DatePipe} from "@angular/common";
import {GroupStatisticsComponent} from "../group-statistics/group-statistics.component";
import {map, Observable, pipe} from "rxjs";
import {Group} from "../../class/group";
import {Detail} from "../../class/detail";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Expense} from "../../class/expense";
import {GroupService} from "../../services/group.service";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-expense-line-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    GroupStatisticsComponent,
    DatePipe,
    RouterLink
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {

  private expenseService = inject(GroupService);
  private navigationService : NavigationService = inject(NavigationService)

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

  delete(){
    if (this.id){
      this.expenseService.deleteExpense(Number(this.id));
      this.navigationService.back();
    }
  }

}
