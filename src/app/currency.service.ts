import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Currency } from "./currency.model";
import { tap } from "rxjs";
import { MessageService } from "./message/message.service";

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {

  currencies = signal<Currency[]>([]);
  isLoading = signal<boolean>(false);
  successMessage = signal<string | null>(null);

  private http = inject(HttpClient);
  baseUrl = 'http://localhost:8080';

  private messageService = inject(MessageService);

  getCurrencies() {
    this.isLoading.set(true);
    return this.http.get<Currency[]>(`${this.baseUrl}/finance/currency`).pipe(
      tap({
        next: response => {
          this.currencies.set(response);
          console.log(this.currencies);
        },
        error: error => {
          console.error('Error fetching currencies', error);
          this.messageService.setMessage('error',`Error fetching currency data: ${error.message}`);
        },
        complete: () => { this.isLoading.set(false); },
      })
    );
  }

  getCurrencyById(id: string): Currency | undefined {
    return this.currencies().find(c => c.currencyId === id); 
  }

}