import {User} from "./user";
import {Detail} from "./detail";
import {Participant} from "./participant";

export class ExpenseForm {

  value:number;
  date:Date;
  label:string;
  payor:Participant ;
  detailList: Detail[] | undefined;
  debtOrRefund:boolean;

  constructor(
    value:number,
    date:Date,
    label:string,
    payor: Participant,
    detailList: Detail[] | undefined,
    debtOrRefund:boolean
  ) {

    this.value =value;
    this.date = date;
    this.label = label;
    this.payor = payor;
    this.detailList = detailList;
    this.debtOrRefund = debtOrRefund;
  }

}
