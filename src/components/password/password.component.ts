import {Component, inject} from '@angular/core';
import {LoginServiceService} from "../../services/login-service.service";
import {FormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {

  private loginService = inject(LoginServiceService);
  public onlineUser:Observable<number> = new Observable<number>();
  public passwordControl:string = '';
  private password:string = 'corsaires';

  constructor() {
    this.onlineUser = this.loginService.getUserOnline().pipe(map(user => {return user.idUser}));
  }

  public passwordControlFunction() : void {
    if (this.passwordControl === this.password){
      this.loginService.authenticationSuccessful();
    }
  }

}
