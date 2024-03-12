import {Component, inject, Input, OnInit} from '@angular/core';
import {Participant} from "../../class/participant";
import {BehaviorSubject, Observable} from "rxjs";
import {AddParticipantsGroupComponent} from "../add-participants-group/add-participants-group.component";
import {ParticipantsService} from "../../services/participants.service";
import {AsyncPipe} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-participants',
  standalone: true,
    imports: [
        AddParticipantsGroupComponent,
        AsyncPipe,
        ReactiveFormsModule
    ],
  templateUrl: './participants.component.html',
  styleUrl: './participants.component.css'
})
export class ParticipantsComponent {
  private participantsService = inject(ParticipantsService);
  public lstOfAddedParticipants$: Observable<Participant[]> = this.participantsService.$data;
  constructor() {
  }

}
