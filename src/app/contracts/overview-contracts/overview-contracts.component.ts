import { Component, computed, inject, input, model, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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
  customerId = model<string>('');
  hoverCreate = signal<Boolean>(false);
  isAddingContract = signal<Boolean>(false);

  private contractsService = inject(ContractsService);
  private costumersService = inject(CustomersService);
  private currencyService = inject(CurrencyService);
  private router = inject(Router);

  // contracts = this.contractsService.contracts; //remove option to see all contracts, only selected customers?
  customers = this.costumersService.customers;

  //computed signal to expose to service; replace undefined value with '', endpoint sends all when empty id is sent
  readonly customerIdOverviewContracts = computed(() => this.customerId() ?? '');
  
  contractsResource = this.contractsService.contractsByCustomerResource(this.customerIdOverviewContracts);
  // Computed signal to extract contracts array safely //empty list if undefined or error
  contractsList = computed(() => {
    const resource = this.contractsResource.value() as { content?: Contract[] } | undefined;
    return resource && Array.isArray(resource.content) ? resource.content : [];
  });
  ////

  // isLoading = this.contractsService.isLoading;

  selectedCustomer = computed(() => this.customers().find(u => u.customerId === this.customerId()) as Customer);
  selectedCustomerCurrency = computed< Currency >(() => this.currencyService.currencies().find(u => u.currencyId === this.selectedCustomer().currencyId) as Currency);
  customerselected = computed(() => !!this.selectedCustomer()) //true if customer is selected


  ////filter and sort computed signals, first filter then sort   replaced with call to api when customer is selected; filtering in backend
  // private filteredContracts = computed(() =>{
  //     const contracts = this.contracts();
  //     const selectedCustomerId = this.customerId();

  //     if(selectedCustomerId == undefined) return contracts;
  //     return [...contracts].filter((u) => u.customerId === selectedCustomerId)
  // });

  sortedFilteredContracts = computed(() => {
      const contracts = this.contractsList();
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

  onCustomerSelectChange(event: Event) {console.log
    ('Selected Option ID:', (event.target as HTMLSelectElement).value, this.customerId()); //for debugging
    const customerId = (event.target as HTMLSelectElement).value || '';
    this.router.navigate([], {
      queryParams: { customerId },
      queryParamsHandling: 'merge'
      }
    );
  }
}
