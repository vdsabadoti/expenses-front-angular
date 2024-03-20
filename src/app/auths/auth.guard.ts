import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {GuardService} from "./guard.service";
import {Subject} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const guardService : GuardService = inject(GuardService);

  if (guardService.isAuthenticated()){
    return true;
  }
  router.navigate(['login'], {
    queryParams: { message : "Please log in to go further "}
  });
  return false;

};
