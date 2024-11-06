import { Injectable } from '@angular/core';
import { BaseResponseModel } from '../shared/module/base-response/base-response.module';
import { CartResponse } from '../shared/module/cart/cart.module';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private token:string = ''
  private apiUrl = 'https://localhost:7060/api/';
  constructor() {
    if (typeof window !== 'undefined') {
      this.token =localStorage.getItem('token') || ''
    }
  }

  async updateCart(cart: CartResponse): Promise<BaseResponseModel> {
    //https://localhost:7060/api/Cart
    const url = `${this.apiUrl}Cart`;
    // const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(cart),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async deleteCart(productId: number): Promise<BaseResponseModel> {
    const url = `${this.apiUrl}Cart`;
    // const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(productId),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BaseResponseModel = await response.json();

      return data;
    } catch (error) {
      console.error('ERROR:', error);
      throw error;
    }
  }

  async postCart(response: CartResponse): Promise<BaseResponseModel> {
    //https://localhost:7060/api/Cart
    const url = `${this.apiUrl}Cart`;
    // const token = localStorage.getItem('token');
    const body = { productId: response.productId, quantity: response.quantity };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BaseResponseModel = await response.json();

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getCart(): Promise<BaseResponseModel> {
    const url = `${this.apiUrl}Cart`;
    // const token = localStorage.getItem('token');
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const data: CartResponse[] = await response.json();

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getSupplierByID(supplierId: number): Promise<BaseResponseModel> {
    const url = `${this.apiUrl}Supplier/Get Supplier By Id?id=${supplierId}`;
    // const token = localStorage.getItem('token');
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as BaseResponseModel;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getCateByProductID(productId: number): Promise<BaseResponseModel> {
    const url = `${this.apiUrl}Category?productID=${productId}`;
    // const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as BaseResponseModel;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getSubCateByProductID(productId: number): Promise<BaseResponseModel> {
    const url = `${this.apiUrl}SubCategory/Get By Product Id?productID=${productId}`;
    // const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as BaseResponseModel;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getTop10SubCate(): Promise<BaseResponseModel> {
    const url = `${this.apiUrl}SubCategory/Get 10 Sub Category`;
    // const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as BaseResponseModel;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getTop10Cate(): Promise<BaseResponseModel> {
    const url = `${this.apiUrl}Category/Get 10 Category`;
    // const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as BaseResponseModel;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getProducts(
    productId: number | null,
    cateId: number | null,
    subCateId: number | null,
    supplierId: number | null,
    productName: string | null,
    pageNumber: number | 1,
    pageSize: number | 1,
    sortByName: number | 0,
    sortByPrice: number | 0
  ): Promise<BaseResponseModel> {
    const params: { [key: string]: any } = {
      productId,
      cateId,
      subCateId,
      supplierId,
      productName,
      pageNumber,
      pageSize,
      sortByName,
      sortByPrice,
    };
    const queryString = Object.keys(params)
      .filter((key) => params[key] !== null && params[key] !== undefined)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join('&');
    const url = `${this.apiUrl}Product?${queryString}`;
    console.log(url);

    // const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
