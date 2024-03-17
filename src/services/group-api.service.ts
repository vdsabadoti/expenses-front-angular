import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "../class/group";
import {User} from "../class/user";
import {Detail} from "../class/detail";
import {Expense} from "../class/expense";

@Injectable({
  providedIn: 'root'
})
export class GroupApiService {

  private static URL:string = 'http://localhost:8080/';
  private static GET_ALL_GROUPS:string = 'getexpenses?id=';
  private static GET_GROUP_BY_ID:string = 'getsingleexpense?id=';
  private static GET_DETAILS:string = 'getlinedetail?id='
  private static GET_EXPENSE:string = 'getline?id=';
  private static CREATE_GROUP:string = 'creategroup';
  constructor(public http: HttpClient) { }

  public getGroupsFromUser(idUser:number): Observable<Group[]> {
    let url:string = GroupApiService.URL + GroupApiService.GET_ALL_GROUPS + idUser;
    return this.http.get<Group[]>(url);
  }

  public getGroupById(idExpense:number | undefined): Observable<Group> {
    let url:string = GroupApiService.URL + GroupApiService.GET_GROUP_BY_ID + idExpense;
    return this.http.get<Group>(url);
  }

  public getDetailsById(idExpense:number): Observable<Detail[]> {
    let url:string = GroupApiService.URL + GroupApiService.GET_DETAILS + idExpense;
    return this.http.get<Detail[]>(url);
  }

  public getExpense(expenseId:number): Observable<Expense> {
    let url = GroupApiService.URL + GroupApiService.GET_EXPENSE + expenseId;
    return this.http.get<Expense>(url);
  }

  public createGroup(group:Group){
    let url = GroupApiService.URL + GroupApiService.CREATE_GROUP
    console.log(group);
    this.http.post<String>(url, group);
  }

}
