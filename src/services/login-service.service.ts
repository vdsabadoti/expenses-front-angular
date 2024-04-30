import {inject, Injectable} from '@angular/core';
import {User} from "../class/user";
import {UserService} from "./user.service";
import {map, Observable} from "rxjs";
import {GuardService} from "../app/auths/guard.service";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private userService = inject(UserService);
  private guardService = inject(GuardService)

  private users$: Observable<User[]>;
  private users: User[] | undefined;
  private userOnline: number = 0;

  constructor() {
    this.users$ = this.userService.getAllUsers();
    this.userService.getAllUsers().subscribe(it =>
    this.users = it)
  }

    public getUsers() : Observable<User[]>{
      return this.users$;
    }

    public getUsersAvailable() {
      return this.userService.getUsersFromDataBase();
    }

    public setUserOnline(id:number) : void {
      this.userOnline = id;
    }

    public getUserOnline() : Observable<User | undefined> {
      //return this.users$.pipe(map((items: User[]) => items[this.userOnline]));
      return this.users$.pipe(map(users => users.find(user => user.id = this.userOnline)));
    }

    public getIdUserOnline() : number {
      return this.userOnline;
    }


  public authenticationSuccessful() : void {
    this.guardService.login();
  }

  public getIdFromOnlineUser() : number {
    return this.userOnline;
  }


}
