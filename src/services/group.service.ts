import {inject, Injectable} from '@angular/core';
import {ParticipantsService} from "./participants.service";
import {UserService} from "./user.service";
import {Group} from "../class/group";
import {GroupForm} from "../class/group-form";
import {User} from "../class/user";
import {LoginServiceService} from "./login-service.service";
import {Expense} from "../class/expense";
import {GroupApiService} from "./group-api.service";
import {map, Observable} from "rxjs";
import {Detail} from "../class/detail";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  //EXPENSES FROM THE USER : TO HYDRATE WITH EXPENSES FROM DB
  private groups: Observable<Group[]> | undefined;
  private group: Observable<Group> | undefined;
  private participantsService = inject(ParticipantsService);
  private usersService = inject(UserService);
  private loginService = inject(LoginServiceService);
  private groupApiService = inject(GroupApiService);

  constructor() {
  }

  public getGroups(idUser:number) : Observable<Group[]> {
    this.groups = this.groupApiService.getGroupsFromUser(idUser);
    return this.groups;
  }

  public getGroup() : Observable<Group> | undefined {
    return this.group;
  }

  public async createGroup(newExpense:GroupForm){
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
    this.participantsService.listParticipantsOfThisNewGroup().forEach(
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
    this.participantsService.eraseParticipantsForLaterGroup();
    //IF OK => set allusersbackinthegame (users service)
    await this.usersService.allUsersAreBackInTheGame();

    //IF ERROR -> think about it

    console.log(this.groups);
  }

  public setGroupDetail(id:number) : void {
    this.group = this.groupApiService.getGroupById(id);
  }

  public filterExpensesByMonthAndYear(month:number, year:number) : Observable<Expense[]> | undefined {
    const expensesList : Observable<Expense[]> | undefined = this.group?.pipe(
      (map(groups => {
        return groups.expensesList.filter(expense => (
          new Date(expense.date).getMonth() == month && new Date(expense.date).getFullYear() == year
        ));
      })
    ));
    console.log(expensesList);
    return expensesList;
  }

  public getDetails(expenseId:number): Observable<Detail[]>{
    return this.groupApiService.getDetailsById(expenseId);
  }

  public getExpense(expenseId:number) : Observable<Expense> {
    return this.groupApiService.getExpense(expenseId);
  }

}