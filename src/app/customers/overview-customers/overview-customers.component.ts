import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CustomerComponent } from './customer/customer.component';
import { CustomersService } from '../customers.service';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { SortPipe } from '../../sort.pipe';

import { Customer } from '../customer.model';
import { MessageComponent } from '../../message/message.component';

@Component({
  selector: 'app-customers',
  imports: [CustomerComponent, NewCustomerComponent, SortPipe, RouterLink],
  templateUrl: './overview-customers.component.html',
  styleUrl: './overview-customers.component.css'
})

export class OverviewCustomersComponent {
    sort = input<'asc' | 'desc'>('asc');
    sortBy = input<string>('name');
    hoverCreate = signal<Boolean>(false);
    isAddingCustomer = signal<Boolean>(false);

    private customersService = inject(CustomersService);
    customers = this.customersService.customers;

    //necessary?
    isLoading = this.customersService.isLoading;
    

    onStartAddCustomer() {
        this.isAddingCustomer.set(true);
    }

    onCancelAddCustomer() {
        this.isAddingCustomer.set(false);
    }

    onAddCustomer(customerData: Partial<Customer>) {
        const subscription = this.customersService.newCustomer(customerData).subscribe();
        this.isAddingCustomer.set(false);
    }
}