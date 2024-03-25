import {Component, inject, Input} from '@angular/core';
import {GroupService} from "../../services/group.service";
import {Participant} from "../../class/participant";
import {Detail} from "../../class/detail";

@Component({
  selector: 'app-money-transfer',
  standalone: true,
  imports: [],
  templateUrl: './money-transfer.component.html',
  styleUrl: './money-transfer.component.css'
})
export class MoneyTransferComponent {

  private groupService: GroupService = inject(GroupService);
  public balanceList: { participant:Participant, value:number}[] = [];

  constructor() {
    this.groupService.getGroup()?.subscribe(it =>
    {
      for (let participantOfGroup of it.participantList){
        let balance = 0;
        let debt = 0;
        for (let expense of it.expensesList){
          if (participantOfGroup.user.id == expense.payor?.id){
            balance += expense.value;
          }
            if (expense.detailList != undefined){
            for (let detail of expense.detailList){
              if (detail.user.id == participantOfGroup.user.id){
                debt += detail.value;
              }
            }
          }
        }
        this.balanceList.push({
            participant: participantOfGroup,
            value: (balance-debt)
        }
        )
      }
    })
  }

}
