import {User} from "./user";
import {Detail} from "./detail";

export class ExpenseForm {

  value:number;
  date:Date;
  label:string;
  payor:User;
  detailList: Detail[] | undefined;
  debtOrRefund:number;

  constructor(
    value:number,
    date:Date,
    label:string,
    payor:User,
    detailList: Detail[] | undefined,
    debtOrRefund:number
  ) {

    this.value =value;
    this.date = date;
    this.label = label;
    this.payor = payor;
    this.detailList = detailList;
    this.debtOrRefund = debtOrRefund;
  }

}
