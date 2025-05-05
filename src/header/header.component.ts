import { Component, inject } from '@angular/core';
import { AuthService } from '../app/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hoverLogo = false;

  private authService = inject(AuthService)


  onLogout() {
    this.authService.logout();
  }
}
