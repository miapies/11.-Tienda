import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import {
  HomePage,
  CarritoPage,
  CategoriasPage,
  LoginPage,
  OrdenesDetallePage,
  OrdenesPage,
  PorCategoriasPage,
  ProductoPage,
  TabsPage,
  BuscarPage
} from '../pages/index.paginas';

// Pipes
import { ImagenPipe } from '../pipes/imagen/imagen';

// Providers
import { ProductosProvider, UsuarioProvider, CarritoProvider } from '../providers/index.providers';

// Plugins
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    ImagenPipe,
    HomePage,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesDetallePage,
    OrdenesPage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage,
    BuscarPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesDetallePage,
    OrdenesPage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage,
    BuscarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProductosProvider,
    UsuarioProvider,
    CarritoProvider
  ]
})
export class AppModule { }
