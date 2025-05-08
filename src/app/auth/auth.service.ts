import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { tap } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    token: string;
  }


@Injectable({
  providedIn: 'root',
})
export class AuthService {
    user = signal<User | null>(null);

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
        this.user.set(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/authentication']);
    }

    private handleAuthentication(
        email: string, 
        token: string
    ) {
        const user = new User(email, token);
        this.user.set(user);
        //todo implement token expiration
        //todo use a safer way to store the token
        localStorage.setItem('userData',JSON.stringify(user));
    }

    register(name:string, email:string, password: string, confirmPassword:string, companyName:string) {
        return this.http.post(`${this.baseUrl}/authentication/register`,
            {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                companyName: companyName
            }
        ).pipe(
            tap(response => {
                console.log(response);
            }),
        )
    }

    activateUser(activationToken:string) {
        return this.http.post(`${this.baseUrl}/authentication/user/activation`, 
            {   
                password: "@Bcd1234",
                confirmPassword: "@Bcd1234",
                //password request from backend to be removed
                activationToken: activationToken
            });
    }

        // make a call to verify token? and redirect to Login page if 401 response
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
