import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  private participants: Array<any> = [];

  constructor() { }

  private createParticipants() : Array<any> {
    return [
      { userId : 1, expenseId : 1, budget: 100 },
      { userId : 2, expenseId : 1, budget: 100 },
      { userId : 1, expenseId : 2, budget: 100 }
    ]
  }

}
