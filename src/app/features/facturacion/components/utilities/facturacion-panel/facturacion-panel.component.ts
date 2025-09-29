import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { NzResultModule } from 'ng-zorro-antd/result';
@Component({
  selector: 'app-facturacion-panel',
  imports: [
    NzIconModule,
    CommonModule,
    NzButtonModule,
    NzTableModule,
    NzTagModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzResultModule,
  ],
  templateUrl: './facturacion-panel.component.html',
  styleUrl: './facturacion-panel.component.css',
})
export class FacturacionPanelComponent implements OnChanges {
  @Input() tab: string = '';
  @ViewChild('contenedor', {
    read: ViewContainerRef,
    static: true,
  })
  contenedor!: ViewContainerRef;
  isInvalid: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tab']) {
      this.cargarComponentePorTab(changes['tab'].currentValue);
    }
  }

  private async cargarComponentePorTab(tab: string): Promise<void> {
    this.contenedor.clear();

    let remoteName: string;
    let exposedModule: string;

    switch (tab) {
      case 'pendientes':
        remoteName = 'factura-pendiente';
        exposedModule = './FacturaPendienteComponent';
        break;
      case 'notasCredito':
        remoteName = 'certicamara';
        exposedModule = './NotasCreditoComponent';
        break;
      case 'notasDebito':
        remoteName = 'certicamara';
        exposedModule = './NotasDebitoComponent';
        break;
      case 'rechazados':
        remoteName = 'factura-pendiente';
        exposedModule = './RechazadosComponent';
        break;
      default:
        console.warn(`No se encontró configuración para la pestaña: ${tab}`);
        return;
    }

    try {
      const m = await loadRemoteModule({
        remoteName: remoteName,
        exposedModule: exposedModule,
      });

      const componentName = exposedModule.replace('./', '');
      const comp = m[componentName];

      if (comp) {
        this.contenedor.createComponent(comp);
        
      } else {
        console.error(
          `Componente '${componentName}' no encontrado en el módulo cargado.`
        );
        this.isInvalid = true;
      }
    } catch (error) {
      console.error('Error al cargar el módulo remoto:', error);
      this.isInvalid = true;
    }
  }
}
