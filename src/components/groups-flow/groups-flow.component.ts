import {Component, inject} from '@angular/core';
import {GroupService} from "../../services/group.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Observable} from "rxjs";
import {Group} from "../../class/group";
import {LoginServiceService} from "../../services/login-service.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-expenses-flow',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    AsyncPipe
  ],
  templateUrl: './groups-flow.component.html',
  styleUrl: './groups-flow.component.css'
})
export class GroupsFlowComponent {

  public groups$: Observable<Group[]>;
  private expensesService = inject(GroupService);
  private loginService = inject(LoginServiceService);

  constructor() {
    this.groups$ = this.expensesService.getGroups(this.loginService.getIdFromOnlineUser());
  }

  public setGroupAtService(id:number) : void {
    this.expensesService.setGroupDetail(id);
  }

}
