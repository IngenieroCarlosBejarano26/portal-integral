import { loadRemoteModule } from '@angular-architects/native-federation';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-certicamara',
  imports: [NzCardModule],
  templateUrl: './certicamara.component.html',
  styleUrl: './certicamara.component.css',
})
export class CerticamaraComponent implements OnInit {
  @ViewChild('contenedor', {
    read: ViewContainerRef,
    static: true,
  })
  contenedor!: ViewContainerRef;

  ngOnInit(): void {
    this.cargarComponente();
  }

  private async cargarComponente(): Promise<void> {
    this.contenedor.clear();

    let remoteName: string = 'certicamara';
    let exposedModule: string = './CerticamaraComponent';

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
      }
    } catch (error) {
      console.error('Error al cargar el módulo remoto:', error);
    }
  }
}
