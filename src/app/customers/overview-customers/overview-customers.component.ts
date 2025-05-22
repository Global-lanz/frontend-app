import { Component, inject, input, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CustomerComponent } from './customer/customer.component';
import { CustomersService } from '../customers.service';
import { NewCustomerComponent } from './new-customer/new-customer.component';

import { Customer } from '../customer.model';


@Component({
  selector: 'app-customers',
  imports: [CustomerComponent, NewCustomerComponent, RouterLink],
  templateUrl: './overview-customers.component.html',
  styleUrl: './overview-customers.component.css'
})

export class OverviewCustomersComponent {
    sort = input<'asc' | 'desc'>('asc');
    sortBy = input<keyof Customer>('name');
    hoverCreate = signal<Boolean>(false);
    isAddingCustomer = signal<Boolean>(false);

    private customersService = inject(CustomersService);
    customers = this.customersService.customers;

    //necessary?
    isLoading = this.customersService.isLoading;

    //computed signal instead of sort pipe
    sortedCustomers = computed(() => {
        const customers = this.customers();
        const property = this.sortBy();
        const order = this.sort();

        if (!customers || !property) return customers;
        return [...customers].sort((a, b) => {
            const compare = a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0;
            return order === 'asc' ? compare : -compare;
        });
    });
    

    onStartAddCustomer() {
        this.isAddingCustomer.set(true);
    }

    onCancelAddCustomer() {
        this.isAddingCustomer.set(false);
    }

    onAddCustomer(customerData: Partial<Customer>) {
        this.customersService.newCustomer(customerData);
        this.isAddingCustomer.set(false);
    }
}