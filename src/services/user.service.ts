import {inject, Injectable} from '@angular/core';
import {LoginServiceService} from "./login-service.service";
import {User} from "../class/user";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginService = inject(LoginServiceService);
  private _usersAvailable:BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.loginService.getUsers());
  public readonly usersAvailable: Observable<User[]> = this._usersAvailable.asObservable();

  constructor() {
  }

  public updateUsersAvailable(user:User){
    let usersAvailableSnapshot = this._usersAvailable.getValue();
    let indexOfUserToDelete = usersAvailableSnapshot.map(e => e.username).indexOf(user.username);
    delete usersAvailableSnapshot[indexOfUserToDelete];
    this._usersAvailable.next(usersAvailableSnapshot);
    console.log(this._usersAvailable);
  }

  public getUsersAvailable(): Observable<User[]> {
    return this.usersAvailable;
  }

  public allUsersAreBackInTheGame() {
    this._usersAvailable.next(this.loginService.getUsers());
  }

}
