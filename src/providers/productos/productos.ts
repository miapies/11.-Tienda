import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable()
export class ProductosProvider {

  pagina = 0;
  pag_por_categoria = 0; 
  productos: any[] = [];
  lineas: any[] = [];
  por_categoria: any[] = [];

  constructor(public http: HttpClient) {
    // console.log('Hello ProductosProvider Provider');
    this.cargar_todos();
    this.cargar_lineas();
  }

  cargar_lineas() {

    const url = URL_SERVICIOS + '/lineas';
    this.http.get(url)
      .subscribe((data: any) => {

        if (data.error) {
          console.error('ERROR al cargar líneas: '
            + JSON.stringify(data.error));
        } else {

          this.lineas = data.lineas;
          // console.log(this.lineas);

        }

      });
  }

  cargar_por_categoria(categoria: number) {

    const promesa = new Promise((resolve, reject) => {

      const url = URL_SERVICIOS + '/productos/por_tipo/'
        + categoria + '/' + this.pag_por_categoria;

      this.http.get(url)
        .subscribe((data: any) => {

          if (data.error) {
            console.error('ERROR al cargar por categoría: '
              + JSON.stringify(data.error));
          } else {

            if (data.productos.length === 0) {
              // console.log('Ya no hay más registros');
              resolve(false);
              return;
            }

            this.por_categoria.push(...data.productos);
            console.log(this.por_categoria);
            this.pag_por_categoria += 1;
          }

          resolve(true);

        });

    });

    return promesa;

  }

  cargar_todos() {

    const promesa = new Promise((resolve, reject) => {

      const url = URL_SERVICIOS + '/productos/todos/' + this.pagina;
      this.http.get(url)
        .subscribe((data: any) => {

          if (data.error) {
            console.error('ERROR al cargar todos: '
              + JSON.stringify(data.error));
          } else {

            if (data.productos.length === 0) {
              console.log('Ya no hay más registros');
              resolve(false);
              return;
            }

            const nuevaData = this.agrupar(data.productos, 2);
            // this.productos.push(...data.productos);
            this.productos.push(...nuevaData);
            this.pagina += 1;
          }

          resolve(true);

        });

    });

    return promesa;

  }

  private agrupar(arr: any, tamano: number) {

    const nuevoArreglo = [];
    for (let i = 0; i < arr.length; i += tamano) {
      nuevoArreglo.push(arr.slice(i, i + tamano))
    }
    // console.log(nuevoArreglo);
    return nuevoArreglo;
  }

  // Mi solución
  // obtener_producto(codigo) {

  //   const promesa = new Promise((resolve, reject) => {

  //     const url = URL_SERVICIOS + '/productos/por_codigo/' + codigo;
  //     this.http.get(url)
  //       .subscribe((data: any) => {
  //         if (data.error) {
  //           reject('ERROR al obtener producto: ' + data.error);
  //         } else {
  //           resolve(data.producto);
  //         }

  //       });
  //   });

  //   return promesa;
  // }

}
