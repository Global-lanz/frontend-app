import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { type Contract } from '../../contract.model';

@Component({
  selector: 'app-contract',
  imports: [RouterLink],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.css'
})
export class ContractComponent {
  contract = input.required<Contract>();
}
