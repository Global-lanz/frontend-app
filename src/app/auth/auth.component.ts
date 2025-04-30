import { Component,inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoading = false;
  errorMessage: string | null = null

  constructor(private router: Router) {}

  private authService = inject(AuthService);
  
  

  onSubmit(form:NgForm) {
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email,password).subscribe({
      next: () => {this.router.navigate([''])},
      error: error => this.errorMessage = error.message
    });
    console.log(email,password)
    form.reset();
  }

}
