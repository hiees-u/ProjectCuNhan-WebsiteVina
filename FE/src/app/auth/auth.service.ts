import { Injectable } from '@angular/core';
import { Login } from '../shared/module/login/login.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7060/api/User/Login';
  //https://localhost:7060/api/User/Login

  async login(user: Login): Promise<any> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error:', errorResponse);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorResponse.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
