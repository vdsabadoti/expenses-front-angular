import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../class/user";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private static URL:string = 'http://localhost:8080/';
  private static GET_ALL_USERS:string = 'getallusers';
  constructor(public http: HttpClient) { }

  public getAllUsers(): Observable<User[]>{
    let url:string = UserApiService.URL + UserApiService.GET_ALL_USERS;
    return this.http.get<User[]>(url);
  }

  getUserById(id:number) : undefined {
    return undefined;
  }

}
