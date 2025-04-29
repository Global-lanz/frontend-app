import { Component,inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoading = false;
  // error: string = null;

  private authService = inject(AuthService);

  onSubmit(form:NgForm) {
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email,password).subscribe();
    console.log(email,password)
    form.reset();
  }

}
