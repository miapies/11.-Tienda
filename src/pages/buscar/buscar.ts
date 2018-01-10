import { Component } from '@angular/core';
import { ProductosProvider } from '../../providers/productos/productos';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ProductoPage } from '../producto/producto';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {

  productos: any[] = [];

  constructor(private _ps: ProductosProvider,
    private alertCtrl: AlertController,
    public navCtrl: NavController) {
  }

  irProducto(item: any) {
    this.navCtrl.push(ProductoPage, { producto: item })
  }

  buscar_item(ev: any) {

    // set valor to the value of the searchbar
    const valor = ev.target.value;
    console.log(valor);


    // if the value is an empty string don't filter the items
    if (valor && valor.trim() != '') {

      this._ps.get_item(valor)
        .subscribe((resp: any) => {
          if (resp.error) {
            console.error('ERROR al buscar producto: '
              + JSON.stringify(resp.mensaje));
            this.alertCtrl.create({
              title: 'Error al buscar producto',
              subTitle: resp.mensaje,
              buttons: ['OK']
            }).present();

          } else {
            // Todo OK
            this.productos = resp.productos;
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
            title: 'Error al buscar producto',
            subTitle: mensaje,
            buttons: ['OK']
          }).present();

        });

    } else {
      this.productos = [];
    }
  }

}
