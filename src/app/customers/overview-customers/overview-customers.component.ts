import { Component, inject, input, signal, computed, effect } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CustomerComponent } from './customer/customer.component';
import { CustomersService } from '../customers.service';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { QueryParamService } from '../../queryparam.service';
import { FormsModule } from '@angular/forms';

import { Customer } from '../customer.model';


@Component({
  selector: 'app-overview-customers',
  imports: [CustomerComponent, NewCustomerComponent, RouterLink, FormsModule],
  templateUrl: './overview-customers.component.html',
  styleUrl: './overview-customers.component.css'
})

export class OverviewCustomersComponent {
    sort = input<'asc' | 'desc'>('asc');
    sortBy = input<keyof Customer>('name');
    hoverCreate = signal<Boolean>(false);
    isAddingCustomer = signal<Boolean>(false);

    private customersService = inject(CustomersService);
    private queryParamService = inject(QueryParamService);

    customers = this.customersService.customers

    ////get and set customerId with QueryParamService
    pageSize = this.queryParamService.get('pageSize');
    pageNumber = this.queryParamService.get('pageNumber');
    customerSearch = this.queryParamService.get('customerSearch');
    //update customerId in service per effect
    private updatePageSizeService = effect(() => {this.customersService.pageSizeService.set(this.pageSize())});
    private updatePageNumberService = effect(() => {this.customersService.pageNumberService.set(this.pageNumber())});
    private updateCustomerSearchService = effect(() => {this.customersService.customerSearchService.set(this.customerSearch() ?? '')});
    //signals from httpResource in Service
    customersList = this.customersService.customersList;
    isLoading = this.customersService.resourceIsLoading;
    error = this.customersService.resourceError;
    pagination = this.customersService.customersPagination;

    // //computed signal instead of sort pipe, not used anymore, sort will be done in backend
    // sortedCustomers = computed(() => {
    //     const customers = this.customers();
    //     const property = this.sortBy();
    //     const order = this.sort();

    //     if (!customers || !property) return customers;
    //     return [...customers].sort((a, b) => {
    //         const compare = a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0;
    //         return order === 'asc' ? compare : -compare;
    //     });
    // });


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

    onPageSizeChange() {
        this.pageNumber.set(0); // Reset to first page when changing page size
    }

    onCustomerSearchChange() {
        this.pageNumber.set(0); // Reset to first page when searching
    }



}