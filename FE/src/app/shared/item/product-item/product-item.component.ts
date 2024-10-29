import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCurrencyPipe } from '../../module/customCurrency';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    CommonModule,
    CustomCurrencyPipe
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() data: { name: string; image: string; price: number; } | undefined;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();

  sendData(Product: string | undefined) {
    console.log("Đã Click product " + Product);    
    this.dataChange.emit(Product);
  }

}
