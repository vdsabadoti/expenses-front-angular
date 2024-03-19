import {Component, inject} from '@angular/core';
import {Group} from "../../class/group";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ExpenseForm} from "../../class/expense-form";
import {User} from "../../class/user";
import {LoginServiceService} from "../../services/login-service.service";
import {Participant} from "../../class/participant";

@Component({
  selector: 'app-create-expense',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-expense.component.html',
  styleUrl: './create-expense.component.css'
})
export class CreateExpenseComponent {

  public group: Group | undefined;
  // public expense: ExpenseForm;
  // private participants: Participant[];
  // private loginService = inject(LoginServiceService);

  constructor() {
    //GET THE LIST OF PARTICIPANTS OF THE GROUP
    // this.participants =
    //CREATE A NEW EXPENSE IF CREATION MODE, UPLOAD A EXPENSE IF MODIFICATION MODE
    // this.expense = new ExpenseForm(0,new Date,'', this.loginService.getUserOnline() ,'','')
    //////// CREATE AS MANY DETAILS AS PARTICIPANTS IF CREATION MODE, UPLOAD DETAILS IF MODIFICATION MODE
    //CREATION MODE => FOR EACH PARTICIPANT, NEW DETAIL WITH PARTICIPANT.GETUSER.GETID, GROUP.GETID, EXPENSE.GETID, VALUE = 0
    //MODIF MODE => FOR EACH PARTICIPANT, GETDETAIL BY PARTICIPNAT.GETUSER.GETID,


  }

  createNewExpense(){
    //TODO
  }

}
