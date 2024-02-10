import {inject, Injectable} from '@angular/core';
import {ParticipantsService} from "./participants.service";
import {UserService} from "./user.service";
import {Expense} from "../class/expense";
import {ExpenseForm} from "../class/expense-form";
import {User} from "../class/user";
import {LoginServiceService} from "./login-service.service";
import {Line} from "../class/line";
import {ExpenseApiService} from "./expense-api.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  //EXPENSES FROM THE USER : TO HYDRATE WITH EXPENSES FROM DB
  private expenses: Observable<Expense[]> | undefined;
  private expense: Observable<Expense> | undefined;
  private participantsService = inject(ParticipantsService);
  private usersService = inject(UserService);
  private expenseApiService = inject(ExpenseApiService);

  constructor() {
    /*
    this.expenses = [new Expense(2, 0, 0, 'Tennis', 'kill',
      this.loginService.getUsers()[0], this.participantsService.getParticipantsForTest(), new Array<Line>()),
      new Expense(1, 0, 0, 'Love', 'kill',
        this.loginService.getUsers()[0], this.participantsService.getParticipantsForTest(), new Array<Line>())
    ];*/
  }

  public getExpenses(idUser:number) : Observable<Expense[]> {
    this.expenses = this.expenseApiService.getExpensesFromUser(idUser);
    return this.expenses;
  }

  public getExpense() : Observable<Expense> | undefined {
    return this.expense;
  }

  public async createExpense(newExpense:ExpenseForm){
    //CREATE EXPENSE IN DB
    let totalBudgetByMonth = 0;
    this.participantsService.listParticipantsOfThisNewExpense().forEach(
      (p)=> {totalBudgetByMonth += p.budgetByMonth}
    );
    //TODO : create expense
    //IF OK => set addedParticipants to zero (participants service)
    this.participantsService.eraseParticipantsForLaterExpense();
    //IF OK => set allusersbackinthegame (users service)
    await this.usersService.allUsersAreBackInTheGame();
    console.log(this.expenses);
  }

  public setExpenseDetail(id:number) : void {
    this.expense = this.expenseApiService.getExpenseById(id);
  }
}
