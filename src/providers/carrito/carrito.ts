import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { URL_SERVICIOS } from '../../config/url.servicios';
import { UsuarioProvider } from '../usuario/usuario';

@Injectable()
export class CarritoProvider {

  items: any[] = [];
  total_carrito = 0;
  ordenes: any[] = [];

  constructor(public http: HttpClient,
    private alertCtrl: AlertController,
    private storage: Storage,
    private platform: Platform,
    private _us: UsuarioProvider) {

    this.cargar_storage();
    this.actualizar_total();
  }

  remove_item(index: number) {
    this.items.splice(index, 1);
    this.guardar_storage();
    this.actualizar_total();
  }

  realizar_pedido() {

    let codigos = [];

    this.items.forEach(i =>
      codigos.push(i.codigo)
    );

    const body = {
      'items': codigos.join(',')
    };

    const url = URL_SERVICIOS + '/pedidos/realizar_orden/'
      + this._us.token + '/' + this._us.id_usuario;

    this.http.post(url, body)
      .subscribe((data: any) => {

        if (data.error) {
          console.error('ERROR ' + data.mensaje);
          this.alertCtrl.create({
            title: 'Error al realizar pedido',
            subTitle: data.mensaje,
            buttons: ['OK']
          }).present();

        } else {

          this.items = [];
          this.guardar_storage();
          this.alertCtrl.create({
            title: 'Pedido realizado',
            subTitle: 'Número de pedido: ' + data.orden_id,
            buttons: ['OK']
          }).present();

        }

      },
      (error) => {

        let mensaje = '';
        if (error.error && error.error.mensaje) {
          mensaje = error.error.mensaje;
        } else {
          mensaje = JSON.stringify(error);
        }

        console.error('ERROR ' + JSON.stringify(error));
        this.alertCtrl.create({
          title: 'Error al realizar pedido',
          subTitle: mensaje,
          buttons: ['OK']
        }).present();

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
    this.actualizar_total();
    this.guardar_storage();

  }

  actualizar_total() {
    this.total_carrito = 0;
    for (const item of this.items) {
      if (item.precio_compra) {
        this.total_carrito += Number(item.precio_compra);
      }
    }
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

  cargar_ordenes() {

    const url = URL_SERVICIOS + '/pedidos/obtener_pedidos/'
      + this._us.token + '/' + this._us.id_usuario;

    this.http.get(url)
      .subscribe((data: any) => {

        if (data.error) {
          console.error('ERROR al obtener los pedidos: '
            + JSON.stringify(data.error));
        } else {

          this.ordenes = data.ordenes;
          console.log(this.ordenes);
        }

      },
      (error) => {

        let mensaje = '';
        if (error.error && error.error.mensaje) {
          mensaje = error.error.mensaje;
        } else {
          mensaje = JSON.stringify(error);
        }

        console.error('ERROR ' + JSON.stringify(error));
        this.alertCtrl.create({
          title: 'Error al obtener los pedidos',
          subTitle: mensaje,
          buttons: ['OK']
        }).present();

      });

  }

  borrar_orden(orden_id: string) {

    const url = URL_SERVICIOS + '/pedidos/borrar_pedido/'
      + this._us.token + '/' + this._us.id_usuario
      + '/' + orden_id;

    return this.http.delete(url);
  }

}
