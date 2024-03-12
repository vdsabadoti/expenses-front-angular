import {Component, inject} from '@angular/core';
import {AddParticipantsComponent} from "../add-participants/add-participants.component";
import {ParticipantsService} from "../../services/participants.service";
import {GroupService} from "../../services/group.service";
import {GroupForm} from "../../class/group-form";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-expense',
  standalone: true,
  imports: [AddParticipantsComponent, CommonModule, FormsModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent {

  public model:GroupForm = new GroupForm('', '');
  private participantsService = inject(ParticipantsService);
  private expensesService : GroupService = inject(GroupService);
  constructor(private router:Router) {
  }

  public createNewGroup(newExpense:GroupForm){
    this.expensesService.createGroup(newExpense);
    this.router.navigate(['/expenses/detail']);
  }

}
