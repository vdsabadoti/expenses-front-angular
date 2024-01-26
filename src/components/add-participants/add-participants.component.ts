import {Component, inject} from '@angular/core';
import {LoginServiceService} from "../../services/login-service.service";
import {AddParticipantsLineComponent} from "../add-participants-line/add-participants-line.component";
import {ParticipantsComponent} from "../participants/participants.component";
import {ParticipantsService} from "../../services/participants.service";
import {Participant} from "../../class/participant";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-add-participants',
  standalone: true,
  imports: [AddParticipantsLineComponent, ParticipantsComponent],
  templateUrl: './add-participants.component.html',
  styleUrl: './add-participants.component.css'
})
export class AddParticipantsComponent {

  private loginService = inject(LoginServiceService);
  public users:Array<any>;

  constructor() {
    this.users = this.loginService.getUsers();
  }

}
