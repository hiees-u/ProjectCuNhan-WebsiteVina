import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegistreComponent } from './auth/registre/registre.component';
import { ViewProductsComponent } from './customer/view-products/view-products.component';
import { OrderProductsComponent } from './customer/order-products/order-products.component';
import { ApproveOrdersComponent } from './employee/approve-orders/approve-orders.component';
import { ManageInventoryComponent } from './employee/manage-inventory/manage-inventory.component';

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
    path: 'view-products',
    component: ViewProductsComponent,
  },
  {
    path: 'order-products',
    component: OrderProductsComponent,
  },
];
