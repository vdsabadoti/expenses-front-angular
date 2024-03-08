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
import {LineDetail} from "../class/line-detail";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  //EXPENSES FROM THE USER : TO HYDRATE WITH EXPENSES FROM DB
  private expenses: Observable<Expense[]> | undefined;
  private expense: Observable<Expense> | undefined;
  private participantsService = inject(ParticipantsService);
  private usersService = inject(UserService);
  private loginService = inject(LoginServiceService);
  private expenseApiService = inject(ExpenseApiService);

  constructor() {
  }

  public getExpenses(idUser:number) : Observable<Expense[]> {
    this.expenses = this.expenseApiService.getExpensesFromUser(idUser);
    return this.expenses;
  }

  public getExpense() : Observable<Expense> | undefined {
    return this.expense;
  }

  public async createExpense(newExpense:ExpenseForm){
    //TODO : create expense

    //INIT VARIABLES : budget by month and user
    let totalBudgetByMonth = 0;
    let userOnline : User;

    //GET USER ONLINE
    this.loginService.getUserOnline().subscribe(data => {
      if (data != undefined) {
        userOnline = data
      }
    })

    //CALCULATE budget by month according to participants
    this.participantsService.listParticipantsOfThisNewExpense().forEach(
      (p)=> {totalBudgetByMonth += p.budgetByMonth}
    );

    //CREATE EXPENSE with above data
    /*
    let expense = new Expense(0, totalBudgetByMonth, newExpense.label, newExpense.description,
      userOnline, this.participantsService.listParticipantsOfThisNewExpense(), []
      );
     */

    //CREATE EXPENSE THANKS TO SERVICE
    // --> create api call with Expense object ... callback function with OK or ERROR ->

    //IF OK => set addedParticipants to zero (participants service)
    this.participantsService.eraseParticipantsForLaterExpense();
    //IF OK => set allusersbackinthegame (users service)
    await this.usersService.allUsersAreBackInTheGame();

    //IF ERROR -> think about it

    console.log(this.expenses);
  }

  public setExpenseDetail(id:number) : void {
    this.expense = this.expenseApiService.getExpenseById(id);
  }

  public filterLinesByMonthAndYear(month:number, year:number) : Observable<Line[]> | undefined {
    const lineList : Observable<Line[]> | undefined = this.expense?.pipe(
      (map(expenses => {
        return expenses.lineList.filter(line => (
          new Date(line.date).getMonth() == month && new Date(line.date).getFullYear() == year
        ));
      })
    ));
    console.log(lineList);
    return lineList;
  }

  public filterLinesByMonthAndYearTest(month:number, year:number) : Line[] | undefined {
    let lineList;
    this.expense?.subscribe(
      (expenses => {
        lineList = expenses.lineList.filter(line => (
            new Date(line.date).getMonth() == month && new Date(line.date).getFullYear() == year
          ));
        })
      );
    console.log(lineList);
    return lineList;
  }

  public getLineDetails(expenseLineId:number): Observable<LineDetail[]>{
    return this.expenseApiService.getLineDetails(expenseLineId);
  }

  public getLine(lineId:number) : Observable<Line> {
    return this.expenseApiService.getLine(lineId);
  }

}
