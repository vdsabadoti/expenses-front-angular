import {inject, Injectable} from '@angular/core';
import {User} from "../class/user";
import {UserService} from "./user.service";
import {map, Observable} from "rxjs";
import {GuardService} from "../app/auths/guard.service";
import {GroupApiService} from "./api/group-api.service";
import {UserApiService} from "./api/user-api.service";
import {LoginInterface} from "../class/login-interface";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private userService = inject(UserService);
  private guardService = inject(GuardService)
  private userApiService = inject(UserApiService)

  private users$: Observable<User[]>;
  private users: User[] | undefined;
  private userOnline: number = 0;

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

    public setUserOnline(id:number) {
      this.userOnline = id;
      return this.userApiService.login(
        new LoginInterface("mulan", "mulan@gmail.com", "corsaires")
      );
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
