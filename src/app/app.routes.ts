import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ContractsComponent } from './contracts/contracts.component';
import { DetailCustomerComponent } from './customers/detail-customer/detail-customer.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';


export const routes: Routes = [
    {
        path: 'customers',
        title: 'Manage Customers',
        component: CustomersComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'customers/customer/:customerId',
        title: 'Customer Details',
        component: DetailCustomerComponent,
        canActivate: [AuthGuard],

    },
    {
        path: 'contracts',
        title: 'Manage Contracts',
        component: ContractsComponent,
        canActivate: [AuthGuard],
    },
    {   path: 'authentication',
        title: 'Login',
        component: AuthComponent,
    }

];
