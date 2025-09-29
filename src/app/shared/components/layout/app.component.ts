import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { ModalService } from '../../../core/services/modals/modal.service';
import { Observable } from 'rxjs';
import { LoadingService } from '../../../core/services/loading/loadingService';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    CommonModule,
    NzToolTipModule,
    NzDividerModule,
    NzAvatarModule,
    NzModalModule,
    LoadingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent  {
  confirmModal?: NzModalRef;
  isCollapsed = false;
  menuItems = [
    {
      label: 'Facturación electrónica',
      route: '/facturacion',
      icon: 'snippets',
    },
    {
      label: 'Histórico Certicámara',
      route: '/certicamara',
      icon: 'database',
    },
  ];
  userInfo = {
    name: 'Carlos Daniel',
    lastname: 'Bejarano Preciado',
    role: 'Administrador',
  };

  constructor(
    private modal: ModalService,
  ) {}

  get obtenerPrefijo() {
    const inicialPrimera = this.userInfo.name[0].charAt(0).toUpperCase();
    const inicialSegunda = this.userInfo.lastname[0].charAt(0).toUpperCase();
    const resultado = `${inicialPrimera}${inicialSegunda}`;
    return resultado;
  }

  get nombreCompleto() {
    const resultado = `${this.userInfo.name} ${this.userInfo.lastname}`;
    return resultado;
  }

  confirmarCerrarSesion(): void {
    this.modal.confirmarCerrarSesion(
      () => {
        console.log('¡Sesión cerrada con éxito!');
      },
      () => {
        console.log('Cierre de sesión cancelado desde AppComponent.');
      }
    );
  }

}
