import { Component } from '@angular/core';
import {GroupsFlowComponent} from "../groups-flow/groups-flow.component";
import {RouterOutlet} from "@angular/router";
import {GroupComponent} from "../group/group.component";

@Component({
  selector: 'app-expense-parent',
  standalone: true,
  imports: [GroupsFlowComponent, RouterOutlet, GroupComponent],
  templateUrl: './group-parent.component.html',
  styleUrl: './group-parent.component.css'
})
export class GroupParentComponent {

}
