import {inject, Injectable} from '@angular/core';
import {Participant} from "../class/participant";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {LoginServiceService} from "./login-service.service";
import {ParticipantsApiService} from "./participants-api.service";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  private _participantsOfANewGroup: BehaviorSubject<Participant[]> = new BehaviorSubject<Participant[]>([]);
  public readonly $data: Observable<Participant[]> = this._participantsOfANewGroup.asObservable();
  private participantsApiService = inject(ParticipantsApiService);

  constructor() { }

  public eraseParticipantsForLaterGroup() : void {
    this._participantsOfANewGroup.next([]);
  }

  public addParticipantToThisNewGroup(participant:Participant) : void {
    let participantsAlreadyIn = this._participantsOfANewGroup.getValue();
    participantsAlreadyIn.push(participant);
    this._participantsOfANewGroup.next(participantsAlreadyIn);
  }

  public listParticipantsOfThisNewGroup() : Participant[] {
    return this._participantsOfANewGroup.getValue();
  }

}
