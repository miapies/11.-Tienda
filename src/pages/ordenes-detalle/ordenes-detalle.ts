import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {

  orden = {}

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _cs: CarritoProvider,
    private alertCtrl: AlertController) {
    this.orden = this.navParams.get('orden');
  }

  borrar_orden(orden_id: string) {
    this._cs.borrar_orden(orden_id)
      .subscribe((data: any) => {

        if (data.error) {
          console.error('ERROR al borrar el pedido: '
            + JSON.stringify(data.mensaje));
          this.alertCtrl.create({
            title: 'Error al borrar el pedido',
            subTitle: data.mensaje,
            buttons: ['OK']
          }).present();

        } else {

          this.alertCtrl.create({
            title: 'Pedido eliminado',
            buttons: [{
              text: 'OK',
              handler: () => {
                this.navCtrl.pop();
              }
            }]
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
          title: 'Error al borrar el pedido',
          subTitle: mensaje,
          buttons: ['OK']
        }).present();

      });
  }
}
