import { Component, NgModule, output, input, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Contract } from '../contract.model';



@Component({
  selector: 'app-new-contract',
  imports: [FormsModule],
  templateUrl: './new-contract.component.html',
  styleUrl: './new-contract.component.css'
})
export class NewContractComponent {
  cancel = output<void>();
  add = output<Contract>();
  
  customer = input<string >();
  customerName = input<string|undefined>();
  customerCurrency = input<string>();

  ngDefaultStatus = "Quotation"

  onCancel() {
    this.cancel.emit();
  }

  // onSubmit(formData: NgForm) {
  //   if (formData.form.invalid) {
  //     return;
  //   }
  //   // console.log(formData);
  //   this.add.emit({
  //     contract_id: new Date().getTime().toString(),
  //     //company_id: string;
  //     customer_id: formData?.form.value.customer.id,
  //     total_amount: formData?.form.value.;
  //     contract_type: string;
  //     frequency: string;
  //     payment_day: number;
  //     start_date: string;
  //     end_date: string;
  //     status: string;
  //     termination_clause: string;
  //     penalty_fee: number;
  //   })
  // }

}
