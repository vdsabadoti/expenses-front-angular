import {Component, inject, OnInit} from '@angular/core';
import {Group} from "../../class/group";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {GroupService} from "../../services/group.service";
import {AddParticipantsGroupComponent} from "../add-participants-group/add-participants-group.component";
import {RouterLink} from "@angular/router";
import {Participant} from "../../class/participant";
import {ExpenseForm} from "../../class/expense-form";
import {TimeInterval} from "rxjs/internal/operators/timeInterval";
import {Detail} from "../../class/detail";
import {Expense} from "../../class/expense";

@Component({
  selector: 'app-create-expense',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    AddParticipantsGroupComponent,
    RouterLink,
    NgForOf
  ],
  templateUrl: './create-expense.component.html',
  styleUrl: './create-expense.component.css'
})
export class CreateExpenseComponent {

  public group: Group | undefined;
  private groupService = inject(GroupService)
  public expense: ExpenseForm | undefined ;
  public details: Detail[] ;
  public toggle : boolean = false;
  private newExpense: Expense | undefined;
  // private participants: Participant[];
  // private loginService = inject(LoginServiceService);

  constructor() {

    this.details = []
    this.groupService.getGroup()?.subscribe(it =>
    {
      this.group = it;
      for (let participant of this.group.participantList) {
        let detail = new Detail(0, participant.user, 0);
        this.details.push(detail);
      }
      this.expense = new ExpenseForm(0, new Date(),'',1 , this.details, false)
      console.log(this.details)
    })
  }

  createNewExpense(){
    let debtToNumber = 1; // 1 = debt
    if (this.toggle){
      debtToNumber = 0;
    }
    if ((this.expense != undefined) && (this.group != undefined)) {
      let payorId = this.expense.payorId;
      let payor = this.group.participantList.find(participant => participant.id == payorId);
      this.newExpense = new Expense(
        0,
        this.expense.value,
        this.expense.date,
        this.expense.label,
        payor?.user,
        this.expense.detailList,
        debtToNumber)
        if (this.group?.id){
          this.groupService.createExpense(this.newExpense, this.group.id);
        }
    }
    console.log(this.newExpense);
  }

  debtOrRefund() {
    console.log('change')
    this.toggle = !this.toggle;
  }

  dispathValues() {
    if (this.expense) {
      let individualAmount = this.expense?.value / this.details.length;
      for (let detail of this.details) {
        detail.value = individualAmount;
      }
    }
  }
}
