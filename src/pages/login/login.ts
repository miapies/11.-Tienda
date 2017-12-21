import { Component } from '@angular/core';
import { ViewController, LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  correo = '';
  contrasena = '';

  constructor(public viewCtrl: ViewController,
    private _us: UsuarioProvider,
    private loadingCtrl: LoadingController) { }

  ingresar() {
    const loading = this.loadingCtrl.create({
      content: 'Ingresando...'
    });
    loading.present();

    this._us.ingresar(this.correo, this.contrasena)
      .subscribe(() => {
        loading.dismiss();
        if (this._us.activo()) {
          this.viewCtrl.dismiss(true);
        }
      });
  }

}
