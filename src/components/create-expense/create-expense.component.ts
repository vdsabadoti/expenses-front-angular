import {Component, inject} from '@angular/core';
import {AddParticipantsComponent} from "../add-participants/add-participants.component";
import {LoginServiceService} from "../../services/login-service.service";
import {ParticipantsService} from "../../services/participants.service";

@Component({
  selector: 'app-create-expense',
  standalone: true,
  imports: [AddParticipantsComponent],
  templateUrl: './create-expense.component.html',
  styleUrl: './create-expense.component.css'
})
export class CreateExpenseComponent {

  private participantsService = inject(ParticipantsService);

  constructor() {
    //CREATE EXPENSE -> new empty list of participants
    //at the service layer, so we can add the participants
    //later
    this.participantsService.newExpense();
  }

}
