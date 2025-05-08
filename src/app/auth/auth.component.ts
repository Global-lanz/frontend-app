import { Component,inject, input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  activationToken = input<string>();

  isLoading = false;
  isSignUp = false;
  signUpSuccess = false;
  errorMessage: string | null = null;
  
  private router = inject(Router);
  private authService = inject(AuthService);
  
  
  onSubmit(form:NgForm) {
    if(!form.valid){
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    if(this.isSignUp === true){
      const name = form.value.name;
      const company = form.value.companyName;
      const confirmPassword = form.value.confirmPassword;
      console.log(name,company,email,password);
      this.authService.register(name,email,password,confirmPassword,company).subscribe({
        next: () => {
          this.isLoading = false;
          this.errorMessage = null;
          this.signUpSuccess = true;
          console.log('user registered');
        },
        error: error => {
          this.errorMessage = error.message;
          this.isLoading = false;
        }
      })
    } else {
      console.log(email,password)
      this.authService.login(email,password).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate([''])
        },
        error: error => {
          this.errorMessage = error.message;
          this.isLoading = false;
        }
      });
    }    
    form.reset();
  }

}
