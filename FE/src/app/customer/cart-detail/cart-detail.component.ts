import { Component } from '@angular/core';
import { CartItem } from '../../shared/module/cart/cart.module';
import { CommonModule } from '@angular/common';
import { CustomCurrencyPipe } from '../../shared/module/customCurrency';
import { CustomerService } from '../customer.service';
import { BaseResponseModel } from '../../shared/module/base-response/base-response.module';

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
  cartItems: CartItem[] = [];

  constructor(private Customer: CustomerService) {}

  ngOnInit(): void {
    this.getCart();     
  }

  async getCart() {
    const response : BaseResponseModel = await this.Customer.getCart();
    if(response.isSuccess) {
      this.cartItems = response.data;
      console.log('Success');
      console.log(this.cartItems[0].image);
    }    
  }

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
