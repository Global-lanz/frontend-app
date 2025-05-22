import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ContractsService } from './contracts.service';
import { CustomersService } from '../customers/customers.service';

@Component({
  selector: 'app-contracts',
  imports: [RouterOutlet],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.css'
})
export class ContractsComponent {
  private contractsService = inject(ContractsService);
  private customersService = inject(CustomersService);
  
  ngOnInit(): void {
    //fetch contracts on init
    this.contractsService.getAllContracts();
    //load customers if not loaded yet
    if (this.customersService.customers.length === 0) {
      this.customersService.getAllCustomers();
    }
    //fetch possible status transitions on init
    if (this.contractsService.statusTransitions.length === 0) {
      this.contractsService.getAllStatusTransitions();
    }
  }

}