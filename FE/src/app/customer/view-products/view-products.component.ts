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
import {
  CartItem,
  constructorCartItem,
} from '../../shared/module/cart/cart.module';
import { Category } from '../../shared/module/category/category.module';
import { BaseResponseModel } from '../../shared/module/base-response/base-response.module';
import { SubCategory } from '../../shared/module/sub-category/sub-category.module';

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
  cate: Category[] = [];
  subCate: SubCategory[] = [];
  cart: CartItem = constructorCartItem();
  cateProductDetail: string = '';
  subCateProductDetail: string = '';

  constructor(private customer_service: CustomerService) {}

  async getTop10SubCategories() {
    try {
      const response: BaseResponseModel =
        await this.customer_service.getTop10SubCate();
      if (response.isSuccess) {
        this.subCate = response.data;
        this.responseMessage = response.message;
      } else {
        this.responseMessage = 'Failed to get categories';
      }
    } catch (error) {
      console.error('Error:', error);
      this.responseMessage = 'An error occurred while fetching the categories';
    }
  }

  async getTop10Categories() {
    try {
      const response: BaseResponseModel =
        await this.customer_service.getTop10Cate();
      if (response.isSuccess) {
        this.cate = response.data;
        this.responseMessage = response.message;
      } else {
        this.responseMessage = 'Failed to get categories';
      }
    } catch (error) {
      console.error('Error:', error);
      this.responseMessage = 'An error occurred while fetching the categories';
    }
  }

  async ngOnInit(): Promise<void> {
    this.getTop10Categories();
    this.getTop10SubCategories();
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
    this.cart.price = this.receivedData?.price || 0;
    this.cart.quantity = 1;
    this.cart.name = this.receivedData?.productName || '';
    this.cart.images = this.receivedData?.image || '';
    this.getSubCateProductDetail(this.receivedData?.subCategoryId!);
    this.getCateProductDetail(this.receivedData?.categoryId!);
  }

  async getSubCateProductDetail(productID: number) {
    try {
      const response: BaseResponseModel =
        await this.customer_service.getSubCateByProductID(productID);
      if (response.isSuccess) {
        this.subCateProductDetail = response.data;
        this.responseMessage = response.message;        
      } else {
        this.responseMessage = 'Failed to get categories';
      }
    } catch (error) {
      console.error('Error:', error);
      this.responseMessage = 'An error occurred while fetching the categories';
    }
  }
  
  async getCateProductDetail(productID: number) {
    try {
      const response: BaseResponseModel =
        await this.customer_service.getCateByProductID(productID);
      if (response.isSuccess) {
        this.cateProductDetail = response.data;
        this.responseMessage = response.message;
      } else {
        this.responseMessage = 'Failed to get categories';
      }
    } catch (error) {
      console.error('Error:', error);
      this.responseMessage = 'An error occurred while fetching the categories';
    }
  }

  handleClose() {
    this.show = -1;
    // this.receivedData = undefined;
  }

  InDeCrease(InDe: number) {
    if (this.cart) {
      if (InDe === 1) {
        if (this.receivedData!.totalQuantity > this.cart.quantity) {
          this.cart.quantity += InDe;
        }
      } else {
        this.cart.quantity += InDe;
      }

      // Đảm bảo số lượng không bao giờ nhỏ hơn 0
      if (this.cart.quantity < 1) {
        this.cart.quantity = 1;
      }
      // Tính lại tổng giá sau khi thay đổi số lượng
      this.cart.totalPrice = this.cart.quantity * this.cart.price;
    }
  }
}
