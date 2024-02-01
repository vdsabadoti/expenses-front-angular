import {Expense} from "./expense";

export class User {
  idUser:number;
  username:string;
  mail:string | undefined;
  lstExpenses:Expense[] | undefined;
  password:string | undefined;
  quote:string| undefined;
  image:string| undefined;

  constructor(
    idUser:number,
    username:string,
    mail:string | undefined,
    lstExpenses:Expense[] | undefined,
    password:string | undefined,
    quote:string| undefined,
    image:string| undefined
  ) {
    this.idUser = idUser;
    this.mail = mail;
    this.password = password;
    this.lstExpenses = lstExpenses;
    this.username = username;
    this.quote = quote;
    this.image = image;
  }
}
