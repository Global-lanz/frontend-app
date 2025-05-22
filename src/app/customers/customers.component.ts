import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomersService } from './customers.service';


@Component({
  selector: 'app-customers',
  imports: [ RouterOutlet],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})

export class CustomersComponent {
  private customersService = inject(CustomersService);
  
  ngOnInit(): void {
    //fetch customers on init
    const subscription = this.customersService.getAllCustomers();

  }
  

}

