import { Component, computed, inject, input, output, signal } from '@angular/core';
import { CurrencyService } from '../../../currency.service';
import { Contract } from '../../contract.model';
import { FormsModule, NgForm } from '@angular/forms';
import { Currency } from '../../../currency.model';
import { Customer } from '../../../customers/customer.model';

@Component({
  selector: 'app-edit-contract',
  imports: [FormsModule],
  templateUrl: './edit-contract.component.html',
  styleUrl: './edit-contract.component.css'
})
export class EditContractComponent {
  currencyService = inject(CurrencyService);
  selectedContract = input.required<Contract>();
  selectedContractCurrency = input.required<Currency | undefined>();
  selectedContractCustomer = input.required<Customer>();
  cancel = output<void>();
  edit = output<Contract>();
  

  onCancel() {
    this.cancel.emit();
  }
  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }
    // console.log(formData);
      this.edit.emit({
      contractId: this.selectedContract().contractId,
      customerId: this.selectedContractCustomer().customerId,
      totalAmount: formData.form.value.totalAmount,
      frequency: formData.form.value.frequency,
      paymentDay: formData.form.value.paymentDay,
      start: formData.form.value.startDate,
      end: formData.form.value.endDate,
      status: this.selectedContract().status,
      type: this.selectedContract().type,
      terminationClause: formData.form.value.terminationClause,
      penaltyFee: formData.form.value.penaltyFee,
      currencyId: this.selectedContractCurrency()?.currencyId || '',
      });
  }

}
