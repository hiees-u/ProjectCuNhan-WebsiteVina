import { Component } from '@angular/core';
import { ViewProductsComponent } from '../view-products/view-products.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    ViewProductsComponent,
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})

export class CustomerDashboardComponent {
  isLogin: boolean = false;

  constructor(private router: Router) {}
  
  navigateToViewProduct() {
    this.router.navigate(['/customer/view-product']);
  }

  navigateToOrderProduct() {
    this.router.navigate(['/customer/order-product']);
  }

  showLogin() {    
    this.router.navigate(['/login']);
  }
  showRegister() {
    this.router.navigate(['/register']);
  }
}
