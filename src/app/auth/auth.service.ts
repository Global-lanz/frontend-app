import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { tap } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
    http = inject(HttpClient);
    baseUrl = 'http://localhost:8080';

    login(email:string, password: string) {
        return this.http.post('http://localhost:8080/authentication/login',
            {
                username: email,
                password: password,
            }
        ).pipe(tap((response) => {localStorage.setItem('authuser',JSON.stringify(response))}))
    }

    logout() {
        localStorage.removeItem('authUser');
    }
}
