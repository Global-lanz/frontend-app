import { Component, input } from '@angular/core';

import { type Customer } from './customer.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})

export class CustomerComponent {
  customer = input.required<Customer>();
  // showDetails = false;

  // toggleDetails() {
  //   this.showDetails = !this.showDetails
  // }
}
