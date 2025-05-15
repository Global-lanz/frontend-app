import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { AuthService } from "./auth/auth.service";




//for debugging
export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log(req.url);
    return next(req).pipe(tap(event => {
        //only for non-error responses
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status, ' and body ', event.body);
      }
    }));
}

//error handling
export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    return next(req).pipe(catchError((error: HttpErrorResponse)=> {
        console.error(error.status,error.message);
        return throwError(() => new Error(error.error?.message || 'Something went wrong :( Please try again later.'))
        })
    );
}

//adding token to request
export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const authService = inject(AuthService);
  const user = authService.user();
  if (user && user.token) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });
    console.log('token added');
    return next(modifiedReq);
  }
  return next(req);
}
