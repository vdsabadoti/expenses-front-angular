import {Component, inject} from '@angular/core';
import {LoginServiceService} from "../../services/login-service.service";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
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
  private router:Router = inject(Router);

  constructor() {
    this.onlineUser = this.loginService.getUserOnline().pipe(map(user => {return user.id}));
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
