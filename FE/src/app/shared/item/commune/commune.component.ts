import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
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
export class CommuneComponent implements OnChanges {
  communes: CommuneResponseModel[] = [];
  @Input() selectedDistrictId: number = 0; //huyen
  @Input() selectedCommuneId: number | undefined;
  @Output() selectedCommuneIdChange = new EventEmitter<number>();
  @Output() communeNameInsertChange = new EventEmitter<string>();
  communeNameInsert: string = '';
  isShowInsertCommune: boolean = false;

  constructor(private service: ServicesService) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDistrictId']) {
      console.log(
        this.selectedCommuneId +
          ' selectedCommuneId được truyền vào ở component con'
      );

      this.getCommunes();
      if (this.selectedDistrictId !== 0) {
        const response: BaseResponseModel =
          await this.service.GetComunesByDistrictId(this.selectedDistrictId);
        if (response.isSuccess) {
          if (this.communes.length > 0) {
            this.isShowInsertCommune = false;
          } else {
            this.isShowInsertCommune = true;
          }
          this.onCommuneChange();
          this.communes = response.data;
        }
      }
    }
  }

  async getCommunes() {
    const response: BaseResponseModel =
      await this.service.GetComunesByDistrictId(this.selectedDistrictId);
    if (response.isSuccess) {
      this.communes = response.data;
    }
  }

  async ngOnInit(): Promise<void> {
    const response: BaseResponseModel = await this.service.GetCommunes();
    if (response.isSuccess) {
      this.communes = response.data;
      if (this.communes.length > 0) {
        this.isShowInsertCommune = false;
      }
    }
  }

  onCommuneChange() {
    if (this.isShowInsertCommune) {
      //--trường hợp nhập xã
      this.communeNameInsertChange.emit(this.communeNameInsert);
      this.selectedCommuneIdChange.emit(0);
      console.log('Trả về tên xã mới', this.communeNameInsert);
    } else {
      //--trường hợp chọn xã
      // this.communeNameInsertChange.emit('');
      this.selectedCommuneIdChange.emit(this.selectedCommuneId);
      this.communeNameInsertChange.emit(
        this.communes.find((c) => c.communeId == this.selectedCommuneId)
          ?.communeName
      );
    }

  }

  onChangeEditCommune() {
    this.isShowInsertCommune = !this.isShowInsertCommune;
    console.log('nhập xã mới');
    if (!this.isShowInsertCommune) {
      this.getCommunes();
      this.onCommuneChange();
    }
  }
}
