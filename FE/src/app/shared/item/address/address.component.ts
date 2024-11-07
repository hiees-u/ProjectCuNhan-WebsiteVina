import { Component, Input, SimpleChanges } from '@angular/core';
import { ServicesService } from '../../services.service';
import { Address, ConstructorAddress } from '../../module/address/address.module';
import { BaseResponseModel } from '../../module/base-response/base-response.module';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  @Input() AddressId: number = 0;
  address: Address = ConstructorAddress();

  constructor(private service: ServicesService) {}

  async ngOnChanges(changes: SimpleChanges) {
    this.getAddressById(this.AddressId);
  }

  async getAddressById(idAddress: number) {
    const response : BaseResponseModel = await this.service.GetAddressById(idAddress);
    if(response.isSuccess) {
      this.address = response.data;
    }
  }

}
