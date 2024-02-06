import {Component, inject} from '@angular/core';
import {LoginServiceService} from "../../services/login-service.service";
import {AddParticipantsLineComponent} from "../add-participants-line/add-participants-line.component";
import {ParticipantsComponent} from "../participants/participants.component";
import {ParticipantsService} from "../../services/participants.service";
import {Participant} from "../../class/participant";
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "../../services/user.service";
import {AsyncPipe} from "@angular/common";
import {User} from "../../class/user";

@Component({
  selector: 'app-add-participants',
  standalone: true,
  imports: [AddParticipantsLineComponent, ParticipantsComponent, AsyncPipe],
  templateUrl: './add-participants.component.html',
  styleUrl: './add-participants.component.css'
})
export class AddParticipantsComponent {

  private userService= inject(UserService);
  public users = this.userService._usersAvailable;

  constructor() {
  }

}
