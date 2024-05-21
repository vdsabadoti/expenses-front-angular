import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  console.log('Headers interceptor call !')
  return next(req);
};
