import { Component,output, input, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { type Customer } from '../../customer.model';
import { CurrencyService } from '../../../currency.service';

@Component({
  selector: 'app-new-customer',
  imports: [FormsModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent {
  cancel = output<void>();
  add = output <Partial<Customer>>(); 

  currencyService = inject(CurrencyService);

  onCancel() {
    this.cancel.emit();
  }
  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }
    // console.log(formData);
    this.add.emit({
      name: formData.form.value.name || '',
      taxIdentificationNumber: formData?.form.value.taxIdentificationNumber || '',
      taxIdentificationType: formData?.form.value.taxIdentificationType || '',
      taxRegime: formData?.form.value.taxRegime || '',
      annualRevenue: Number(formData?.form.value.annualRevenue) || 0,
      country: formData?.form.value.country || '',
      address: formData?.form.value.address || '',
      postalCode: formData?.form.value.postalCode || '',
      businessSector: formData?.form.value.businessSector || '',
      establishmentDate: formData?.form.value.establishmentDate || '',
      notes: formData?.form.value.notes || '',
      currencyId: formData?.form.value.currency || '',
    })
  }
}
