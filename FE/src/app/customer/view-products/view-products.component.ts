import { Component } from '@angular/core';
import { OrderProductsComponent } from '../order-products/order-products.component';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';

import { ProductItemComponent } from '../../shared/item/product-item/product-item.component';
import { FilterPriceComponent } from '../../shared/item/filter-price/filter-price.component';

interface CoffeeProduct {
  name: string;
  image: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [
    OrderProductsComponent,
    NgIf,
    NgFor,
    FilterPriceComponent,
    ProductItemComponent
  ],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent {
  // face data products
  coffeeProducts: CoffeeProduct[] = [
    {
      name: "Classic Espresso",
      image: "p1.png",
      price: 150000,
      description: "A rich, bold espresso made with premium Arabica beans."
    },
    {
      name: "Vanilla Latte",
      image: "p2.png",
      price: 170000,
      description: "Smooth latte with a touch of vanilla flavor."
    },
    {
      name: "Mocha Delight",
      image: "p3.png",
      price: 180000,
      description: "A creamy blend of espresso and chocolate."
    },
    {
      name: "Caramel Macchiato",
      image: "p4.png",
      price: 175000,
      description: "Bold espresso with caramel and steamed milk."
    },
    {
      name: "Iced Americano",
      image: "p5.png",
      price: 140000,
      description: "Chilled coffee with a smooth and refreshing flavor."
    }
  ];
}

