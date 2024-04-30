import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {User} from "../../class/user";
import {Observable, Subject} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {LoginServiceService} from "../../services/login-service.service";

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

  public message: string | null = null;
  public users:User[] | undefined;
  public user:string = "https://assetsio.reedpopcdn.com/Spider-Banner_AVVWjOb.jpg?width=880&quality=80&format=jpg&dpr=2&auto=webp";


  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((paramMap) => {
      // read param from paramMap
      this.message = paramMap.get('message');
      // use parameter...
    });
    this.loginService.getUsers().subscribe(
      res => {
        this.users = res;
      }
    )
  }

  public updateUserOnline(id:number) : void {
    console.log("Id is " +  id)
    this.loginService.setUserOnline(id);
  }

}
