import {User} from "./user";
import {Participant} from "./participant";
import {Line} from "./line";
export class Expense {
  idExpense:number | undefined;
  balance:number;
  budgetByMonth:number;
  expenseName:string;
  description:string;
  owner:User;
  participantList:Array<Participant>;
  lineList:Array<Line>;

  constructor(balance:number, budgetByMonth:number, expenseName:string, description:string,
              owner:User, participantList:Array<Participant>, lineList:Array<Line>) {
    this.balance = balance;
    this.budgetByMonth =budgetByMonth;
    this.expenseName = expenseName;
    this.description = description;
    this.owner = owner;
    this.participantList = participantList;
    this.lineList = lineList;
  }

}
