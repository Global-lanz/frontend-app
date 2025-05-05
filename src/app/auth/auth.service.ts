import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    token: string;
  }


@Injectable({
  providedIn: 'root',
})
export class AuthService {
    user = new BehaviorSubject<User | null>(null);

    private http = inject(HttpClient);
    private router = inject(Router);
    baseUrl = 'http://localhost:8080';

    login(email:string, password: string) {
        return this.http.post<AuthResponseData>(`${this.baseUrl}/authentication/login`,
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
        // this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/authentication']);
    }

    private handleAuthentication(
        email: string, 
        token: string
    ) {
        const user = new User(email, token);
        this.user.next(user);
        //todo implement token expiration
        //todo use a safer way to store the token
        localStorage.setItem('userData',JSON.stringify(user));
    }

    // autoLogin() {
    //     const userData: {
    //         email: string;
    //         _token: string;
    //     } = JSON.parse(localStorage.getItem('userData')!);
    //     if (!userData) {
    //         return;
    //     }
    //     const loadedUser = new User(userData.email, userData._token);
    //     this.user.next(loadedUser);
    // }

}
