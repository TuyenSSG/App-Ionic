// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouteReuseStrategy } from '@angular/router';

// import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

// @NgModule({
//   declarations: [AppComponent],
//   entryComponents: [],
//   imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
//   providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}


// ------------đây là phần copy----------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// import { SQLite } from '@ionic-native/sqlite/ngx';

import { IonicStorageModule } from '@ionic/storage-angular';

//---SQL
// import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
// import { SQLite } from '@ionic-native/sqlite';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { SafeHtmlPipe } from './safe-html.pipe';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

// import { DbService } from './../services/db.service';


// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

// import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Firebase } from '@awesome-cordova-plugins/firebase/ngx';

import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';

import { OneSignal } from '@ionic-native/onesignal/ngx';


// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';


@NgModule({
  declarations: [AppComponent, SafeHtmlPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    SQLite,
    SQLitePorter,
    InAppBrowser,
    WebView,
    SafeHtmlPipe,
    HTTP,
    OneSignal,
    { 
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    // FCM,
    Firebase,
    FirebaseX
    // LocalNotifications
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor (  private sqlite: SQLite, 
  //   private httpClientModule: HttpClientModule){

  // }
 }