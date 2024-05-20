import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../class/user";
import {LoginInterface} from "../../class/login-interface";
import {UserTokenInterface} from "../../class/user-token-interface";
import {ResponseService} from "../../class/response-service";
import {StorageService} from "../storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private storageService = inject(StorageService)

  private static URL:string = 'https://localhost/';
  private static GET_ALL_USERS:string = 'getallusers';
  private static GET_USER_BY_ID:string = 'getuser?id='
  private static LOGIN:string = 'login'
  constructor(public http: HttpClient) { }

  public getAllUsers(): Observable<User[]>{
    let url:string = UserApiService.URL + UserApiService.GET_ALL_USERS;
    return this.http.get<User[]>(url);
  }

  public getUserById(id:number) : Observable<User> {
    let url:string = UserApiService.URL + UserApiService.GET_USER_BY_ID + id;
    return this.http.get<User>(url);
  }

  public login(data:LoginInterface) : Observable<ResponseService<UserTokenInterface>> {
    let url:string = UserApiService.URL + UserApiService.LOGIN;
    let body = data;
    return this.http.post<ResponseService<UserTokenInterface>>(url, body);
  }
}
