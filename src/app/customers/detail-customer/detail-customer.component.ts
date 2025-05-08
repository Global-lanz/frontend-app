import { input, inject, Component, computed, signal, output } from '@angular/core';
import { CustomersService } from '../customers.service';
import { RouterLink } from '@angular/router';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

import { Customer } from '../customer/customer.model';



@Component({
  selector: 'app-detail-customer',
  imports: [RouterLink, EditCustomerComponent],
  templateUrl: './detail-customer.component.html',
  styleUrl: './detail-customer.component.css'
})
export class DetailCustomerComponent {
  private customersService = inject(CustomersService);
  customerId = input.required<string>();
  delete = output<string>();

  selectedCustomer = computed(() => this.customersService.customers().find(u => u.customerId === this.customerId()) as Customer);

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
    this.customersService.customers().map(u => u.customerId === this.customerId() ? {...u,...customerData} : u);
    this.isEditingCustomer.set(false);
  }

  onDeleteCustomer() {
    this.delete.emit(this.selectedCustomer().customerId!);
  }
}
