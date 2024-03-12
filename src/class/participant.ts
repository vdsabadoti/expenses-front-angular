import {User} from "./user";
import {Group} from "./group";
export class Participant {

  id:number;
  user:User;
  balance:number;
  budgetByMonth:number;
  group: Group | undefined;

  constructor(idParticipant:number,  user:User, balance:number,  budgetByMonth:number, expense: Group | undefined) {
    this.id = idParticipant;
    this.user = user;
    this.balance = balance;
    this.budgetByMonth = budgetByMonth;
    this.group = expense;
  }

  public setExpense(expense:Group) : void {
    this.group = expense;
}

}
