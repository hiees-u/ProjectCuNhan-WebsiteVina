import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommuneResponseModel } from '../../module/commune/commune.module';
import { ServicesService } from '../../services.service';
import { BaseResponseModel } from '../../module/base-response/base-response.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commune',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commune.component.html',
  styleUrl: './commune.component.css',
})
export class CommuneComponent {
  communes: CommuneResponseModel[] = [];
  @Input() selectedDistrictId: number = 0; //huyen
  @Input() selectedCommuneId: number = 0;
  @Output() selectedCommuneIdChange = new EventEmitter<number>();

  constructor(private service: ServicesService) {}

  async ngOnChanges(changes: SimpleChanges) {
    const response: BaseResponseModel =
      await this.service.GetComunesByDistrictId(this.selectedDistrictId);//chưa viết
    if (response.isSuccess) {
      this.communes = response.data;
      this.selectedCommuneId = this.communes[0].communeId;
      this.onCommuneChange();
    }
  }

  async ngOnInit(): Promise<void> {
    const response: BaseResponseModel = await this.service.GetCommunes();
    if (response.isSuccess) {
      this.communes = response.data;
    }
  }

  onCommuneChange() {
    console.log(this.selectedCommuneId);
    this.selectedCommuneIdChange.emit(this.selectedCommuneId);
  }
}
