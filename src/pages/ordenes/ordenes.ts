import { Component } from '@angular/core';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { OrdenesDetallePage } from '../ordenes-detalle/ordenes-detalle';

@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {

  ordenesDetalle = OrdenesDetallePage;

  constructor(
    private _cs: CarritoProvider) {
  }

  ionViewWillEnter() {
    console.log('cargando órdenes...');
    this._cs.cargar_ordenes();
  }

}
