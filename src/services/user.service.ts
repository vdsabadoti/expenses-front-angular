import {inject, Injectable} from '@angular/core';
import {User} from "../class/user";
import {BehaviorSubject, map, Observable} from "rxjs";
import {UserApiService} from "./api/user-api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApiService = inject(UserApiService);
  public _usersAvailable:BehaviorSubject<Observable<User[]>>;

  //START OF THE APPLICATION : ALL USERS FROM DB ARE AVAILABLE
  //FOR A NEW EXPENSE
  constructor() {
    this._usersAvailable = new BehaviorSubject<Observable<User[]>>(this.getAllUsers());
  }

  //WHEN CREATING AN EXPENSE, EVERY TIME WE ADD A PARTICIPANT
  //THE USER'S EQUIVALENT MUST DROP OUT FROM THE LIST OF
  //AVAILABLE USERS TO ADD
  public updateUsersAvailable(userToDelete:User){
    const usersAvailableSnapshot: Observable<User[]> = this._usersAvailable.getValue();
    const itemsWithoutDeleted: Observable<User[]> =
      usersAvailableSnapshot.pipe(map(users => users.filter(user => user.username != userToDelete.username)));
    this._usersAvailable.next(itemsWithoutDeleted);
  }


  //WHEN THE EXPENSE IS CREATED, RESET THE LIST OF
  //USERS AVAILABLE TO GET BACK
  //ALL THE USERS THAT WERE DROPPED OUT
  //CAUSE CHOSEN FOR THE EXPENSE
  public async allUsersAreBackInTheGame() {
    let usersFromDataBase:Observable<User[]> = this.getAllUsers();
    this._usersAvailable.next(usersFromDataBase);
  }

   public getUsersFromDataBase(){
    return this.userApiService.getAllUsers()
  }


  public getAllUsers(): Observable<User[]> {
    return this.userApiService.getAllUsersDeprecated();
  }


  public getUserFromDatabaseAsObservable(id:number): Observable<User> {
    return this.userApiService.getUserById(id);
  }

}
