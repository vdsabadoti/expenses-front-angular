import {Component, inject, OnInit} from '@angular/core';
import {Group} from "../../class/group";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {AddParticipantsGroupComponent} from "../add-participants-group/add-participants-group.component";
import {Router, RouterLink} from "@angular/router";
import {Participant} from "../../class/participant";
import {ExpenseForm} from "../../class/expense-form";
import {TimeInterval} from "rxjs/internal/operators/timeInterval";
import {Detail} from "../../class/detail";
import {Expense} from "../../class/expense";
import {NavigationService} from "../../services/navigation.service";
import {GroupService} from "../../services/group.service";

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

  private groupService: GroupService = inject(GroupService)
  private navigationService: NavigationService = inject(NavigationService)
  private router : Router = inject(Router)

  public group: Group | undefined;
  public expense: ExpenseForm | undefined ;
  public details: Detail[] ;
  public toggle : boolean = false;
  private newExpense: Expense | undefined;
  private expenseFormControls: any;
  public formGroup: FormGroup<any>;

  // private participants: Participant[];
  // private loginService = inject(LoginServiceService);

  constructor() {

    this.details = []
    this.groupService.getGroup()?.subscribe(it =>
    {
      this.group = it;
      let i= 1;
      for (let participant of this.group.participantList) {
        let detail = new Detail(i, participant.user, 0);
        this.details.push(detail);
        i++
      }
      this.expense = new ExpenseForm(0, new Date(),'',1 , this.details, false)
      console.log(this.details)
    })


    //FORM CONTROL START ------------------------------------------------------------------------------------------------------
    this.expenseFormControls = {
      label : new FormControl(this.expense?.label, [Validators.required, Validators.maxLength(15)]),
      value : new FormControl(this.expense?.value, [Validators.required, Validators.pattern("^[0-9]*$"),
        Validators.minLength(1)]),
      date : new FormControl(this.expense?.date,[Validators.required, Validators.pattern(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)] ),
    }

    this.formGroup = new FormGroup(this.expenseFormControls);

    //FORM CONTROL END ------------------------------------------------------------------------------------------------------

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
          this.router.navigate(['/expenses/detail'])
        }


        //FORM CONTROL specifics ----------------------------------------------------------------------------------------------------
        this.expenseFormControls.label.valueChanges.subscribe((value: string) => {
          if (this.expenseFormControls.label.valid) {
            if (this.expense != undefined){
              this.expense.label = value;
              console.log(this.expense.label)
            }

          }
        }
      )
      //FORM CONTROL specifics ----------------------------------------------------------------------------------------------------

    }
    console.log(this.newExpense);



  }

  debtOrRefund() {
    console.log('change')
    this.toggle = !this.toggle;
  }

  dispathValues() {
    if (this.expense) {
      let i = 1;
      let individualAmount = this.expense?.value / this.details.length;
      for (let detail of this.details) {
        detail.value = individualAmount
      }
    }
  }

  autoComplete(detailId:number) {
    if (this.expense) {
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
    }
  }
  cancel() {
    this.navigationService.back();
  }
}
