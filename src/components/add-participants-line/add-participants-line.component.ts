import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-add-participants-line',
  standalone: true,
  imports: [],
  templateUrl: './add-participants-line.component.html',
  styleUrl: './add-participants-line.component.css'
})
export class AddParticipantsLineComponent {
  @Input() participant!: any;

}
