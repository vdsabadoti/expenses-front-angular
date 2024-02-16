import {User} from "./user";

export class LineDetail {

  idLineDetail:number;
  user:User;
  value:number;

  constructor(
    idLineDetail:number,
    user:User,
    value:number) {
    this.idLineDetail = idLineDetail;
    this.user = user;
    this.value = value;
  }

}
