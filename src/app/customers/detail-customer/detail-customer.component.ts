import { input, inject, Component, computed, signal, output } from '@angular/core';
import { CustomersService } from '../customers.service';
import { RouterLink } from '@angular/router';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CurrencyService } from '../../currency.service';

import { type Customer } from '../customer.model';
import { type Currency } from '../../currency.model';



@Component({
  selector: 'app-detail-customer',
  imports: [RouterLink, EditCustomerComponent],
  templateUrl: './detail-customer.component.html',
  styleUrl: './detail-customer.component.css'
})

export class DetailCustomerComponent {
  private customersService = inject(CustomersService);
  private currencyService = inject(CurrencyService);
  customerId = input.required<string>();
  delete = output<string>();

  selectedCustomer = computed(() => this.customersService.customers().find(u => u.customerId === this.customerId()) as Customer);
  selectedCustomerCurrency = computed< Currency | undefined >(() => this.currencyService.currencies().find(u => u.currencyId === this.selectedCustomer().currencyId) as Currency);

  isEditingCustomer = signal<Boolean>(false)

  goBack(): void {
    window.history.back();
  }

  onStartEditCustomer() {
    this.isEditingCustomer.set(true);
  }

  onCancelEditCustomer() {
    this.isEditingCustomer.set(false);
  }
  
  onEditCustomer(customerData: Customer) {
    this.isEditingCustomer.set(false);
    this.customersService.editCustomer(this.selectedCustomer().customerId, customerData);
  }

  onDeleteCustomer() {
    this.customersService.removeCustomer(this.selectedCustomer().customerId);
    //back to overview?
    //reload customers
    this.customersService.getAllCustomers();
    this.goBack();
  }
}
