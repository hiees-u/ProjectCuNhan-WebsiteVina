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

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })

export function constructorCartItem(): CartItem {
  return {
    CartId: 0, // or assign a specific ID
    images: '', // provide a default image path or leave as empty string
    name: '', // default name or empty
    price: 0, // default price
    quantity: 1, // default quantity
    totalPrice: 0 // calculated total price based on quantity * price
  }
}

// export class CartModule { }
