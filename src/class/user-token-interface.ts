export class UserTokenInterface{

  idUser:number;
  token:string;

  constructor(idUser:number, token:string) {
    this.token = token;
    this.idUser = idUser;
  }

}
