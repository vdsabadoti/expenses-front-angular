import {Participant} from "./participant";
import {Detail} from "./detail";
import {User} from "./user";

export class Expense {

  id:number;
  value:number;
  date:Date;
  label:string;
  payor:User;
  detailList: Detail[] | undefined;
  debtOrRefund:number;

  constructor(
    idLine:number,
  value:number,
  date:Date,
  label:string,
  payor:User,
  lineDetailList: Detail[] | undefined,
    debtOrRefund:number
  ) {
    this.id = idLine;
    this.value =value;
    this.date = date;
    this.label = label;
    this.payor = payor;
    this.detailList = lineDetailList;
    this.debtOrRefund = debtOrRefund;
  }

}
