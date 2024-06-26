import {Component, inject, OnInit} from '@angular/core';
import {Group} from "../../class/group";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf} from "@angular/common";
import {AddParticipantsGroupComponent} from "../add-participants-group/add-participants-group.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ExpenseForm} from "../../class/expense-form";
import {Detail} from "../../class/detail";
import {Expense} from "../../class/expense";
import {NavigationService} from "../../services/navigation.service";
import {GroupService} from "../../services/group.service";

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

  private groupService : GroupService = inject(GroupService)
  private expenseService: GroupService = inject(GroupService);
  private navigationService : NavigationService = inject(NavigationService)
  private router : Router = inject(Router);

  public group: Group | undefined;
  public expense : Expense | undefined;
  public details : Detail[] | undefined;
  public expenseToUpdate: ExpenseForm | undefined ;
  public toggle : boolean = false;
  private newExpense: Expense | undefined;
  public id: string | null | undefined ;

  public valid: boolean = true;
  public errorMessage: String[] = [];

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

      this.expenseService.getDetails(Number(this.id)).subscribe(it => {
        this.details = it
        console.log('DETAILS is loaded : ')
        console.log(it);

        if ((this.expense != undefined) && (this.group != undefined)){

          //TRANSFORM DEBT OR REFUND TO BOOLEAN (EXPENSE FROM USES BOOLEAN)
          this.toggle = false;
          if (this.expense.debtOrRefund == 0) {
            this.toggle = true;
          }
          console.log('PAYOR ID is loaded : ')
          console.log(this.expense.payor?.id);

          //CREATE EXEPENSE FORM
          this.expenseToUpdate = new ExpenseForm(this.expense.value, this.expense.date, this.expense.label, this.expense.payor?.id, this.details, this.toggle)

          //LOG IT
          console.log(this.expenseToUpdate);

        }

      });

      }
    );



  }

  saveExpense(){

    this.errorMessage = [];
    this.valid = true;

    let expenseId = Number(this.id);
    let debtToNumber = 1; // 1 = debt
    if (this.toggle){
      debtToNumber = 0;
    }

    if (this.expenseToUpdate?.value == 0){
      this.errorMessage.push("Value is required");
      this.valid = false;
    }

    if (this.expenseToUpdate?.payorId == 0){
      this.errorMessage.push("Payor is required");
      this.valid = false;
    }

    if (this.expenseToUpdate?.label == ''){
      this.valid = false;
      this.errorMessage.push("Label is required");
    }

    if (this.expenseToUpdate?.detailList != undefined){
      let sum = 0;
      for (let detail of this.expenseToUpdate.detailList){
        sum += detail.value;
      }
      if (sum != this.expenseToUpdate.value){
        this.valid = false;
        this.errorMessage.push("You must calculate again...");
      }
    }

    if (this.valid) {
      if ((this.expenseToUpdate != undefined) && (this.group != undefined) && (this.expense != undefined)) {
        let payorId = this.expense.payor?.id;
        let payor = this.group.participantList.find(participant => participant.user.id == payorId);
        this.newExpense = new Expense(
          expenseId,
          this.expenseToUpdate.value,
          this.expenseToUpdate.date,
          this.expenseToUpdate.label,
          payor?.user,
          this.expenseToUpdate.detailList,
          debtToNumber);
        if (this.group?.id) {
          this.groupService.updateExpense(this.newExpense, this.group.id).then( r => {
            this.router.navigate(['expenses/detail']).then();
            console.log(this.newExpense);
          }
          );
        }
      }
    }
  }

  debtOrRefund() {
    console.log('change')
    this.toggle = !this.toggle;
  }

  dispathValues() {
    if ((this.expenseToUpdate != undefined) && (this.details != undefined)) {
      let individualAmount = this.expenseToUpdate?.value / this.details.length;
      for (let detail of this.details) {
        detail.value = individualAmount;
      }
    }
  }

  autoComplete(detailId:number) {
    /*if (this.expense && this.details) {
      let restToShare = 0;

      let triggerDetail = this.details.find(detail => detail.id == detailId);
      let detailsToUpdate = this.details.filter(detail => detail.id != detailId);

      if (triggerDetail != undefined) {
        restToShare = this.expense.value - triggerDetail.value;
      }
      let individualAmount = restToShare / detailsToUpdate.length;

      if (individualAmount > 0) {
        for (let detail of this.details) {
          if (detail.id != detailId) {
            detail.value = individualAmount;
          }
        }
      }
    }*/
  }


  cancel() {
    this.navigationService.back();
  }

  delete() {
    this.expenseService.deleteExpense(Number(this.id))
    this.router.navigate(['expenses/detail']).then();
  }
}
