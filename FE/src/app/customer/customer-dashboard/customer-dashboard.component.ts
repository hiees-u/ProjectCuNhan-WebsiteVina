import { Component } from '@angular/core';
import { ViewProductsComponent } from '../view-products/view-products.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CustomerRoutingModule } from '../customer-routing.module'

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    ViewProductsComponent,
    CommonModule,
    RouterOutlet,
    CustomerRoutingModule
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})

export class CustomerDashboardComponent {
  isLogin: boolean = false;

  constructor(private router: Router) {}

  showViewProduct() {
    this.router.navigate(['/view-product']);
  }

  showLogin() {
    console.log('Click');
    
    this.router.navigate(['/login']);
  }
  showRegister() {
    this.router.navigate(['/register']);
  }
}
