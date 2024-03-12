import {User} from "./user";
import {Participant} from "./participant";
import {Expense} from "./expense";
export class Group {
  id:number | undefined;
  balance:number;
  budgetByMonth:number;
  name:string;
  description:string;
  owner:User;
  participantList:Array<Participant>;
  expensesList:Array<Expense>;

  constructor(balance:number, budgetByMonth:number, expenseName:string, description:string,
              owner:User, participantList:Array<Participant>, lineList:Array<Expense>) {
    this.balance = balance;
    this.budgetByMonth =budgetByMonth;
    this.name = expenseName;
    this.description = description;
    this.owner = owner;
    this.participantList = participantList;
    this.expensesList = lineList;
  }

}
