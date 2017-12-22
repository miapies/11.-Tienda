import { Component } from '@angular/core';
import { CarritoProvider } from '../../providers/index.providers';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _cs: CarritoProvider,
    public viewCtrl: ViewController) {
  }

}
