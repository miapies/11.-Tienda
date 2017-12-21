import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../usuario/usuario';

import { CarritoPage, LoginPage } from "../../pages/index.paginas";

@Injectable()
export class CarritoProvider {

  items: any[] = [];

  constructor(public http: HttpClient,
    private alertCtrl: AlertController,
    private storage: Storage,
    private platform: Platform,
    private _us: UsuarioProvider,
    private modalCtrl: ModalController) {

    this.cargar_storage();
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

  agregar_carrito(item_agregado: any) {

    // console.log(this.items);

    for (const item of this.items) {
      if (item.codigo === item_agregado.codigo) {

        this.alertCtrl.create({
          title: 'Item existe',
          subTitle: item_agregado.producto
            + ', ya se encuentra en su carrito de compra',
          buttons: ['OK']
        }).present();

        return;
      }
    }

    this.items.push(item_agregado);
    this.guardar_storage();

  }

  private guardar_storage() {

    if (this.platform.is('cordova')) {
      // Dispositivo
      this.storage.set('items', this.items);
    } else {
      // Escritorio
      localStorage.setItem('items', JSON.stringify(this.items));
    }
  }

  cargar_storage() {

    const promesa = new Promise((resolve, reject) => {

      if (this.platform.is('cordova')) {
        // Dispositivo
        this.storage.get('items')
          .then((val) => {
            if (val) {
              this.items = val;
              console.log('items: ' + JSON.stringify(this.items));
            }
            resolve();
          })
          .catch((error) => console.error('Error: ' + JSON.stringify(error)));

      } else {
        // Escritorio
        if (localStorage.getItem('items')) {
          this.items = JSON.parse(localStorage.getItem('items'));
        }

        // console.log('items: ' + JSON.stringify(this.items));
        resolve();
      }

    });

    return promesa;

  }

}
