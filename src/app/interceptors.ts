import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";

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

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    return next(req).pipe(catchError((error: HttpErrorResponse)=> {
        console.error(error.status,error.message);
        return throwError(() => new Error(error.error?.message || 'Something went wrong :( Please try again later.'))
        })
    );
}

