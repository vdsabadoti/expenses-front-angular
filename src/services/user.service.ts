import {inject, Injectable} from '@angular/core';
import {LoginServiceService} from "./login-service.service";
import {User} from "../class/user";
import {BehaviorSubject, map, Observable} from "rxjs";
import {UserApiService} from "./user-api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApiService = inject(UserApiService);
  public _usersAvailable:BehaviorSubject<Observable<User[]>>;

  //START OF THE APPLICATION : ALL USERS FROM DB ARE AVAILABLE
  //FOR A NEW EXPENSE
  constructor() {
    this._usersAvailable = new BehaviorSubject<Observable<User[]>>(this.getUsersFromDatabaseAsObservable());
  }

  //WHEN CREATING AN EXPENSE, EVERY TIME WE ADD A PARTICIPANT
  //THE USER'S EQUIVALENT MUST DROP OUT FROM THE LIST OF
  //AVAILABLE USERS TO ADD
  public updateUsersAvailable(userToDelete:User){
    const usersAvailableSnapshot: Observable<User[]> = this._usersAvailable.getValue();
    const itemsWithoutDeleted: Observable<User[]> =
      usersAvailableSnapshot.pipe(map(users => users.filter(user => user.username != userToDelete.username)));
    console.log(itemsWithoutDeleted);
    this._usersAvailable.next(itemsWithoutDeleted);
  }


  //WHEN THE EXPENSE IS CREATED, RESET THE LIST OF
  //USERS AVAILABLE TO GET BACK
  //ALL THE USERS THAT WERE DROPPED OUT
  //CAUSE CHOSEN FOR THE EXPENSE
  public async allUsersAreBackInTheGame() {
    let usersFromDataBase:Observable<User[]> = this.getUsersFromDatabaseAsObservable();
    this._usersAvailable.next(usersFromDataBase);
  }


  //GET ALL THE USERS FROM DATABASE (option 1 => KO)
  //EX. FOR THE LOGIN PAGE
  //==> KO synchro, returns []
  public getUsersFromDataBase(){
    let response:User[] = [];
    this.userApiService.getAllUsers().subscribe(value => {
      response = value;
    });
    return response;
  }

  //GET USERS FROM DATABASE (option 2 => OK)
  //EX. FOR THE LOGIN PAGE
  //==> OK cause observable, so the component does subscription with ASYNC
  public getUsersFromDatabaseAsObservable(): Observable<User[]> {
    return this.userApiService.getAllUsers();
  }

  //GET ONE USER FROM DB
  //OBSERVABLE
  public getUserFromDatabaseAsObservable(id:number): Observable<User> {
    return this.userApiService.getUserById(id);
  }

}
