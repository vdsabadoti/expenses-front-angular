import { Injectable } from '@angular/core';
import {Participant} from "../class/participant";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  private _participantsOfANewExpense: BehaviorSubject<Participant[]> = new BehaviorSubject<Participant[]>([]);
  public readonly data: Observable<Participant[]> = this._participantsOfANewExpense.asObservable();

  constructor() { }

  public eraseParticipantsForLaterExpense() : void {
    this._participantsOfANewExpense.next([]);
  }

  public addParticipantToThisNewExpense(participant:Participant) : void {
    let participantsAlreadyIn = this._participantsOfANewExpense.getValue();
    participantsAlreadyIn.push(participant);
    this._participantsOfANewExpense.next(participantsAlreadyIn);
  }

  public listParticipantsOfThisNewExpense() : Array<Participant> {
    return this._participantsOfANewExpense.getValue();
  }

  public getParticipantsForTest(): Participant[] {
    return [
      new Participant(1, undefined, 10, 500, undefined),
      new Participant(1, undefined, 10, 100, undefined)
    ]
  }

  private createParticipants() : Array<any> {
    return [
      { userId : 1, expenseId : 1, budget: 100 },
      { userId : 2, expenseId : 1, budget: 100 },
      { userId : 1, expenseId : 2, budget: 100 }
    ]
  }

}
