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
  isAddingCustomer = signal<Boolean>(false);
  isFetching = signal<Boolean>(true);
  errorMessage = signal<string | null>(null);

  private customersService = inject(CustomersService);
  customers = this.customersService.customers;

  

  onStartAddCustomer() {
    this.isAddingCustomer.set(true);
  }

  onCancelAddCustomer() {
    this.isAddingCustomer.set(false);
  }

  onAddCustomer(customerData: Customer) {
    this.isFetching.set(true);
    this.customersService.newCustomer(customerData).subscribe({
      next: () => {
        console.log('Customer added successfully');
        this.customersService.getAllCustomers().subscribe({
          next: () => console.log('Customers refetched successfully'),
          error: error => {
            console.error('Error refetching customers', error);
            this.errorMessage.set(error.message);
          },
          complete: () => {this.isFetching.set(false)},
        });
      },
      error: error => {
        console.error('Error adding customer', error);
        this.errorMessage.set(error.message);
      },
    });
    this.isAddingCustomer.set(false);
  }

  ngOnInit(): void {
    //fetch customers on init
    this.customersService.getAllCustomers().subscribe({
      next: () => console.log('Customers fetched successfully'),
      error: error => {
        console.error('Error fetching customers', error);
        this.errorMessage.set(error.message);
      },
      complete: () => {this.isFetching.set(false)},
    });
  }


}

