import {inject, Injectable} from '@angular/core';
import {User} from "../class/user";
import {UserApiService} from "./user-api.service";
import {UserService} from "./user.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private userService = inject(UserService);
  private users$: Observable<User[]>;
  private users: User[] | undefined;
  private userOnline: number = 1;
  public loggedIn:boolean = false;

  constructor() {
    this.users$ = this.userService.getUsersFromDatabaseAsObservable();
    this.userService.getUsersFromDatabaseAsObservable().subscribe(it =>
    this.users = it)
  }
    public getUsers() : Observable<User[]>{
      return this.users$;
    }
    public getUsersAvailable() : User[]| undefined{
      return this.users;
    }

    public setUserOnline(id:number) : void {
      this.userOnline = id;
    }

    public getUserOnline() : Observable<User> {
      return this.users$.pipe(map((items: User[]) => items[this.userOnline]));
    }

  public isUserAuthenticated() : boolean {
    return this.loggedIn;
  }

  public authenticationSuccessful() : void {
    this.loggedIn = true;
  }

  public getIdFromOnlineUser() : number {
    return this.userOnline;
  }


}
