import {Component, inject, OnInit} from '@angular/core';
import {GroupService} from "../../services/group.service";
import {NavigationService} from "../../services/navigation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Group} from "../../class/group";
import {ModifyGroupForm} from "../../class/modify-group-form";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe} from "@angular/common";
import {User} from "../../class/user";
import {LoginServiceService} from "../../services/login-service.service";

@Component({
  selector: 'app-modify-group',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './modify-group.component.html',
  styleUrl: './modify-group.component.css'
})
export class ModifyGroupComponent implements OnInit {

  private groupService : GroupService = inject(GroupService)
  private navigationService : NavigationService = inject(NavigationService)
  private router : Router = inject(Router);
  private loginService = inject(LoginServiceService);

  public groupToUpdate: ModifyGroupForm | undefined ;
  public group: Group | undefined;
  public idUserOnline : number | undefined;

  private id: string | null | undefined;

  constructor() {
    this.idUserOnline = this.loginService.getIdUserOnline();
  }

  async ngOnInit(){
    this.groupService.getGroup()?.subscribe(it => {
        //get the group from DB
        this.group = it;
        //create object for form (based on group)
        this.groupToUpdate = new ModifyGroupForm("","");
        this.groupToUpdate.label = it.name;
        this.groupToUpdate.description = it.description;
        this.groupToUpdate.participants = it.participantList;
      }
    );
  }

  saveGroup(){
    if (this.groupToUpdate?.participants != undefined && this.group?.id != undefined){
      for (let participant of this.groupToUpdate.participants){
        this.group.budgetByMonth += participant.budgetByMonth;
      }
    this.group.participantList = this.groupToUpdate.participants;
    this.group.name = this.groupToUpdate.label;
    this.group.description = this.groupToUpdate.description;
    this.groupService.updateGroup(this.group);
    this.groupService.setGroupDetail(this.group.id);
    }
    console.log(this.group);

    this.router.navigate(['expenses/detail']).then();
  }

  deleteGroup(){
    if (this.group?.id){
      this.groupService.deleteGroup(this.group.id);
    }
    this.navigationService.back();
  }

  retour(){

  }

}
