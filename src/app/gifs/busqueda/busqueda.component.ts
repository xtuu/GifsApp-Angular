import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

  /**decorador */
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  /**inyeccion del servicio */
  constructor(private gifsServices: GifsService) { }

  /**metodo de busqueda */
  buscar() {
    const valor = this.txtBuscar.nativeElement.value;


    if (valor.trim().length === 0) {
      return
    }

    this.gifsServices.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = ''
  }

}
