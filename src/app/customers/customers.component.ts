import { Component, DestroyRef, inject } from '@angular/core';
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
  private destroyRef = inject(DestroyRef);
  
  ngOnInit(): void {
    //fetch customers on init
    const subscription = this.customersService.getAllCustomers().subscribe();
    //unsubscribe when component is destroyed; not really needed for http calls
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  

}

