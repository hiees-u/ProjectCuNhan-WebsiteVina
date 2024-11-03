import { Injectable } from '@angular/core';
import { BaseResponseModel } from '../shared/module/base-response/base-response.module';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'https://localhost:7060/api/';

  async getCateByProductID(productId: number): Promise<BaseResponseModel> {
    const url = `${this.apiUrl}Category?productID=${productId}`;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json())as BaseResponseModel;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getSubCateByProductID(productId: number): Promise<BaseResponseModel> {
    const url = `${this.apiUrl}SubCategory/Get By Product Id?productID=${productId}`;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json())as BaseResponseModel;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getTop10SubCate(): Promise<BaseResponseModel> {
    const url = `${this.apiUrl}SubCategory/Get 10 Sub Category`;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json())as BaseResponseModel;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getTop10Cate(): Promise<BaseResponseModel> {
    const url = `${this.apiUrl}Category/Get 10 Category`;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json())as BaseResponseModel;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getProducts(
    productId: number | null,
    cateId: number | null,
    subCateId: number | null,
    productName: string | null,
    pageNumber: number | 1,
    pageSize: number | 10,
    sortByName: number | 0,
    sortByPrice: number | 0
  ): Promise<BaseResponseModel> {
    const url = `${this.apiUrl}Product?pageNumber=1&pageSize=10&sortByName=0&sortByPrice=0`
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
