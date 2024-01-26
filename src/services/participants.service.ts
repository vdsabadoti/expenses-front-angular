import { Injectable } from '@angular/core';
import {Participant} from "../class/participant";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  private participants: Array<any> = [];
  private participantZero: Participant = new Participant(1, undefined, 10, 500, undefined);
  private participantsOfANewExpense: BehaviorSubject<Array<Participant>> = new BehaviorSubject<Array<Participant>>([this.participantZero]);
  public readonly data = this.participantsOfANewExpense.asObservable();

  constructor() { }

  public newExpense() : void {
    this.participantsOfANewExpense.next([]);
  }

  public addParticipantToThisNewExpense(participant:Participant) : void {
    let participantsSnapshot = this.participantsOfANewExpense.getValue();
    participantsSnapshot.push(participant);
    this.participantsOfANewExpense.next(participantsSnapshot);
  }

  public listParticipantsOfThisNewExpense() : Array<Participant> {
    return this.participantsOfANewExpense.getValue();
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
