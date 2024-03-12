import {User} from "./user";

export class Detail {

  id:number;
  user:User;
  value:number;

  constructor(
    idLineDetail:number,
    user:User,
    value:number) {
    this.id = idLineDetail;
    this.user = user;
    this.value = value;
  }

}
