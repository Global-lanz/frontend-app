import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ContractsComponent } from './contracts/contracts.component';
import { DetailCustomerComponent } from './customers/detail-customer/detail-customer.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './auth/auth.guard';
import { ActivationComponent } from './auth/activation/activation.component';
import { OverviewCustomersComponent } from './customers/overview-customers/overview-customers.component';

 
export const routes: Routes = [
    //todo 404 page
    //todo maybe add a welcome page instead of redirecting to customers

    {
        path: 'customers',
        title: 'Manage Customers',
        component: CustomersComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: OverviewCustomersComponent,
            },
            {
                path: 'customer/:customerId',
                title: 'Customer Details',
                component: DetailCustomerComponent,
                canActivate: [authGuard],

            },
        ]
    },
    {
        path: 'contracts',
        title: 'Manage Contracts',
        component: ContractsComponent,
        canActivate: [authGuard],
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
    },
    {   path: '', 
        redirectTo: '/customers', 
        pathMatch: 'full' 
    },

];
