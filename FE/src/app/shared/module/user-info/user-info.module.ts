export interface UserInfoResponseModel {
  accountName: string;
  fullName?: string;
  email?: string;
  address?: string;
  addressId: number;
  customerType?: string;
  phone?: string;
  gender?: string;
  commune?: number;      // Thêm thuộc tính commune
  district?: number;     // Thêm thuộc tính district
  province?: number; 
}

export interface UserInfoRequestModel {
  fullName?: string;
  email?: string;
  phone?: string;
  addressId: number;
  gender: number;
}

export function ConstructerUserInfoResponseModel() {
  return {
    accountName: '',
    fullName: '',
    email: '',
    address: '',
    customerType: '',
    gender: '',
    phone: '',
    addressId: 1,
    commune: 0,
    district: 0,
    province: 0
  };
}
