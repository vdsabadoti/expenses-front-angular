import {Group} from "./group";

export class User {
  id:number;
  username:string;
  mail:string | undefined;
  groupsList:Group[] | undefined;
  password:string | undefined;
  quote:string| undefined;
  image:string| undefined;

  constructor(
    idUser:number,
    username:string,
    mail:string | undefined,
    lstExpenses:Group[] | undefined,
    password:string | undefined,
    quote:string| undefined,
    image:string| undefined
  ) {
    this.id = idUser;
    this.mail = mail;
    this.password = password;
    this.groupsList = lstExpenses;
    this.username = username;
    this.quote = quote;
    this.image = image;
  }
}
