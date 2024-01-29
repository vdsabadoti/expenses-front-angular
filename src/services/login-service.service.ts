import { Injectable } from '@angular/core';
import {User} from "../class/user";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private users: User[] = [
    {
      idUser: 1, username: 'Mulan', mail: '', lstExpenses: [], password: '',
      quote: 'The flower that blooms in adversity is the rarest and most beautiful of all',
      image: 'https://recreio.uol.com.br/media/uploads/disney/mulan_capa.jpg'
    },
    {
      idUser: 2, username: 'Spiderman', mail: '', lstExpenses: [], password: '',
      quote: 'With great power comes great responsibility',
      image: 'https://assetsio.reedpopcdn.com/Spider-Banner_AVVWjOb.jpg?width=880&quality=80&format=jpg&dpr=2&auto=webp'
    },
  ];
  private userOnline: number = 1;
  public loggedIn:boolean = false;

  constructor() {
  }

  private createUsers() : void {
    this.users = [
      {
        idUser: 1, username: 'Mulan', mail: '', lstExpenses: [], password: '',
        quote: 'The flower that blooms in adversity is the rarest and most beautiful of all',
        image: 'https://recreio.uol.com.br/media/uploads/disney/mulan_capa.jpg'
      },
      {
        idUser: 2, username: 'Spiderman', mail: '', lstExpenses: [], password: '',
        quote: 'With great power comes great responsibility',
        image: 'https://assetsio.reedpopcdn.com/Spider-Banner_AVVWjOb.jpg?width=880&quality=80&format=jpg&dpr=2&auto=webp'
      },
    ]
  }
    public getUsers() : Array<any> {
      return this.users;
    }

    public setUserOnline(id:number) : void {
      this.userOnline = id;
    }

    public getUserOnline() : User {
      return this.users[this.userOnline-1];
    }

  public isUserAuthenticated() : boolean {
    return this.loggedIn;
  }

  public authenticationSuccessfull() : void {
    this.loggedIn = true;
  }


}
