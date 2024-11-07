import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ServicesService } from '../../services.service';
import { BaseResponseModel } from '../../module/base-response/base-response.module';
import { DistrictResponseModel } from '../../module/district/district.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-district',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './district.component.html',
  styleUrl: './district.component.css'
})
export class DistrictComponent {
  districts: DistrictResponseModel[] = [];

  @Input() selectedProvinceId: number = 0; //tinh
  @Input() selectedDistrictId: number = 0;
  @Output() selectedDistrictIdChange = new EventEmitter<number>();

  constructor(private service: ServicesService) {}

  async ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.selectedProvinceId + '  Xem tỉnh được truyền vào');       //tỉnh id được truyền vào?   
    const response : BaseResponseModel = await this.service.GetDistrictsByProvinceId(this.selectedProvinceId);
    if(response.isSuccess) {
      this.districts = response.data;
      this.selectedDistrictId = this.districts[0].districtId;
      this.onDistrictChange();
    }
  }

  async ngOnInit(): Promise<void> {
    const response : BaseResponseModel = await this.service.GetDistricts();
    if(response.isSuccess) {
      this.districts = response.data;
    }
  }

  onDistrictChange() {
    console.log(this.selectedDistrictId);
    this.selectedDistrictIdChange.emit(this.selectedDistrictId);
  }
}
