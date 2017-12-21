import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import 'rxjs/add/operator/map'

import { AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage/dist/storage';

@Injectable()
export class UsuarioProvider {

  token: string;
  id_usuario: string;

  constructor(public http: HttpClient,
    private alertCtrl: AlertController,
    private platform: Platform,
    private storage: Storage) {

    this.cargar_storage();

  }

  activo(): boolean {
    return this.token && this.id_usuario ? true : false;
  }

  ingresar(correo: string, contrasena: string) {

    const body = {
      'correo': correo,
      'contrasena': contrasena
    };

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, body)
      .map((data: any) => {
        console.log(data);

        if (data.error) {
          console.error('ERROR ' + data.mensaje);
          this.alertCtrl.create({
            title: 'Error al iniciar',
            subTitle: data.mensaje,
            buttons: ['OK']
          }).present();

        } else {
          this.token = data.token;
          this.id_usuario = data.id_usuario;

          // Guardar storage
          this.guardar_storage();
        }

      });

  }

  cerrar_sesion() {
    this.token = null;
    this.id_usuario = null;

    // Guardar storage
    this.guardar_storage();
  }

  private guardar_storage() {

    if (this.platform.is('cordova')) {
      // Dispositivo
      this.storage.set('token', this.token);
      this.storage.set('id_usuario', this.id_usuario);
    } else {
      // Escritorio
      if (this.token) {
        localStorage.setItem('token', this.token);
      } else {
        localStorage.removeItem('token');
      }

      if (this.id_usuario) {
        localStorage.setItem('id_usuario', this.id_usuario);
      } else {
        localStorage.removeItem('id_usuario');
      }
    }
  }

  cargar_storage() {

    const promesa = new Promise((resolve, reject) => {

      if (this.platform.is('cordova')) {
        // Dispositivo
        this.storage.get('token')
          .then((token) => {
            if (token) {
              this.token = token;
              console.log('token: ' + this.token);
            }
            resolve();
          })
          .catch((error) => console.error('Error: ' + JSON.stringify(error)));

        this.storage.get('id_usuario')
          .then((id_usuario) => {
            if (id_usuario) {
              this.id_usuario = id_usuario;
              console.log('id_usuario: ' + this.id_usuario);
            }
            resolve();
          })
          .catch((error) => console.error('Error: ' + JSON.stringify(error)));

      } else {
        // Escritorio
        if (localStorage.getItem('token')) {
          this.token = localStorage.getItem('token');
        }

        if (localStorage.getItem('id_usuario')) {
          this.id_usuario = localStorage.getItem('id_usuario');
        }

        console.log('token: ' + this.token);
        console.log('id_usuario: ' + this.id_usuario);
        resolve();
      }

    });

    return promesa;

  }

}
