import {Component, inject, Input, OnInit} from '@angular/core';
import {Participant} from "../../class/participant";
import {BehaviorSubject, Observable} from "rxjs";
import {AddParticipantsLineComponent} from "../add-participants-line/add-participants-line.component";
import {ParticipantsService} from "../../services/participants.service";
import {AsyncPipe} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-participants',
  standalone: true,
    imports: [
        AddParticipantsLineComponent,
        AsyncPipe,
        ReactiveFormsModule
    ],
  templateUrl: './participants.component.html',
  styleUrl: './participants.component.css'
})
export class ParticipantsComponent {
  private participantsService = inject(ParticipantsService);
  public lstOfAddedParticipants: Observable<Participant[]> = this.participantsService.data;
  constructor() {
  }

}
