import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class CarritoProvider {

  items: any[] = [];

  constructor(public http: HttpClient,
    private alertCtrl: AlertController,
    private storage: Storage,
    private platform: Platform) {
      
    this.cargar_storage();
  }

  agregar_carrito(item_agregado: any) {

    console.log(this.items);

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

        console.log('items: ' + JSON.stringify(this.items));
        resolve();
      }

    });

    return promesa;

  }

}
