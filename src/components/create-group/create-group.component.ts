import {Component, inject} from '@angular/core';
import {AddParticipantsComponent} from "../add-participants/add-participants.component";
import {ParticipantsService} from "../../services/participants.service";
import {GroupService} from "../../services/group.service";
import {GroupForm} from "../../class/group-form";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {User} from "../../class/user";
import {UserService} from "../../services/user.service";
import {LoginServiceService} from "../../services/login-service.service";

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
  private loginService = inject(LoginServiceService);
  private expensesService : GroupService = inject(GroupService);
  private userOnline : User | undefined;
  constructor(private router:Router) {
    this.loginService.getUserOnline().subscribe(it =>
    {
      this.userOnline = it;
    })
  }

  public createNewGroup(newGroup:GroupForm){
    this.expensesService.createGroup(newGroup, this.userOnline);
    this.router.navigate(['/expenses/detail']);
  }

}
