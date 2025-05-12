import { inject, Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from './currency.service';
import { Currency } from './currency.model';

@Pipe({
  name: 'currencyDisplay',
  standalone: true
})
export class CurrencyDisplayPipe implements PipeTransform {
  private currencyService = inject(CurrencyService);

  transform(currencyId: string, type: 'name' | 'code' | 'symbol' = 'name'): string {
    const currency: Currency | undefined = this.currencyService.getCurrencyById(currencyId);
    if (!currency) return '';
    if (type === 'code') return currency.code;
    if (type === 'symbol') return currency.symbol;
    else if (type === 'name') return currency.name;
    return currencyId;
  }
}