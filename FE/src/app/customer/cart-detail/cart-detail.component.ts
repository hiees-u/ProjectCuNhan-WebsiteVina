import { Component } from '@angular/core';
import { CartItem } from '../../shared/module/cart/cart.module';
import { CommonModule } from '@angular/common';
import { CustomCurrencyPipe } from '../../shared/module/customCurrency';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [
    CommonModule,
    CustomCurrencyPipe
  ],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css',
})
export class CartDetailComponent {
  cartItems: CartItem[] = [{
    CartId: 1,
    images: 'p1.png',
    name: 'Classic Espresso',
    price: 150.0,
    quantity: 1,
    totalPrice: 150.0,
  }, {
    CartId: 2,
    images: 'p2.png',
    name: 'French Roast', 
    price: 130.0, 
    quantity: 2, 
    totalPrice:130
  }];

  toggleAllChecks(event: any) {
    const checkAll = event.target.checked;
    const checkboxes = document.getElementsByName(
      'check'
    ) as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((checkbox) => {
      checkbox.checked = checkAll;
    });
  }

  InDeCrease(CartId: number, InDe: number) {
    for (let index = 0; index < this.cartItems.length; index++) {
      if (this.cartItems[index].CartId === CartId) {
        this.cartItems[index].quantity += InDe;
        // Đảm bảo số lượng không bao giờ nhỏ hơn 0
        if (this.cartItems[index].quantity < 0) {
          this.cartItems[index].quantity = 0;
        }
        // Tính lại tổng giá sau khi thay đổi số lượng
        this.cartItems[index].totalPrice = this.cartItems[index].quantity * this.cartItems[index].price;
      }
    }
  }
  
}
