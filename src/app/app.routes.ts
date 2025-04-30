import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ContractsComponent } from './contracts/contracts.component';
import { DetailCustomerComponent } from './customers/detail-customer/detail-customer.component';
import { AuthComponent } from './auth/auth.component';


export const routes: Routes = [
    {
        path: 'customers',
        title: 'Manage Customers',
        component: CustomersComponent,
    },
    {
        path: 'customers/customer/:customerId',
        title: 'Customer Details',
        component: DetailCustomerComponent,

    },
    {
        path: 'contracts',
        title: 'Manage Contracts',
        component: ContractsComponent,
    },
    {   path: 'authentication',
        title: 'Login',
        component: AuthComponent 
    }

];
