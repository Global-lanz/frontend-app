import { Component, output, input, Signal, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { type Customer } from '../../customer.model';
import { CurrencyService } from '../../../currency.service';

@Component({
  selector: 'app-edit-customer',
  imports: [FormsModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent {
    currencyService = inject(CurrencyService);
    selectedCustomer = input.required<Customer>();
    cancel = output<void>();
    edit = output<Customer>(); 
  
    onCancel() {
      this.cancel.emit();
    }
    onSubmit(formData: NgForm) {
      if (formData.form.invalid) {
        return;
      }
      // console.log(formData);
      this.edit.emit({
        customerId: this.selectedCustomer().customerId,
        name: formData.form.value.name || '',
        taxIdentificationNumber: formData?.form.value.tax_identification_number || '',
        taxIdentificationType: formData?.form.value.tax_identification_type || '',
        taxRegime: formData?.form.value.tax_regime || '',
        annualRevenue: Number(formData?.form.value.annual_revenue) || 0,
        country: formData?.form.value.country || '',
        address: formData?.form.value.adress || '',
        postalCode: formData?.form.value.postal_code || '',
        businessSector: formData?.form.value.business_sector || '',
        establishmentDate: formData?.form.value.establishment_date || '',
        notes: formData?.form.value.notes || '',
        currencyId: formData?.form.value.currency || '',
      })
    }

}
