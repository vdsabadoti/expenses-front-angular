import {Participant} from "./participant";
import {LineDetail} from "./line-detail";

export class Line {

  idLine:number;
  value:number;
  date:Date;
  label:string;
  payor:Participant;
  lineDetailList: LineDetail[] | undefined;

  constructor(
    idLine:number,
  value:number,
  date:Date,
  label:string,
  payor:Participant,
  lineDetailList: LineDetail[] | undefined
  ) {
    this.idLine = idLine;
    this.value =value;
    this.date = date;
    this.label = label;
    this.payor = payor;
    this.lineDetailList = lineDetailList;
  }

}
