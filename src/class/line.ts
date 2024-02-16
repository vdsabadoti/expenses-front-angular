import {Participant} from "./participant";
import {LineDetail} from "./line-detail";
import {User} from "./user";

export class Line {

  idLine:number;
  value:number;
  date:Date;
  label:string;
  payor:User;
  lineDetailList: LineDetail[] | undefined;
  debtOrRefund:number;

  constructor(
    idLine:number,
  value:number,
  date:Date,
  label:string,
  payor:User,
  lineDetailList: LineDetail[] | undefined,
    debtOrRefund:number
  ) {
    this.idLine = idLine;
    this.value =value;
    this.date = date;
    this.label = label;
    this.payor = payor;
    this.lineDetailList = lineDetailList;
    this.debtOrRefund = debtOrRefund;
  }

}
