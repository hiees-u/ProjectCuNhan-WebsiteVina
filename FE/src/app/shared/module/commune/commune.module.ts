import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CommuneResponseModel {
  communeId: number;
  communeName: string;
  districtId: number;
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CommuneModule {}
