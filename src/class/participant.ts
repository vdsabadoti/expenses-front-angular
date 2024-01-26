import {User} from "./user";
import {Expense} from "./expense";
export class Participant {

  idParticipant:number;
  user:User | undefined;
  balance:number;
  budgetByMonth:number;
  expense: Expense | undefined;

  constructor(idParticipant:number,  user:User| undefined, balance:number,  budgetByMonth:number, expense: Expense | undefined) {
    this.idParticipant = idParticipant;
    this.user = user;
    this.balance = balance;
    this.budgetByMonth = budgetByMonth;
    this.expense = expense;
  }

  public setExpense(expense:Expense) : void {
    this.expense = expense;
}

}
