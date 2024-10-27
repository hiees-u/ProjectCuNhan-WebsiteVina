import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegistreComponent } from './auth/registre/registre.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistreComponent,
  },
  {
    path: 'customer',
    component: CustomerDashboardComponent,
  },
  {
    path: 'employee',
    component: EmployeeDashboardComponent,
  },
  {
    path: '',
    redirectTo: '/customer',
    pathMatch: 'full',
  },
];
