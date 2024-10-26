import { Component } from '@angular/core';
import { ViewProductsComponent } from '../view-products/view-products.component';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  showLogin() {
    this.router.navigate(['/login']);
  }
}
