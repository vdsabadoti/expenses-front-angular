import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "../../class/group";
import {Detail} from "../../class/detail";
import {Expense} from "../../class/expense";
import {CreateExpenseInterface} from "../../class/create-expense-interface";
import {ResponseService} from "../../class/response-service";

@Injectable({
  providedIn: 'root'
})
export class GroupApiService {

  private static URL:string = 'https://localhost/';

  //DEPRECATED ROUTES
  private static GET_ALL_GROUPS_DEPRECATED:string = 'getgroups/';
  private static GET_GROUP_BY_ID_DEPRECATED:string = 'getgroupbyid/';
  private static CREATE_GROUP_DEPRECATED:string = 'creategroup';
  private static UPDATE_GROUP_DEPRECATED:string = 'updategroup';
  private static DELETE_GROUP_DEPRECATED:string = 'deletegroup/';

  private static GET_EXPENSE_DEPRECATED:string = 'getexpensebyid/';
  private static CREATE_EXPENSE_DEPRECATED:string = 'createexpense';
  private static UPDATE_EXPENSE_DEPRECATED:string = 'updateexpense';
  private static DELETE_EXPENSE_DEPRECATED:string = 'deleteexpense/';

  private static GET_DETAILS_DEPRECATED:string = 'getdetails/'

  //API V2 ROUTES
  private static GET_ALL_GROUPS:string = '/v2/getgroups/';
  private static GET_GROUP_BY_ID:string = '/v2/getgroupbyid/';
  private static CREATE_GROUP:string = '/v2/creategroup';
  private static UPDATE_GROUP:string = '/v2/updategroup';
  private static DELETE_GROUP:string = '/v2/deletegroup/';

  private static GET_EXPENSE:string = '/v2/getexpensebyid/';
  private static CREATE_EXPENSE:string = '/v2/createexpense';
  private static UPDATE_EXPENSE:string = '/v2/updateexpense';
  private static DELETE_EXPENSE:string = '/v2/deleteexpense/';

  private static GET_DETAILS:string = '/v2/getdetails/'

  constructor(public http: HttpClient) { }

  public getGroupsFromUserDeprecated(idUser:number): Observable<Group[]> {
    let url:string = GroupApiService.URL + GroupApiService.GET_ALL_GROUPS_DEPRECATED + idUser;
    return this.http.get<Group[]>(url);
  }

  public getGroupsFromUser(idUser:number): Observable<ResponseService<Group[]>> {
    let url:string = GroupApiService.URL + GroupApiService.GET_ALL_GROUPS + idUser;
    return this.http.get<ResponseService<Group[]>>(url);
  }

  //how to deal with code, message and data ?
  //should I extract the data ?

  public getGroupById(idExpense:number | undefined): Observable<Group> {
    let url:string = GroupApiService.URL + GroupApiService.GET_GROUP_BY_ID_DEPRECATED + idExpense;
    return this.http.get<Group>(url);
  }

  public getDetailsById(idExpense:number): Observable<Detail[]> {
    let url:string = GroupApiService.URL + GroupApiService.GET_DETAILS_DEPRECATED + idExpense;
    return this.http.get<Detail[]>(url);
  }

  public getExpense(expenseId:number): Observable<Expense> {
    let url = GroupApiService.URL + GroupApiService.GET_EXPENSE_DEPRECATED + expenseId;
    return this.http.get<Expense>(url);
  }

  public createGroup(group:Group){
    console.log(group);
    let url = GroupApiService.URL + GroupApiService.CREATE_GROUP_DEPRECATED;
    this.http.post<String>(url, group).subscribe(it =>
    {
      console.log(it);
    })
  }

  public updateGroup(group:Group){
    console.log(group);
    let url = GroupApiService.URL + GroupApiService.UPDATE_GROUP_DEPRECATED;
    this.http.post<String>(url, group).subscribe(it =>
    {
      console.log(it);
    })
  }

  public createExpense(expense:Expense, groupId:number){
    console.log('create')
    let url = GroupApiService.URL + GroupApiService.CREATE_EXPENSE_DEPRECATED;
    let body = new CreateExpenseInterface(groupId, expense);
    console.log(body)
    this.http.post<String>(url, body).subscribe(it =>
    {
      console.log(it);
    })
  }

  public updateExpense(expense:Expense, groupId:number){
    console.log('update')
    let url = GroupApiService.URL + GroupApiService.UPDATE_EXPENSE_DEPRECATED;
    let body = new CreateExpenseInterface(groupId, expense);
    console.log(body)
    this.http.post<String>(url, body).subscribe(it =>
    {
      console.log(it);
    })
  }

  public deleteExpense(expenseId:number){
    console.log('delete')
    let url = GroupApiService.URL + GroupApiService.DELETE_EXPENSE_DEPRECATED + expenseId;
    this.http.delete<String>(url).subscribe(it =>
    {
      console.log(it);
    })
  }

  public deleteGroup(groupId:number){
    console.log('delete group')
    let url = GroupApiService.URL + GroupApiService.DELETE_GROUP_DEPRECATED + groupId;
    this.http.delete<String>(url).subscribe(it =>
    {
      console.log(it);
    })
  }

}
