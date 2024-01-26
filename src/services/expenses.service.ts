import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private expenses: Array<any>;
  private expense: any;

  constructor() {
    this.expenses = [
      { id: 1, label : 'Rugby' },
      { id : 2, label : 'Tennis '}
    ];
  }

  public getExpenses() : Array<any> {
    return this.expenses;
  }

  public getExpense() : any {
    return this.expense;
  }

  public createExpense(){
    //CREATE EXPENSE IN DB
    this.expenses.push({id: 3, label: 'Test'})
    //IF OK => set addedParticipants to zero (participants service)
    //IF OK => set allusersbackinthegame (users service)
  }

  public setExpenseDetail(id:number) : void {
    let index:number = this.expenses.findIndex(item => item.id === id);
    this.expense = this.expenses[index];
  }
}
