import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/index.providers';
import { PorCategoriasPage } from '../por-categorias/por-categorias';

@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  porCategorias = PorCategoriasPage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _ps: ProductosProvider) {
  }

}
