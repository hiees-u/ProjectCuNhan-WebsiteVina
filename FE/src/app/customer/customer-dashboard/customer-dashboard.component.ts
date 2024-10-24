import { Component } from '@angular/core';
import { ViewProductsComponent } from '../view-products/view-products.component';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    ViewProductsComponent
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {
}
