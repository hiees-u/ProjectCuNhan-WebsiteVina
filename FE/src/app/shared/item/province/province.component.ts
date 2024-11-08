import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes['selectedProvinceId']) {
      console.log('Tỉnh ID đã được truyền vào Component con = '+ this.selectedProvinceId);
    }
  }

  async ngOnInit(): Promise<void> {
    const response : BaseResponseModel = await this.service.GetProvinces();
    if(response.isSuccess) {
      this.provinces = response.data;
    }
  }

  onProvinceChange() {
    this.selectedProvinceIdChange.emit(this.selectedProvinceId);
  }
}
