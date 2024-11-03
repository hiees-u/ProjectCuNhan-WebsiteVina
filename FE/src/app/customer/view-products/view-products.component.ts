import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { OrderProductsComponent } from '../order-products/order-products.component';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';

import { CustomCurrencyPipe } from '../../shared/module/customCurrency';

import { ProductItemComponent } from '../../shared/item/product-item/product-item.component';
import { FilterPriceComponent } from '../../shared/item/filter-price/filter-price.component';
import { CustomerService } from '../customer.service';
import { Product } from '../../shared/module/product/product.module';
import { CartItem, CartModule } from '../../shared/module/cart/cart.module';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [
    OrderProductsComponent,
    CommonModule,
    NgIf,
    NgFor,
    NgClass,
    FilterPriceComponent,
    ProductItemComponent,
    CustomCurrencyPipe,
  ],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css',
})
export class ViewProductsComponent {
  show: number = 0;
  receivedData: Product | undefined;
  products: Product[] = [];
  responseMessage: string | undefined;

  cart: CartItem | undefined;

  constructor(
    private customer_service: CustomerService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.customer_service.getProducts(
        null,
        null,
        null,
        null,
        1,
        10,
        0,
        0
      );
      if (response.isSuccess) {
        this.products = response.data;
        this.responseMessage = response.message;
      } else {
        this.responseMessage = 'Failed to get products.';
      }
    } catch (error) {
      console.error('Error:', error);
      this.responseMessage = 'An error occurred while fetching the products.';
    }
  }

  handleDataChange(data: any) {
    this.show = 1;
    this.receivedData = data;
    console.log('Received data from child:', this.receivedData);
  }

  handleClose() {
    this.show = -1;
    // this.receivedData = undefined;
  }

  InDeCrease(CartId: number, InDe: number) {
    // for (let index = 0; index < this.receivedData?.length; index++) {
    //   if (this.cartItems[index].CartId === CartId) {
    //     this.cartItems[index].quantity += InDe;
    //     // Đảm bảo số lượng không bao giờ nhỏ hơn 0
    //     if (this.cartItems[index].quantity < 0) {
    //       this.cartItems[index].quantity = 0;
    //     }
    //     // Tính lại tổng giá sau khi thay đổi số lượng
    //     this.cartItems[index].totalPrice = this.cartItems[index].quantity * this.cartItems[index].price;
    //   }
    // }
  }
}
