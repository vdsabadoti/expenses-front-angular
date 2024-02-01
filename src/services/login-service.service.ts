import {inject, Injectable} from '@angular/core';
import {User} from "../class/user";
import {UserApiService} from "./user-api.service";
import {Observable} from "rxjs";

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
      this.users = value
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
      return this.users[0];
    }

  public isUserAuthenticated() : boolean {
    return this.loggedIn;
  }

  public authenticationSuccessfull() : void {
    this.loggedIn = true;
  }


}
