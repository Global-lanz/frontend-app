import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CustomerComponent } from './customer/customer.component';
import { CustomersService } from './customers.service';
import { NewCustomerComponent } from "./new-customer/new-customer.component";
import { type Customer } from './customer/customer.model';
import { SortPipe } from '../sort.pipe';

@Component({
  selector: 'app-customers',
  imports: [CustomerComponent, NewCustomerComponent, SortPipe, RouterLink],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  sort = input<'asc' | 'desc'>('asc');
  sortBy = input<string>('name');
  hoverCreate = false;

  private customersService = inject(CustomersService);
  customers = this.customersService.customers;

  isAddingCustomer = signal<Boolean>(false)

  onStartAddCustomer() {
    this.isAddingCustomer.set(true);
  }

  onCancelAddCustomer() {
    this.isAddingCustomer.set(false);
  }

  onAddCustomer(customerData: Customer) {
    this.customers.push(customerData)
    this.isAddingCustomer.set(false);
  }


}

