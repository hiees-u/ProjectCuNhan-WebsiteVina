import { Component } from '@angular/core';
import { Login } from '../../shared/module/login/login.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // isLogin: boolean = false;

  loginData: Login = {
    userName: '',
    passWord: '',
  };

  constructor(private router: Router) {}

  onLogin() {
    if (this.loginData.userName && this.loginData.passWord) {
      // Xử lý logic đăng nhập
      console.log('Username:', this.loginData.userName);
      console.log('Password:', this.loginData.passWord);
      // Thực hiện API call để kiểm tra đăng nhập
      this.router.navigate(['/customer']);
    } else {
      console.log('Vui lòng nhập đầy đủ thông tin.');
    }
  }

  backToHomePage() {
    this.router.navigate(['/customer']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
