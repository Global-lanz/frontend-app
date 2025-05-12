import { Component, inject, input, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ContractsService } from './contracts.service';
import { CustomersService } from '../customers/customers.service';

import { type Contract} from './contract.model';
import { SortPipe } from '../sort.pipe';
import { NewContractComponent } from './new-contract/new-contract.component';
import { Customer } from '../customers/customer.model';


@Component({
  selector: 'app-contracts',
  imports: [RouterLink, FormsModule, SortPipe, NewContractComponent],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.css'
})
export class ContractsComponent {
  private contractsService = inject(ContractsService);
  private customersService = inject(CustomersService);

  isAddingContract = signal<Boolean>(false);
  hoverCreate = false;

  //query param
  customer = input<string|undefined>();
  sort = input<'asc' | 'desc'>('asc');
  sortBy = input<string>('total_amount');

  customers = this.customersService.customers;
  contracts = this.getContracts();
  selectCustomerValue = signal("Show All");

 
  //unique customer Ids found in contracts to populate dropdown (only customers with contract shown)
  // uniqueCustomerIds = Array.from(new Set(this.getContracts().map(contract => contract.customer_id )));


  //helper method to find contracts based query param, move to service
  getContracts(): Contract[] {
    if (this.customer() === undefined) {
      return this.contractsService.contracts
    }
    return this.contractsService.contracts.filter(contract => contract.customer_id === this.customer())
  }

  //helper method to return name instead id in the dropdown, move to service
  getCustomer(customerId: string | undefined) {
    const customer = this.customers().find(cust => cust.customerId === customerId);
    return customer ? customer : customerId || undefined;
  }

  getCustomerName(customerId: string | undefined) {
    const customer = this.customers().find(cust => cust.customerId === customerId);
    return customer ? customer.name : customerId || undefined;
  }

  getCustomerCurrency(customerId: string | undefined) {
    const customer = this.customers().find(cust => cust.customerId === customerId);
    return customer ? customer.currencyId : customerId || undefined;
  }

  //to show correct selected value when coming from customers; todo understand what else should be in ngOnInit
  ngOnChanges() {
    if (this.customer() !== undefined) {
      this.selectCustomerValue.set(this.getCustomerName(this.customer()!) ?? "Show All");
    } else {
      this.selectCustomerValue.set("Show All");
    };
    this.contracts = this.getContracts();
  }

  onStartAddContract() {
    this.isAddingContract.set(true);
  }

  onCancelAddContract() {
    this.isAddingContract.set(false);
  }

  onAddContract(contractData: Contract) {
    this.contracts.push(contractData)
    this.isAddingContract.set(false);
  }

}

