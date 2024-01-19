import {Component, inject} from '@angular/core';
import {AddParticipantsComponent} from "../add-participants/add-participants.component";
import {LoginServiceService} from "../../services/login-service.service";

@Component({
  selector: 'app-create-expense',
  standalone: true,
  imports: [AddParticipantsComponent],
  templateUrl: './create-expense.component.html',
  styleUrl: './create-expense.component.css'
})
export class CreateExpenseComponent {



}
