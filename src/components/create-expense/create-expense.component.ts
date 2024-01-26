import {Component, inject} from '@angular/core';
import {AddParticipantsComponent} from "../add-participants/add-participants.component";
import {ParticipantsService} from "../../services/participants.service";
import {ExpensesService} from "../../services/expenses.service";
import {ExpenseForm} from "../../class/expense-form";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-create-expense',
  standalone: true,
  imports: [AddParticipantsComponent, CommonModule, FormsModule],
  templateUrl: './create-expense.component.html',
  styleUrl: './create-expense.component.css'
})
export class CreateExpenseComponent {

  public model:ExpenseForm = new ExpenseForm(undefined, undefined);
  private participantsService = inject(ParticipantsService);
  private expensesService : ExpensesService = inject(ExpensesService);
  constructor() {
    //CREATE EXPENSE -> new empty list of participants
    //at the service layer, so we can add the participants
    //later
    //this.participantsService.newExpense();
  }

  public createExpense(){

  }

  public createNewExpense(newExpense:any){
    console.log('button clicked');
    this.expensesService.createExpense();
  }

}
