import {Component, inject} from '@angular/core';
import {AddParticipantsComponent} from "../add-participants/add-participants.component";
import {GroupForm} from "../../class/group-form";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {User} from "../../class/user";
import {NavigationService} from "../../services/navigation.service";
import { LoginServiceService } from '../../services/login-service.service';
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'app-create-expense',
  standalone: true,
  imports: [AddParticipantsComponent, CommonModule, FormsModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent {

  private loginService : LoginServiceService = inject(LoginServiceService);
  private expensesService : GroupService = inject(GroupService);
  private navigationService : NavigationService = inject(NavigationService)

  public model:GroupForm = new GroupForm('', '');
  private userOnline : User | undefined;
  constructor(private router:Router) {
    this.loginService.getUserOnline().subscribe((it: User | undefined) =>
    {
      this.userOnline = it;
    })
  }

  public createNewGroup(newGroup:GroupForm){
    this.expensesService.createGroup(newGroup, this.userOnline);
    this.router.navigate(['/expenses']);
  }

  public cancelCreation(){
    this.expensesService.resetParticipants().then();
    this.navigationService.back();
  }

}
