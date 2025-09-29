import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { FacturacionPanelComponent } from '../components/utilities/facturacion-panel/facturacion-panel.component';
@Component({
  selector: 'app-facturacion',
  imports: [
    CommonModule,
    NzCardModule,
    NzTabsModule,
    FacturacionPanelComponent,
  ],
  templateUrl: './facturacion.component.html',
  styleUrl: './facturacion.component.css',
})
export class FacturacionComponent implements OnInit {
  selectedIndex: number = 0;
  ngOnInit(): void {
    if (this.selectedIndex == null) {
      this.selectedIndex = 0;
    }
  }
}
