import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {LoginServiceService} from "../../services/login-service.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private loginService = inject(LoginServiceService);
  public idUser:number = 0;
  public applicationName: string;

  constructor() {
    //this.idUser = this.loginService.getUserOnline().idUser;
    this.applicationName = "Group Expenses App"
  }


}
