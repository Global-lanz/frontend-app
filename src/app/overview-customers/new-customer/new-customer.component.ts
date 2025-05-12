import { Component,output, input, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { type Customer } from '../../customers/customer.model';
import { CurrencyService } from '../../currency.service';

@Component({
  selector: 'app-new-customer',
  imports: [FormsModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent {
  cancel = output<void>();
  add = output<Customer>(); 

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
      customerId: 'temp',
      name: formData.form.value.name || '',
      taxIdentificationNumber: formData?.form.value.tax_identification_number || '',
      taxIdentificationType: formData?.form.value.tax_identification_type || '',
      taxRegime: formData?.form.value.tax_regime || '',
      annualRevenue: Number(formData?.form.value.annual_revenue) || 0,
      country: formData?.form.value.country || '',
      address: formData?.form.value.address || '',
      postalCode: formData?.form.value.postal_code || '',
      businessSector: formData?.form.value.business_sector || '',
      establishmentDate: formData?.form.value.establishment_date || '',
      notes: formData?.form.value.notes || '',
      currencyId: formData?.form.value.currency || '',
    })
  }
}
