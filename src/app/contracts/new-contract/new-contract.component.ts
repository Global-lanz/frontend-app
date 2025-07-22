import { Component, NgModule, output, input, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Contract } from '../contract.model';
import { Customer } from '../../customers/customer.model';
import { Currency } from '../../currency.model';



@Component({
  selector: 'app-new-contract',
  imports: [FormsModule],
  templateUrl: './new-contract.component.html',
  styleUrl: './new-contract.component.css'
})
export class NewContractComponent {
  cancel = output<void>();
  add = output<Partial <Contract>>();
  
  customer = input.required<Customer>();
  customerCurrency = input.required<Currency>()

  onCancel() {
    this.cancel.emit();
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }
    // console.log(formData);
    this.add.emit({
      //company_id: string;
      customerId: this.customer().customerId,
      totalAmount: formData?.form.value.totalAmount,
      frequency: formData?.form.value.frequency,
      paymentDay: formData.form.value.paymentDay,
      start: formData.form.value.startDate,
      end: formData.form.value.endDate,
      terminationClause: formData.form.value.terminationClause,
      penaltyFee: formData.form.value.penaltyFee,
      description: formData.form.value.description,
      currencyId: this.customerCurrency()?.currencyId,
    })
  }

}
