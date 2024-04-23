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
import {Participant} from "../class/participant";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  //EXPENSES FROM THE USER : TO HYDRATE WITH EXPENSES FROM DB
  private groups: Observable<Group[]> | undefined;
  private group: Observable<Group> | undefined;
  private participantsService = inject(ParticipantsService);
  private usersService = inject(UserService);
  private groupApiService = inject(GroupApiService);

  constructor() {
    console.log('constructor of GroupService');
  }

  public getGroups(idUser:number) : Observable<Group[]> {
    this.groups = this.groupApiService.getGroupsFromUser(idUser);
    return this.groups;
  }

  public getGroup() : Observable<Group> | undefined {
    console.log('In the service');
    console.log(this.group);
    return this.group;
  }

  public async updateGroup(group : Group ){
    this.groupApiService.updateGroup(group);
    if (group.id != undefined){
      this.setGroupDetail(group.id);
    }
    await new Promise(f => setTimeout(f, 500));
}

  public async createGroup(newExpense:GroupForm, userOnline: User | undefined){
    //TODO : create group

    //INIT VARIABLES : budget by month and user
    let totalBudgetByMonth = 0;
    let participants : Participant[];

    //GET PARTICIPANTS
    participants = this.participantsService.listParticipantsOfThisNewGroup();

    //CALCULATE budget by month according to participants
    participants.forEach(
      (p)=> {totalBudgetByMonth += p.budgetByMonth}
    );

    if (userOnline != undefined){
      let group = new Group(0, totalBudgetByMonth, newExpense.label, newExpense.description,
        userOnline, participants, []
      );
      this.groupApiService.createGroup(group);
    }

    //IF OK => set addedParticipants to zero (participants service)
    //IF OK => set allusersbackinthegame (users service)
    await this.resetParticipants();

    //TODO replace await... but how ?
    await new Promise(f => setTimeout(f, 1000));

    //IF ERROR -> think about it

    console.log(this.groups);
  }

  public setGroupDetail(id:number) : void {
    console.log('Getting group from ID : ')
    console.log(id);
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

  public async createExpense(expense:Expense, groupId:number){
    this.groupApiService.createExpense(expense, groupId);
    await new Promise(f => setTimeout(f, 1000));
  }

  public async updateExpense(expense:Expense, groupId:number){
    this.groupApiService.updateExpense(expense, groupId);
    await new Promise(f => setTimeout(f, 1000));
  }
  public deleteExpense(expenseId:number){
    this.groupApiService.deleteExpense(expenseId);
  }

  public deleteGroup(groupId:number){
    this.groupApiService.deleteGroup(groupId);
  }

   public async resetParticipants(){
    //IF OK => set addedParticipants to zero (participants service)
    this.participantsService.eraseParticipantsForLaterGroup();
    //IF OK => set allusersbackinthegame (users service)
    await this.usersService.allUsersAreBackInTheGame();
  }

}
