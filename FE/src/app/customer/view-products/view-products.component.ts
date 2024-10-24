import { Component } from '@angular/core';
import { OrderProductsComponent } from '../order-products/order-products.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [
    OrderProductsComponent,
    NgIf
  ],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent {
  isShowOrder = false;

  ShowOrder() {
    this.isShowOrder = !this.isShowOrder;
  }
}
