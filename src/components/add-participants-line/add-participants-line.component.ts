import {Component, inject, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ParticipantsService} from "../../services/participants.service";
import {Participant} from "../../class/participant";

@Component({
  selector: 'app-add-participants-line',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-participants-line.component.html',
  styleUrl: './add-participants-line.component.css'
})
export class AddParticipantsLineComponent {
  @Input() user!: any;
  budget:number = 0;
  private participantsService = inject(ParticipantsService);

  public addParticipant(userid:number){
    this.participantsService.addParticipantToThisNewExpense(
      new Participant(userid, this.user, 0, this.budget, undefined)
    )
}

}
