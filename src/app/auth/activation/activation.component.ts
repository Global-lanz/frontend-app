import { Component, inject, input } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-activation',
  imports: [RouterLink],
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.css'
})
export class ActivationComponent {
  private authService = inject(AuthService);

  activationToken = input<string>();
  isSuccess = false;
  errorMessage = null;

  ngOnInit():void {
    if (this.activationToken()){
      this.activateAccount(this.activationToken()!)
    }
  }

  private activateAccount(token: string):void {
    this.authService.activateUser(token).subscribe({
      next: () => {
        this.isSuccess = true;
      },
      error: error => {
        this.errorMessage = error.message;
      } 
    })
  }
}
