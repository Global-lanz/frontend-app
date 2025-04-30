import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    token: string;
  }


@Injectable({
  providedIn: 'root',
})
export class AuthService {
    user = new Subject<User>();

    http = inject(HttpClient);
    baseUrl = 'http://localhost:8080';

    login(email:string, password: string) {
        return this.http.post<AuthResponseData>('http://localhost:8080/authentication/login',
            {
                username: email,
                password: password,
            }
        ).pipe(
            tap(response => {
                this.handleAuthentication(email,response.token);
                console.log(response.token);
            })
        );
    }

    logout() {
        localStorage.removeItem('authUser');
    }

    private handleAuthentication(
        email: string, 
        token: string
    ) {
        const user = new User(email, token);
        this.user.next(user);
        localStorage.setItem('userData',JSON.stringify(user));
    }

}
