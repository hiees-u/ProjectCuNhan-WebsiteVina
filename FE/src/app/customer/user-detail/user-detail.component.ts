import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { BaseResponseModel } from '../../shared/module/base-response/base-response.module';
import {
  ConstructerUserInfoResponseModel,
  UserInfoResponseModel,
} from '../../shared/module/user-info/user-info.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProvinceComponent } from '../../shared/item/province/province.component';
import { DistrictComponent } from '../../shared/item/district/district.component';
import { CommuneComponent } from '../../shared/item/commune/commune.component';
import { AddressComponent } from '../../shared/item/address/address.component';
import {
  Address,
  ConstructorAddress,
} from '../../shared/module/address/address.module';
import { ServicesService } from '../../shared/services.service';
import {
  CommuneResponseModel,
  ConstructorCommune,
} from '../../shared/module/commune/commune.module';
import { UserInfoRequestModel } from '../../shared/module/user-info/user-info.module';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProvinceComponent,
    DistrictComponent,
    CommuneComponent,
    AddressComponent,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent {
  addressString: string = '';
  isActive: number = 1;
  address: Address = ConstructorAddress();
  userInfo: UserInfoResponseModel = ConstructerUserInfoResponseModel();
  communenInsert: CommuneResponseModel = ConstructorCommune(); //-- lưu thông tin Commune(xã) được thêm mới

  constructor(
    private service: CustomerService,
    private servicee: ServicesService
  ) {}

  async ngOnInit() {
    await this.getUserInfo();
    if (this.userInfo.addressId) {
      this.getAddressById(this.userInfo.addressId);
    }
    console.log(this.userInfo);
  }

  async getAddressById(idAddress: number) {
    const response: BaseResponseModel = await this.servicee.GetAddressById(
      idAddress
    );
    if (response.isSuccess) {
      this.address = response.data;
    }
  }

  changeActive(number: number) {
    this.isActive = number;
  }

  // Fetch PUT UserInfo
  async isHandleUpdate() {
    console.log(this.userInfo);
    console.log(this.address);
    console.log(this.communenInsert);

    console.log('Commune ID: ' + this.userInfo.Commune);

    // chuẩn bị:
    const request: UserInfoRequestModel = {
      fullName: this.userInfo.fullName,
      addressId: this.address.addressId,
      Commune: this.userInfo.Commune,
      communeName: this.communenInsert.communeName,
      districtId: this.communenInsert.districtId,
      email: this.userInfo.email,
      gender: typeof this.userInfo.gender === 'string' ? parseInt(this.userInfo.gender, 10) : 0,
      houseNumber: this.address.houseNumber,
      note: this.address.note,
      phone: this.userInfo.phone,
    };

    console.log(request);

    // chạy:
    const response: BaseResponseModel = await this.service.putUserInfo(request);
  }

  onAddressChange(updatedAddress: Address) {
    this.address = updatedAddress;
  }

  async onSelectedProvinceIdChange(selectedProvinceId: number | null) {
    this.userInfo.province = selectedProvinceId!;
  }

  async onSelectedDistrictsIdChange(selectedDistrictId: number | null) {
    this.userInfo.district = selectedDistrictId!;
    this.communenInsert.districtId = selectedDistrictId!;
  }

  onSelectedCommunesIdChange(selectedCommunesId: number | null) {
    this.userInfo.Commune = selectedCommunesId!;
  }

  async onCommuneNameInsert(communeName: string) {
    this.communenInsert.communeName = communeName;
  }

  async getUserInfo() {
    const response: BaseResponseModel = await this.service.getUserInfo();
    if (response.isSuccess) {
      this.userInfo = response.data;
      console.log(response.data);      
    }
  }
}
