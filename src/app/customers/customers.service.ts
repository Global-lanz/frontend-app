import { Injectable } from '@angular/core';

import { DUMMY_CUSTOMERS } from '../../dummy_data';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  get customers() {
    return DUMMY_CUSTOMERS;
  };

  deleteCustomer(id: string) {
    this.customers.filter((customer) => customer.id !== id)
  }
}
