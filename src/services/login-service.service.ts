import {inject, Injectable} from '@angular/core';
import {User} from "../class/user";
import {UserApiService} from "./user-api.service";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private userApiService = inject(UserApiService);
  private users: User[] = [];
  private userOnline: number = 1;
  public loggedIn:boolean = false;

  constructor() {
    this.userApiService.getAllUsers().subscribe(value => {
      this.users = value;
      console.log(value); //works well
    });
  }
    public getUsers() : User[]{
      return this.users;
    }

    public setUserOnline(id:number) : void {
      this.userOnline = id;
    }

    public getUserOnline() : User {
      return this.users[this.userOnline];
    }

  public isUserAuthenticated() : boolean {
    return this.loggedIn;
  }

  public authenticationSuccessful() : void {
    this.loggedIn = true;
  }


}
