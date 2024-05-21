import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from "@angular/core";
import {StorageService} from "../storage.service";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";
import {GuardService} from "../../app/auths/guard.service";

export const headersInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const storageService = inject(StorageService)
  const router = inject(Router)
  const guardService = inject(GuardService)
  console.log('Headers interceptor call !')
  if (storageService.getUser()){
    req = req.clone({
      setHeaders:
        { Authorization: `Bearer ${storageService.getUser()?.token}` }
    })
  }
  return next(req).pipe(
    catchError(
      err => {
        if (err.status == 401 || err.status == 400 ){
          router.navigate(['/login']).then()
          guardService.logout()
          storageService.clean()
        }
        return throwError(() => new Error('Unauthorized Exception'));
      }
    )
  );
};
