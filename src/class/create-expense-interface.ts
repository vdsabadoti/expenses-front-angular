import {Expense} from "./expense";

export class CreateExpenseInterface {

  id:number;
  expense:Expense;

  constructor(id:number, expense:Expense) {
    this.id = id;
    this.expense = expense;
  }

}
