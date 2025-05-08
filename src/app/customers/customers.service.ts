import { inject, Injectable, signal } from '@angular/core';

import { DUMMY_CUSTOMERS } from '../../dummy_data';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer/customer.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
// for Dummy data
  // get customers() {
  //   return DUMMY_CUSTOMERS;
  // };

  
  deleteCustomer(id: string) {
    // this.customers.filter((customer) => customer.customerId !== id)
  }

  customers = signal<Customer[]>([]);

  private http = inject(HttpClient);
  baseUrl = 'http://localhost:8080';

  getAllCustomers() {
    return this.http.get<{customers: Customer[]}>(`${this.baseUrl}/customer`).pipe(
      tap(response => {
        this.customers.set(response.customers);
        console.log(response);
      })
    );
  }

}
