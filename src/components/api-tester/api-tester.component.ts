import {Component, inject} from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {FirstApiService} from "../../services/first-api.service";
import {AsyncPipe} from "@angular/common";
import {User} from "../../class/user";
import {UserService} from "../../services/user.service";
import {UserApiService} from "../../services/user-api.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Group} from "../../class/group";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'app-api-tester',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './api-tester.component.html',
  styleUrl: './api-tester.component.css'
})
export class ApiTesterComponent {

  //API Service (to delete, cause this component only talks with normal services)
  private firstApiService = inject(FirstApiService);

  //SERVICES
  private userService = inject(UserService);
  private expenseService = inject(GroupService);

  //VARIABLES
  public readonly expenseById: Observable<String>;

  //TESTING USERS AS OBSERVABLES OR NOT
  public users: User[] = [];
  public usersObservable$: Observable<User[]> | undefined;
  public oneUserObservable$: Observable<User> | undefined;
  public oneUserObservableFromObservableArray$: Observable<User> | undefined;
  public oneUser : User | undefined;

  //REAL LIFE
  public expensesObservableList: Observable<Group[]> | undefined;

  constructor() {
    this.expenseById = this.firstApiService.callExpenseById(400);
  }

  public showUsers() {
    this.users = this.userService.getUsersFromDataBase();
    this.usersObservable$ = this.userService.getUsersFromDatabaseAsObservable();
    console.log('Users from DB : ')
    console.log(this.users);
    console.log('Users from DB as observable : ')
    console.log(this.usersObservable$);
  }

  public async showOneUser() {
    //TRANSFORM OBSERVABLE OF ARRAY INTO OBSERVABLE OF ITEM
    this.oneUserObservableFromObservableArray$ = this.userService.getUsersFromDatabaseAsObservable().pipe(map((items: User[]) => items[0]));
    this.oneUserObservable$ = this.userService.getUserFromDatabaseAsObservable(2);
  }

  public showExpenses(){
    this.expensesObservableList = this.expenseService.getGroups(1);
    console.log(this.expensesObservableList);
  }
}
