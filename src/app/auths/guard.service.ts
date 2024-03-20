import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  private loggedUser: Subject<boolean> = new Subject();
  public loggedUserBoolean: boolean = false;
  constructor() {
  }


  isAuthenticated(){
    return this.loggedUserBoolean;
  }
  getLoginSubject(){
    return this.loggedUser;
  }

  login(){
    this.loggedUserBoolean = true;
    this.loggedUser.next(true);
  }

  logout(){
    this.loggedUserBoolean = false;
    this.loggedUser.next(false);
  }

}
