import {inject, Injectable} from '@angular/core';
import {LoginServiceService} from "./login-service.service";
import {User} from "../class/user";
import {BehaviorSubject, Observable} from "rxjs";
import {UserApiService} from "./user-api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginService = inject(LoginServiceService);
  private userApiService = inject(UserApiService);
  private _usersAvailable:BehaviorSubject<User[]>;
  public readonly $usersAvailable: Observable<User[]>;

  constructor() {
    this._usersAvailable = new BehaviorSubject<User[]>(this.loginService.getUsers());
    this.$usersAvailable = this._usersAvailable.asObservable();
  }

  public updateUsersAvailable(user:User){
    const usersAvailableSnapshot = this._usersAvailable.getValue();
    const itemsWithoutDeleted = usersAvailableSnapshot.filter((u) => u.username !== user.username);
    //let indexOfUserToDelete = usersAvailableSnapshot.map(e => e.username).indexOf(user.username);
    //delete usersAvailableSnapshot[indexOfUserToDelete];
    this._usersAvailable.next(itemsWithoutDeleted);
    console.log(this._usersAvailable);
  }

  public getUsersAvailable(): Observable<User[]> {
    return this.$usersAvailable;
  }

  public async allUsersAreBackInTheGame() {
    let usersFromDataBase:User[] = this.loginService.getUsers();
    this._usersAvailable.next(usersFromDataBase);
  }

}
