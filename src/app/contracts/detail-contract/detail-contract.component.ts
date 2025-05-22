import { Component, computed, inject, input, signal } from '@angular/core';
import { ContractsService } from '../contracts.service';
import { CurrencyService } from '../../currency.service';
import { CustomersService } from '../../customers/customers.service';

import { Contract, StatusTransition } from '../contract.model';
import { Currency } from '../../currency.model';
import { Customer } from '../../customers/customer.model';

@Component({
  selector: 'app-detail-contract',
  imports: [],
  templateUrl: './detail-contract.component.html',
  styleUrl: './detail-contract.component.css'
})

export class DetailContractComponent {
  private contractsService = inject(ContractsService);
  private currencyService = inject(CurrencyService);
  private customerService = inject(CustomersService);

  contractId = input.required<string>();
  isEditingContract = signal<Boolean>(false);
  
  selectedContract = computed(() => this.contractsService.contracts().find(u => u.contractId === this.contractId()) as Contract);
  selectedContractCurrency = computed< Currency | undefined >(() => this.currencyService.currencies().find(u => u.currencyId === this.selectedContract().currencyId) as Currency);
  selectedContractCustomer = computed< Customer >(() => this.customerService.customers().find(u => u.customerId === this.selectedContract().customerId) as Customer);
  transitions = computed< StatusTransition[] >(() => this.contractsService.statusTransitions().filter(u => u.fromStatus === this.selectedContract().status) as StatusTransition[]);



  goBack(): void {
    window.history.back();
  }

  onStartEditContract() {
    this.isEditingContract.set(true);
  }

  onCancelEditContract() {
    this.isEditingContract.set(false);
  }
  
  onEditContract(contractData: Contract) {
    this.isEditingContract.set(false);
    this.contractsService.editContract(this.selectedContract().contractId, contractData);
  }

  onTransitionContract(toStatus:string) {
    this.contractsService.updateContractStatus(this.selectedContract().contractId, toStatus)
  }

  //not supported by backend
  onDeleteContract() {
  }

}
