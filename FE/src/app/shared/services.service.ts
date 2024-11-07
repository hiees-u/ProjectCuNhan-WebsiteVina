import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private token: string = '';
  private apiUrl = 'https://localhost:7060/api/';
  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token') || '';
    }
  }

  async GetProvinces() {
    const url = `${this.apiUrl}Province`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`, // Nếu API yêu cầu xác thực, thêm header này
        },
      });
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      };
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
