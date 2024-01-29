import {Component, inject} from '@angular/core';
import {LoginServiceService} from "../../services/login-service.service";
import {FormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {

  private loginService = inject(LoginServiceService);
  public onlineUser:number = 0;
  public passwordControl:string = '';
  private password:string = 'corsaires';

  constructor() {
    this.getUserOnline();
  }

  public getUserOnline() : void {
    this.onlineUser = this.loginService.getUserOnline().idUser;
  }

  public passwordControlFunction() : void {
    if (this.passwordControl === this.password){
      this.loginService.authenticationSuccessfull();
    }
  }

}
