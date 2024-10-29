import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CartItem {
  CartId: number,
  images: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CartModule { }
