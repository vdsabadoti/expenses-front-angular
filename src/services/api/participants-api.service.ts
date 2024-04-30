import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Participant} from "../../class/participant";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsApiService {

  private static URL:string = 'https://localhost/';
  private static GET_PARTICIPANTS_FROM_GROUP = 'getparticipants?groupid='

  constructor(public http: HttpClient) { }

  public getParticipantsFromGroup(groupId:number) : Observable<Participant[]>{
    let url = ParticipantsApiService.URL + ParticipantsApiService.GET_PARTICIPANTS_FROM_GROUP + groupId;
    return this.http.get<Participant[]>(url)
  }

}
