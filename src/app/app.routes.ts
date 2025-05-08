import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ContractsComponent } from './contracts/contracts.component';
import { DetailCustomerComponent } from './customers/detail-customer/detail-customer.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ActivationComponent } from './auth/activation/activation.component';

 
export const routes: Routes = [
    //todo 404 page
    //todo maybe add a welcome page instead of redirecting to customers
    { path: '', redirectTo: '/customers', pathMatch: 'full' },
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
    {   
        path: 'authentication',
        title: 'Login/Register',
        component: AuthComponent,
    },
    {
        path: 'authentication/activation/:activationToken',
        title: 'Account Activation',
        component: ActivationComponent,
    }

];
