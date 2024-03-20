import {Component, inject, OnInit} from '@angular/core';
import {Group} from "../../class/group";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf} from "@angular/common";
import {GroupService} from "../../services/group.service";
import {AddParticipantsGroupComponent} from "../add-participants-group/add-participants-group.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ExpenseForm} from "../../class/expense-form";
import {Detail} from "../../class/detail";
import {Expense} from "../../class/expense";
import {Observable} from "rxjs";

@Component({
  selector: 'app-modify-expense',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    AddParticipantsGroupComponent,
    RouterLink,
    NgForOf
  ],
  templateUrl: './modify-expense.component.html',
  styleUrl: './modify-expense.component.css'
})
export class ModifyExpenseComponent implements OnInit {

  public group: Group | undefined;
  public expense : Expense | undefined;
  public details : Detail[] | undefined;
  private groupService = inject(GroupService)
  public expenseToUpdate: ExpenseForm | undefined ;
  public toggle : boolean = false;
  private newExpense: Expense | undefined;
  private expenseService = inject(GroupService);
  public id: string | null | undefined ;

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((paramMap) => {
      // read param from paramMap
      this.id = paramMap.get('id');
      // use parameter...
    });
  }

  async ngOnInit(){
    this.expenseService.getGroup()?.subscribe(it => this.group = it);
    this.expenseService.getExpense(Number(this.id)).subscribe(it => {
        this.expense = it
        console.log('EXPENSE is loaded : ')
        console.log(it);
      }
    );
    this.expenseService.getDetails(Number(this.id)).subscribe(it => {
      this.details = it
      console.log('DETAILS is loaded : ')
      console.log(it);

      if ((this.expense != undefined) && (this.group != undefined)){

        //TRANSFORM DEBT OR REFUND TO BOOLEAN (EXPENSE FROM USES BOOLEAN)
        let debtOrRefundToBool = false;
        if (this.expense.debtOrRefund == 0) {
          debtOrRefundToBool = true;
        }
        console.log('PAYOR ID is loaded : ')
        console.log(this.expense.payor?.id);

        //CREATE EXEPENSE FORM
        this.expenseToUpdate = new ExpenseForm(this.expense.value, this.expense.date, this.expense.label, this.expense.payor?.id, this.details, debtOrRefundToBool)

        //LOG IT
        console.log(this.expenseToUpdate);

      }

    });


  }

  createNewExpense(){
    /*
    let debtToNumber = 1; // 1 = debt
    if (this.toggle){
      debtToNumber = 0;
    }
    if ((this.expenseToUpdate != undefined) && (this.group != undefined)) {
      let payorId = this.expenseToUpdate.payorId;
      let payor = this.group.participantList.find(participant => participant.id == payorId);
      this.newExpense = new Expense(
        0,
        this.expenseToUpdate.value,
        this.expenseToUpdate.date,
        this.expenseToUpdate.label,
        payor?.user,
        this.expenseToUpdate.detailList,
        debtToNumber)
        if (this.group?.id){
          this.groupService.createExpense(this.newExpense, this.group.id);
        }
    }
    console.log(this.newExpense);

     */
  }

  debtOrRefund() {
    /*
    console.log('change')
    this.toggle = !this.toggle;
    */
  }

  dispathValues() {
    if ((this.expenseToUpdate != undefined) && (this.details != undefined)) {
      let individualAmount = this.expenseToUpdate?.value / this.details.length;
      for (let detail of this.details) {
        detail.value = individualAmount;
      }
    }
  }
}
