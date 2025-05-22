import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContractsService } from '../contracts.service';
import { Contract } from '../contract.model';
import { NewContractComponent } from "../new-contract/new-contract.component";
import { CustomersService } from '../../customers/customers.service';
import { Customer } from '../../customers/customer.model';
import { Currency } from '../../currency.model';
import { CurrencyService } from '../../currency.service';
import { ContractComponent } from './contract/contract.component';

@Component({
  selector: 'app-overview-contracts',
  imports: [NewContractComponent, NewContractComponent, ContractComponent, RouterLink],
  templateUrl: './overview-contracts.component.html',
  styleUrl: './overview-contracts.component.css'
})

export class OverviewContractsComponent {
  sort = input<'asc' | 'desc'>('asc');
  sortBy = input<keyof Contract>('status');
  customerId = input<string | undefined>(undefined);
  hoverCreate = signal<Boolean>(false);
  isAddingContract = signal<Boolean>(false);

  private contractsService = inject(ContractsService);
  private costumersService = inject(CustomersService);
  private currencyService = inject(CurrencyService);

  contracts = this.contractsService.contracts;
  customers = this.costumersService.customers;

  isLoading = this.contractsService.isLoading;

  selectedCustomer = computed(() => this.customers().find(u => u.customerId === this.customerId()) as Customer);
  selectedCustomerCurrency = computed< Currency >(() => this.currencyService.currencies().find(u => u.currencyId === this.selectedCustomer().currencyId) as Currency);
  customerselected = computed(() => !!this.selectedCustomer()) //true if customer is selected


  //filter and sort computed signals, first filter then sort
  private filteredContracts = computed(() =>{
      const contracts = this.contracts();
      const selectedCustomerId = this.customerId();

      if(selectedCustomerId == undefined) return contracts;
      return [...contracts].filter((u) => u.customerId === selectedCustomerId)
  });

  sortedFilteredContracts = computed(() => {
      const contracts = this.filteredContracts();
      const property = this.sortBy();
      const order = this.sort();

      if (!property) return contracts; //if selected Sort Property doesn't exist, not really necessary actually
      return [...contracts].sort((a, b) => {
          const compare = a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0;
          return order === 'asc' ? compare : -compare;
      });
  });


  onStartAddContract() {
      this.isAddingContract.set(true);
  }

  onCancelAddCustomer() {
      this.isAddingContract.set(false);
  }

  onAddCustomer(contractData: Partial<Contract>) {
      this.contractsService.newContract(contractData);
      this.isAddingContract.set(false);
  }

}
