import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Product {
  productId: number;
  productName: string;
  image?: string;
  totalQuantity?: number;
  categoryId: number;
  supplier: number;
  subCategoryId: number;
  expriryDate?: Date;
  description?: string;
  modifiedBy?: string;
  createTime: Date;
  modifiedTime?: Date;
  deleteTime?: Date;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
