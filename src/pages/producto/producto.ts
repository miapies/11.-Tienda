import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
// import { ProductosProvider } from '../../providers/productos/productos';

@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  producto: any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _cs: CarritoProvider
    /* ,
    private _ps: ProductosProvider */) {

    // console.log(JSON.stringify(this.navParams.get('producto')));
    this.producto = this.navParams.get('producto');

    // Mi solución
    // if (this.navParams.get('codigo')) {
    // this._ps.obtener_producto(this.navParams.get('codigo'))
    //   .then((producto) => {
    //     this.producto = producto;
    //     console.log(JSON.stringify(this.producto));
    //   })
    //   .catch((error) => {
    //     console.error(JSON.stringify(error));
    //   });
    // }

  }

}
