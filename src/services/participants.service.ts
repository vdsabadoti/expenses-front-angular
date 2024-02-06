import {inject, Injectable} from '@angular/core';
import {Participant} from "../class/participant";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {LoginServiceService} from "./login-service.service";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  private _participantsOfANewExpense: BehaviorSubject<Participant[]> = new BehaviorSubject<Participant[]>([]);
  public readonly $data: Observable<Participant[]> = this._participantsOfANewExpense.asObservable();
  private loginService = inject(LoginServiceService);

  constructor() { }

  public eraseParticipantsForLaterExpense() : void {
    this._participantsOfANewExpense.next([]);
  }

  public addParticipantToThisNewExpense(participant:Participant) : void {
    console.log(participant.user)
    let participantsAlreadyIn = this._participantsOfANewExpense.getValue();
    participantsAlreadyIn.push(participant);
    this._participantsOfANewExpense.next(participantsAlreadyIn);
  }

  public listParticipantsOfThisNewExpense() : Array<Participant> {
    return this._participantsOfANewExpense.getValue();
  }

  private createParticipants() : Array<any> {
    return [
      { userId : 1, expenseId : 1, budget: 100 },
      { userId : 2, expenseId : 1, budget: 100 },
      { userId : 1, expenseId : 2, budget: 100 }
    ]
  }

}
