import {Component, inject} from '@angular/core';
import {LoginServiceService} from "../../services/login-service.service";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {map, Observable} from "rxjs";
import {AsyncPipe, JsonPipe} from "@angular/common";


@Component({
  selector: 'app-password',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, AsyncPipe, JsonPipe],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {

  private loginService = inject(LoginServiceService);
  public onlineUser:Observable<number | undefined> = new Observable<number>();
  public passwordControl:string = '';
  private password:string = 'corsaires';
  private router:Router = inject(Router);

  constructor() {

    this.onlineUser = this.loginService.getUserOnline().pipe(map(user => {
      if (user != undefined){
        return user.id
      }
      return undefined
    }));

  }

  public passwordControlFunction() : void {
    if (this.passwordControl === this.password){
      this.loginService.authenticationSuccessful();
    }
  }

  back() {
    this.router.navigate(['/login']).then()
  }
}
