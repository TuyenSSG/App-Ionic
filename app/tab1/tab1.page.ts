import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {TabsPage} from '../tabs/tabs.page';
import { InAppBrowser,InAppBrowserOptions  } from '@awesome-cordova-plugins/in-app-browser/ngx';
//----SQL
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page   {

  mainForm: FormGroup;
  Datas: any[] = [];

  constructor (
    public db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router,
    private webview: WebView,
    private theInAppBrowser: InAppBrowser,
    private http: HttpClient
    ){ }
  
  public openBrowser(url){
   
    this.db.openWithCordovaBrowser(url);
  }
}
