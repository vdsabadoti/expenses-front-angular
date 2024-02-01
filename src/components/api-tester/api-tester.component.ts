import {Component, inject} from '@angular/core';
import {Observable} from "rxjs";
import {FirstApiService} from "../../services/first-api.service";
import {AsyncPipe} from "@angular/common";
import {User} from "../../class/user";
import {UserService} from "../../services/user.service";
import {UserApiService} from "../../services/user-api.service";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-api-tester',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './api-tester.component.html',
  styleUrl: './api-tester.component.css'
})
export class ApiTesterComponent {

  public readonly expenseById:Observable<String>;
  public readonly users:Observable<User[]>;
  private firstApiService = inject(FirstApiService);
  private userApiService = inject(UserApiService);

  constructor() {
    this.expenseById = this.firstApiService.callExpenseById(400);
    this.users = this.userApiService.getAllUsers();
  }

}
