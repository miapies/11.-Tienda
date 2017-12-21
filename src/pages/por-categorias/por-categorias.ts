import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { ProductoPage } from '../producto/producto';

@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {

  hayMas = true;
  categoria: any = {};
  productoPage = ProductoPage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _ps: ProductosProvider) {

    if (this.navParams.get('categoria')) {
      this.categoria = this.navParams.get('categoria');
      this._ps.por_categoria = [];
      this._ps.pag_por_categoria = 0;
      this._ps.cargar_por_categoria(this.categoria.id);
    }
  }

  siguiente_pagina(infiniteScroll) {

    this._ps.cargar_por_categoria(this.categoria.id)
      .then((hayMas: boolean) => {
        console.log(hayMas);
        this.hayMas = hayMas;
        infiniteScroll.complete();
      });

  }


}
