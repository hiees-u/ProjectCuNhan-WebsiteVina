import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { BaseResponseModel } from '../../shared/module/base-response/base-response.module';
import { ConstructerUserInfoResponseModel, UserInfoResponseModel } from '../../shared/module/user-info/user-info.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProvinceComponent } from "../../shared/item/province/province.component";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProvinceComponent
],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  isEditAddress:boolean = false;
  addressString: string = '';
  isActive: number = 1;
  userInfo: UserInfoResponseModel = ConstructerUserInfoResponseModel();

  constructor(private service: CustomerService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUserInfo();
    console.log('get');
    
  }

  changeEditAddress() {
    this.isEditAddress = !this.isEditAddress;
  }

  changeActive(number: number) {
    this.isActive = number;
    console.log(this.userInfo);
    
  }

  isHandleUpdate() {
    console.log(this.userInfo);
  }

  onSelectedProvinceIdChange(selectedProvinceId: number | null) : void {
    this.userInfo.province = selectedProvinceId!;
    console.log(this.userInfo.province + 'this.userInfo.province');    
    console.log(selectedProvinceId + 'selectedProvinceId');    
  }

  async getUserInfo() {
    const response: BaseResponseModel = await this.service.getUserInfo();

    if(response.isSuccess) {
      this.userInfo = response.data;
    }
  }
}
