import { Routes } from '@angular/router';

import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { OrderProductsComponent } from './order-products/order-products.component';

const routes: Routes = [
  {
    path: 'customer',
    component: CustomerDashboardComponent,
    children: [
      { path: 'view-product', component: ViewProductsComponent},
      { path: 'order-product', component: OrderProductsComponent},
      { path: '', redirectTo: 'view-product', pathMatch: 'full'}
    ]
  }
];

export default routes;
