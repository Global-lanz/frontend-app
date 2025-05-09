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

  newCustomer(customerData: Customer) {
    console.log(customerData);
    return this.http.post<{customerDate: Customer}>(`${this.baseUrl}/customer`, {
      name: customerData.name,
      taxIdentificationNumber: customerData.taxIdentificationNumber,
      taxIdentificationType: customerData.taxIdentificationType,
      taxRegime: customerData.taxRegime,
      annualRevenue: customerData.annualRevenue,
      country: customerData.country,
      address: customerData.address,
      postalCode: customerData.postalCode,
      businessSector: customerData.businessSector,
      establishmentDate: customerData.establishmentDate,
      notes: customerData.notes,
      currencyId: null, //until Currency API is implemented
    })
  }

}
