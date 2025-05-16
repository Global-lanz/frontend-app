import { input, inject, Component, computed, signal, output } from '@angular/core';
import { CustomersService } from '../customers.service';
import { RouterLink } from '@angular/router';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

import { Customer } from '../customer.model';
import { CurrencyService } from '../../currency.service';



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
  selectedCustomerCurrency = computed(() => this.currencyService.currencies().find(u => u.currencyId === this.selectedCustomer().currencyId));

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
    // this.customersService.customers().map(u => u.customerId === this.customerId() ? {...u,...customerData} : u);
    this.customersService.updateCustomer(this.selectedCustomer().customerId, customerData).subscribe();
    this.isEditingCustomer.set(false);
  }

  onDeleteCustomer() {
    // this.delete.emit(this.selectedCustomer().customerId!);
    this.customersService.deleteCustomer(this.selectedCustomer().customerId).subscribe();
    //back to overview
    //todo success delete message
    //reload customers
    this.customersService.getAllCustomers().subscribe();
    this.goBack();
  }
}
