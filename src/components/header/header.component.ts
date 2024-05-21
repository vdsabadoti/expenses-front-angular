import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {GuardService} from "../../app/auths/guard.service";
import {NavigationService} from "../../services/navigation.service";
import {LoginServiceService} from "../../services/login-service.service";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private storageService = inject(StorageService)
  private guardService = inject(GuardService)
  private navigation: NavigationService = inject(NavigationService)
  private router: Router = inject(Router);

  private loggedIn: Subject<boolean> = this.guardService.getLoginSubject();
  public loggedUserBoolean: boolean = false;
  public idUser:number = 0;
  public applicationName: string;

  constructor() {
    //this.idUser = this.loginService.getUserOnline().idUser;
    this.applicationName = "GROUP EXPENSES"
    this.loggedIn.subscribe(result => {
      this.loggedUserBoolean = result;
    })
  }

  logout(){
    this.guardService.logout();
    this.storageService.clean();
    this.router.navigate(['/login'])
  }

  back(){
    this.navigation.back();
  }

}
