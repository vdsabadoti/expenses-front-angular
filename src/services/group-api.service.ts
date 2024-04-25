import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "../class/group";
import {User} from "../class/user";
import {Detail} from "../class/detail";
import {Expense} from "../class/expense";
import {CreateExpenseInterface} from "../class/create-expense-interface";

@Injectable({
  providedIn: 'root'
})
export class GroupApiService {

  private static URL:string = 'https://localhost/';
  //private static GET_ALL_GROUPS:string = 'getexpenses?id=';
  private static GET_ALL_GROUPS:string = 'getgroups/';
  private static GET_GROUP_BY_ID:string = 'getgroupbyid/';
  private static GET_DETAILS:string = 'getdetails/'
  private static GET_EXPENSE:string = 'getexpensebyid/';
  private static CREATE_GROUP:string = 'creategroup';
  private static UPDATE_GROUP:string = 'updategroup';
  private static CREATE_EXPENSE:string = 'createexpense';
  private static UPDATE_EXPENSE:string = 'updateexpense';
  private static DELETE_EXPENSE:string = 'deleteexpense/';
  private static DELETE_GROUP:string = 'deletegroup/';
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
    console.log(group);
    let url = GroupApiService.URL + GroupApiService.CREATE_GROUP;
    this.http.post<String>(url, group).subscribe(it =>
    {
      console.log(it);
    })
  }

  public updateGroup(group:Group){
    console.log(group);
    let url = GroupApiService.URL + GroupApiService.UPDATE_GROUP;
    this.http.post<String>(url, group).subscribe(it =>
    {
      console.log(it);
    })
  }

  public createExpense(expense:Expense, groupId:number){
    console.log('create')
    let url = GroupApiService.URL + GroupApiService.CREATE_EXPENSE;
    let body = new CreateExpenseInterface(groupId, expense);
    console.log(body)
    this.http.post<String>(url, body).subscribe(it =>
    {
      console.log(it);
    })
  }

  public updateExpense(expense:Expense, groupId:number){
    console.log('update')
    let url = GroupApiService.URL + GroupApiService.UPDATE_EXPENSE;
    let body = new CreateExpenseInterface(groupId, expense);
    console.log(body)
    this.http.post<String>(url, body).subscribe(it =>
    {
      console.log(it);
    })
  }

  public deleteExpense(expenseId:number){
    console.log('delete')
    let url = GroupApiService.URL + GroupApiService.DELETE_EXPENSE + expenseId;
    this.http.delete<String>(url).subscribe(it =>
    {
      console.log(it);
    })
  }

  public deleteGroup(groupId:number){
    console.log('delete group')
    let url = GroupApiService.URL + GroupApiService.DELETE_GROUP + groupId;
    this.http.delete<String>(url).subscribe(it =>
    {
      console.log(it);
    })
  }

}
