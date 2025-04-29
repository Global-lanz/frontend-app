import { Component,output, input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { type Customer } from '../customer/customer.model';

@Component({
  selector: 'app-new-customer',
  imports: [FormsModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent {
  cancel = output<void>();
  add = output<Customer>(); 

  onCancel() {
    this.cancel.emit();
  }
  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }
    // console.log(formData);
    this.add.emit({
      id: new Date().getTime().toString(),
      name: formData.form.value.name || '',
      tax_identification_number: formData?.form.value.tax_identification_number || '',
      tax_identification_type: formData?.form.value.tax_identification_type || '',
      tax_regime: formData?.form.value.tax_regime || '',
      annual_revenue: Number(formData?.form.value.annual_revenue) || 0,
      currency: formData?.form.value.currency || '',
      country: formData?.form.value.country || '',
      address: formData?.form.value.adress || '',
      postal_code: formData?.form.value.postal_code || '',
      business_sector: formData?.form.value.business_sector || '',
      establishment_date: formData?.form.value.establishment_date || '',
      notes: formData?.form.value.notes || '',
    })
  }
}
