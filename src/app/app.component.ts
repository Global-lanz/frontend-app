import { Component, inject, DestroyRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from "../header/header.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, HeaderComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gl-system';

  private currenciesService = inject(CurrencyService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    //fetch currencies on init
    const subscription = this.currenciesService.getCurrencies().subscribe();
    //unsubscribe when component is destroyed; not really needed for http calls
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

}