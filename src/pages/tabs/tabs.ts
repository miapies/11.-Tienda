import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { OrdenesPage } from '../ordenes/ordenes';
import { CategoriasPage } from '../index.paginas';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  inicio = HomePage;
  categorias = CategoriasPage;
  pedidos = OrdenesPage;

}
