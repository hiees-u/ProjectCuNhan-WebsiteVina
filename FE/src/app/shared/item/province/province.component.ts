import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServicesService } from '../../services.service';
import { ProvincesResponseModel } from '../../module/province/province.module';
import { BaseResponseModel } from '../../module/base-response/base-response.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-province',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './province.component.html',
  styleUrl: './province.component.css'
})
export class ProvinceComponent {
  provinces: ProvincesResponseModel[] = [];
  @Input() selectedProvinceId: number = 0;
  @Output() selectedProvinceIdChange = new EventEmitter<number>();
  constructor(private service: ServicesService) {}

  async ngOnInit(): Promise<void> {
    const response : BaseResponseModel = await this.service.GetProvinces();
    if(response.isSuccess) {
      this.provinces = response.data;
    }
  }

  onProvinceChange() {
    console.log(this.selectedProvinceId);
    this.selectedProvinceIdChange.emit(this.selectedProvinceId);
  }
}
