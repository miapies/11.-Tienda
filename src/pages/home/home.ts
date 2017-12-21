import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { ProductoPage } from '../producto/producto';
import { CarritoProvider } from '../../providers/carrito/carrito';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hayMas = true;
  productoPage = ProductoPage;

  constructor(public navCtrl: NavController,
    private _ps: ProductosProvider,
    public _cs: CarritoProvider) {
  }

  siguiente_pagina(infiniteScroll) {

    this._ps.cargar_todos()
      .then((hayMas: boolean) => {
        console.log(hayMas);
        this.hayMas = hayMas;
        infiniteScroll.complete();
      });

  }

  // Mi solución
  // detalle_producto(codigo) {
  //   this.navCtrl.push(ProductoPage, { 'codigo': codigo });
  // }
}
