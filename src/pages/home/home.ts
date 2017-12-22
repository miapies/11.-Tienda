import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ProductoPage } from '../producto/producto';
import { ProductosProvider, CarritoProvider, UsuarioProvider } from '../../providers/index.providers';

import { CarritoPage, LoginPage } from "../../pages/index.paginas";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hayMas = true;
  productoPage = ProductoPage;

  constructor(public navCtrl: NavController,
    private _ps: ProductosProvider,
    public _us: UsuarioProvider,
    public _cs: CarritoProvider,
    private modalCtrl: ModalController) { }

  siguiente_pagina(infiniteScroll) {

    this._ps.cargar_todos()
      .then((hayMas: boolean) => {
        // console.log(hayMas);
        this.hayMas = hayMas;
        infiniteScroll.complete();
      });

  }

  ver_carrito() {
    
    let modal: any;

    if (this._us.token) {
      // Mostrar página del carrito
      modal = this.modalCtrl.create(CarritoPage)
    } else {
      // Mostrar página de login
      modal = this.modalCtrl.create(LoginPage);
    }

    modal.present();

    modal.onDidDismiss((abrirCarrito: boolean) => {

      if (abrirCarrito) {
        this.modalCtrl.create(CarritoPage)
          .present();
      }
    });
  }

  // Mi solución
  // detalle_producto(codigo) {
  //   this.navCtrl.push(ProductoPage, { 'codigo': codigo });
  // }
}
