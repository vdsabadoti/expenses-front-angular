import {Participant} from "./participant";

export class ModifyGroupForm {

  public label:string;
  public description:string ;
  public participants:Participant[] | undefined;
  constructor(label:string , description:string) {
    this.label = label;
    this.description = description;
    this.participants = [];
  }

}
