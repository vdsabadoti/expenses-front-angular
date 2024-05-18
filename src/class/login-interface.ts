import {Expense} from "./expense";

export class LoginInterface {

  username:string;
  mail:string;
  password:string;

  constructor(username:string, mail:string, password:string) {
    this.mail = mail;
    this.password = password;
    this.username = username;
  }


}
