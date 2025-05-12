import { inject, Injectable, signal } from '@angular/core';

import { DUMMY_CUSTOMERS } from '../../dummy_data';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
// for Dummy data
  // get customers() {
  //   return DUMMY_CUSTOMERS;
  // };

  customers = signal<Customer[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  private http = inject(HttpClient);
  baseUrl = 'http://localhost:8080';

  getAllCustomers() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    return this.http.get<{customers: Customer[]}>(`${this.baseUrl}/customer`).pipe(
      tap({
        next: response => {
          this.customers.set(response.customers);
          console.log(response);
        },
        error: error => {
          console.error('Error fetching customers', error);
          this.errorMessage.set(error.message);
        },
        complete: () => {this.isLoading.set(false)},
      })
    );
  }

  newCustomer(customerData: Customer) {
    this.errorMessage.set(null);
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
      currencyId: customerData.currencyId, 
    }).pipe(
      tap({
        next: () => {
        console.log('Customer added successfully');
        //reload customers, maybe add optimistic update
        this.getAllCustomers().subscribe();
        },
        error: error => {
            console.error('Error adding customer', error);
            this.errorMessage.set(error.message);
        },
    }))
  }

  updateCustomer(id:string, customerData: Customer) {
    this.errorMessage.set(null);
    console.log(customerData);
    return this.http.put<{customerDate: Customer}>(`${this.baseUrl}/customer/ ${id}`, {
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
      currencyId: customerData.currencyId, 
    }).pipe(
      tap({
        next: () => {
        console.log('Customer edited successfully');
        //reload customers, maybe add optimistic update
        this.getAllCustomers().subscribe();
        },
        error: error => {
            console.error('Error editing customer', error);
            this.errorMessage.set(error.message);
        },
    }))
  }

  deleteCustomer(id: string) {
    this.errorMessage.set(null);
    // this.customers.filter((customer) => customer.customerId !== id)
    return this.http.delete(`${this.baseUrl}/customer/ ${id}`).pipe(
      tap({
        next: () => {
        console.log('Customer deleted successfully');
        //reload customers, maybe add optimistic updating
        this.getAllCustomers().subscribe();
        },
        error: error => {
            console.error('Error deleting customer', error);
            this.errorMessage.set(error.message);
        },
    }))
  }


}


