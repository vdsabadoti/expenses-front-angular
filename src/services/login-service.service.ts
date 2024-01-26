import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private users: Array<any> = [
    {
      id: 1, username: 'Mulan',
      quote: 'The flower that blooms in adversity is the rarest and most beautiful of all',
      image: 'https://recreio.uol.com.br/media/uploads/disney/mulan_capa.jpg'
    },
    {
      id: 2, username: 'Spiderman',
      quote: 'With great power comes great responsibility',
      image: 'https://assetsio.reedpopcdn.com/Spider-Banner_AVVWjOb.jpg?width=880&quality=80&format=jpg&dpr=2&auto=webp'
    },
  ];
  private userOnline: number = 0;
  public loggedIn:boolean = false;

  constructor() {
  }

  private createUsers() : void {
    this.users = [
      {
        id: 1, username: 'Mulan',
        quote: 'The flower that blooms in adversity is the rarest and most beautiful of all',
        image: 'https://recreio.uol.com.br/media/uploads/disney/mulan_capa.jpg'
      },
      {
        id: 2, username: 'Spiderman',
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

    public getUserOnline() : number {
      return this.userOnline;
    }

  public isUserAuthenticated() : boolean {
    return this.loggedIn;
  }

  public authenticationSuccessfull() : void {
    this.loggedIn = true;
  }


}
