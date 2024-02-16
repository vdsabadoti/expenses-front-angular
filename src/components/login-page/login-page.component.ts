import {Component, inject} from '@angular/core';
import {LoginServiceService} from "../../services/login-service.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {User} from "../../class/user";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    AsyncPipe
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private loginService = inject(LoginServiceService);
  public users$:Observable<User[]>;
  public user:string = "https://assetsio.reedpopcdn.com/Spider-Banner_AVVWjOb.jpg?width=880&quality=80&format=jpg&dpr=2&auto=webp";


  constructor() {
    this.users$ = this.loginService.getUsers();
  }

  public updateUserOnline(id:number) : void {
    this.loginService.setUserOnline(id);
  }


}
