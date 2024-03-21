import {Component, inject, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Participant} from "../../class/participant";
import {User} from "../../class/user";
import {UserService} from "../../services/user.service";
import {ParticipantsService} from "../../services/participants.service";

@Component({
  selector: 'app-add-participants-line',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-participants-group.component.html',
  styleUrl: './add-participants-group.component.css'
})
export class AddParticipantsGroupComponent {
  @Input() user!: User;
  budget:number = 0;
  private participantsService = inject(ParticipantsService);
  private userService = inject(UserService);

  public addParticipant(userid:number){
    this.participantsService.addParticipantToThisNewGroup(
      new Participant(userid, this.user, 0, this.budget, undefined)
    )
    console.log(this.user);
    this.userService.updateUsersAvailable(this.user); //THE PROBLEM IS HERE !!!!!
}

}
